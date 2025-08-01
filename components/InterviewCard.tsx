import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM DD, YYYY');

    return (
        <div className='card-border w-full max-w-[420px] min-h-[480px] gap-3'>
            <div className='card-interview relative flex flex-col justify-between bg-slate-800'>
                <div>
                    <div className='absolute top-0 right-0 px-4 w-fit py-2 rounded-bl-lg bg-light-600'>
                        <p className='badge-text'>{normalizedType}</p>
                    </div>

                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover image"
                        width={90}
                        height={90}
                        className='rounded-full object-fit size-[90px]'
                    />

                    <h3 className='mt-5 capitalize'>{role} Interview</h3>

                    <div className='flex flex-row gap-5 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <Image src='/calendar.svg' alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>

                        <div className='flex flex-row gap-2 items-center'>
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore || "---"}/100</p>
                        </div>
                    </div>
                    <p className='line-clamp-2 mt-5'>{feedback?.finalAssessment || "You havent taken the interview yet."}</p>
                </div>
                <div className='flex flex-row justify-between py-8'>
                    <DisplayTechIcons techStack={techstack} />

                    <Button className='btn-primary px-6 py-3 rounded-full w-auto mt-2'>
                        <Link href={feedback ? `/interview/${interviewId}/feedback`
                            : `/interview/${interviewId}`}>
                            {feedback ? "View Feedback" : "Take Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard