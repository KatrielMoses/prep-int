import React from 'react'
import Agent from '@/components/Agent'

const page = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-12 text-left">
          Interview Generation
        </h1>

        <Agent userName="You" />
      </div>
    </div>
  )
}

export default page