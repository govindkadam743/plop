'use server';

import {db, auth} from "@/services/firebase/admin";
import {cookies} from "next/headers";
import { SignUpParams, SignInParams, User } from "@/types";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    if (!db || !auth) {
        throw new Error('Firebase not initialized. Please check your environment variables.');
    }

    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        });

        return {
            success: true,
            message: 'Account created successfully. Please sign in.'
        };
    } catch (e: unknown) {
        console.error('Error creating a user', e);

        if(e instanceof Error && 'code' in e && e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already in use.'
            }
        }

        return {
            success: false,
            message: 'Failed to create an account'
        }
    }
}

export async function signIn(params: SignInParams) {
    if (!auth || !db) {
        throw new Error('Firebase not initialized. Please check your environment variables.');
    }

    const { email, idToken } = params;

    try {
        // Decode the idToken to get user info
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email: tokenEmail, name } = decodedToken;

        // Ensure user document exists in Firestore
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(uid).set({
                name: name || '',
                email: tokenEmail || email,
            });
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Signed in successfully.'
        }
    } catch (e: unknown) {
        console.error(e);

        return {
            success: false,
            message: 'Failed to log into an account.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    if (!auth) {
        throw new Error('Firebase not initialized. Please check your environment variables.');
    }

    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

export async function getCurrentUser(): Promise<User | null> {
    if (!auth || !db) {
        console.error('Firebase not initialized');
        return null;
    }

    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.
            collection('users')
            .doc(decodedClaims.uid)
            .get();

        if(!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (e) {
        console.error(e)

        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user;
}