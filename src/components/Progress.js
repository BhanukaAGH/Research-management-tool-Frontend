import React from 'react'
import { useSelector } from 'react-redux'

const Progress = () => {
  const circumference = 58 * 2 * Math.PI

  const { progress } = useSelector((state) => state.ui)

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='fixed inline-flex items-center justify-center overflow-hidden rounded-full'>
        <svg width={120} height={120}>
          <circle
            className='text-gray-300'
            strokeWidth='16'
            stroke='currentColor'
            fill='transparent'
            r='58'
            cx='60'
            cy='60'
          />
          <circle
            className='text-blue-600'
            strokeWidth='16'
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap='round'
            stroke='currentColor'
            fill='transparent'
            r='58'
            cx='60'
            cy='60'
          />
        </svg>
        <span className='absolute text-xl text-blue-700'>{`${progress}%`}</span>
      </div>
      <span className='mt-44 text-center text-xl font-medium text-blue-700'>
        File Uploading ...
      </span>
    </div>
  )
}

export default Progress
