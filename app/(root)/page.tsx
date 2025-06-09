import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      {/* Hero Section */}
      <section className='p-25'>
        <div className='bg-gradient-to-b from-blue-950 via-slate-950 to-black rounded-3xl overflow-hidden'>
          <div className='max-w-7xl mx-auto px-6 py-16 lg:py-20'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              {/* Left Content */}
              <div className='flex-1 text-left max-w-xl'>
                <h1 className='text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
                  Get Interview-Ready with{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>
                    AI-Powered
                  </span>{' '}
                  Practice & Feedback
                </h1>
                <p className='text-lg text-gray-300 mb-8'>
                  Practice on real interview questions & get instant feedback
                </p>
                <Button asChild className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full text-base transition-all duration-300 transform hover:scale-105'>
                  <Link href="/interview">Start an Interview</Link>
                </Button>
              </div>

              {/* Right Content - Robot */}
              <div className='flex-1 flex justify-center lg:justify-end'>
                <div className='relative'>
                  {/* Floating elements around robot */}
                  <div className='absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg rotate-12 animate-pulse'></div>
                  <div className='absolute -top-2 -right-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce'></div>
                  <div className='absolute -bottom-6 -left-8 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg -rotate-12 animate-pulse'></div>
                  <div className='absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce delay-75'></div>

                  <Image
                    src="/robot.png"
                    alt="AI Interview Assistant"
                    width={500}
                    height={500}
                    className='relative z-10 drop-shadow-2xl'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className='max-w-6xl mx-auto px-6 py-12'>
        <h2 className='text-3xl font-bold text-white mb-6'>Your Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 justify-items-start'>
          {dummyInterviews.slice(0, 2).map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      {/* Take an Interview Section */}
      <section className='max-w-6xl mx-auto px-6 pb-12'>
        <h2 className='text-3xl font-bold text-white mb-6'>Take an Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 justify-items-start'>
          {dummyInterviews.slice(0, 2).map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default page