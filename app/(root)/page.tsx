

import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/actions/auth.action";
import { Interview } from "@/types";
import { redirect } from 'next/navigation';
const Page = async () => {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/sign-in');
    }

    // Mock data for development
    const userInterviews: Interview[] = [
        {
            id: "1",
            role: "Frontend Developer",
            level: "Junior",
            questions: ["What is React?", "Explain useState"],
            techstack: ["React", "JavaScript", ],
            createdAt: "2024-09-01T10:00:00Z",
            userId: user.id,
            type: "Technical",
            finalized: true
        },
        {
            id: "2",
            role: "Backend Developer",
            level: "Mid",
            questions: ["What is Node.js?", "Explain REST APIs"],
            techstack: ["Node.js", "Express", ],
            createdAt: "2024-08-15T14:30:00Z",
            userId: user.id,
            type: "Technical",
            finalized: false
        }
    ];
    const latestInterviews: Interview[] = [
        {
            id: "3",
            role: "Full Stack Developer",
            level: "Senior",
            questions: ["Design a scalable system", "Explain microservices"],
            techstack: ["React", "Node.js", ],
            createdAt: "2024-09-05T09:00:00Z",
            userId: user.id,
            type: "System Design",
            finalized: false
        },
        {
            id: "4",
            role: "Data Scientist",
            level: "Mid",
            questions: ["What is machine learning?", "Explain data preprocessing"],
            techstack: ["Python", "Pandas",],
            createdAt: "2024-09-03T16:45:00Z",
            userId: user.id,
            type: "Technical",
            finalized: true
        }
    ];
    // const [userInterviews, latestInterviews] = await Promise.all([
    //     getInterviewsByUserId(user.id),
    //     getLatestInterviews({ userId: user.id })
    // ]);

    const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
    const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg">
                        Practice on real interview questions & get instant feedback
                    </p>
                    
                    <Button asChild className="btn-primary max-sm:w-full">
                <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews?.map((interview: Interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))) : (
                            <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>

                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews?.map((interview: Interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))) : (
                        <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default Page