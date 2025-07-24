// components/Agent.tsx
import React from "react";
import Image from "next/image";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  CONNECTING = 'CONNECTING',
  FINISHED = 'FINISHED',
}

const Agent = ({ userName }: { userName: string }) => {
  const isSpeaking = true; // Animation active
  const callStatus = CallStatus.INACTIVE;

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      {/* Two cards container */}
      <div className="flex flex-row gap-8 w-full justify-center mb-12 px-4" style={{ minWidth: '100vw' }}>
        {/* AI Interviewer Card */}
        <div
          className="flex flex-col items-center justify-center bg-gradient-to-b from-[#3a3b5c] to-[#2d2e47] rounded-2xl p-12 border border-gray-600 force-wide-card"
          style={{ width: '600px', height: '400px', minWidth: '600px' }}
        >
          <div className="relative mb-8">
            <div className="bg-white rounded-full p-6 w-32 h-32 flex items-center justify-center relative z-10">
              <div className="text-5xl">💬</div>
            </div>
            {isSpeaking && (
              <div className="absolute inset-0 w-32 h-32 bg-white rounded-full animate-ping opacity-30"></div>
            )}
          </div>
          <h3 className="text-white text-2xl font-semibold">AI Interviewer</h3>
        </div>

        {/* You Card */}
        <div
          className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2d2f35] to-[#1a1c20] rounded-2xl p-12 border border-gray-700 force-wide-card"
          style={{ width: '600px', height: '400px', minWidth: '600px' }}
        >
          <div className="rounded-full mb-8 w-32 h-32 overflow-hidden">
            <Image
              src="/user-avatar.png"
              alt="User Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-white text-2xl font-semibold">{userName}</h3>
        </div>
      </div>

      {/* Message Input */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-gray-600">
          <p className="text-white text-center text-lg">
            My name is John Doe, nice to meet you!
          </p>
        </div>
      </div>

      {/* Call Button */}
      <div className="flex justify-center">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50">
          Call
        </button>
      </div>
    </div>
  );
};

export default Agent;
