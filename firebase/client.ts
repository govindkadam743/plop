// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaNEBN26k1NVrdH69dQ8814pboflX0mc4",
  authDomain: "plop-b6b30.firebaseapp.com",
  projectId: "plop-b6b30",
  storageBucket: "plop-b6b30.firebasestorage.app",
  messagingSenderId: "890539945722",
  appId: "1:890539945722:web:45f571d9e02d28f1b06343",
  measurementId: "G-G2ZMYYSCHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);