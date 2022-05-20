import React from 'react'

const SubmitionsList = ({ setSelectSubmition }) => {
  return (
    <div
      className='mb-4 flex cursor-pointer items-center justify-between rounded-lg border-b-4 border-b-[#E2A500] bg-white px-2 py-2 shadow-md md:px-4'
      onClick={() => setSelectSubmition(true)}
    >
      <div>
        <span className='block text-lg font-semibold md:text-xl'>
          Submission Name
        </span>
        <span className='block text-sm text-gray-500 md:text-base'>
          Submission Description
        </span>
        <span className='block text-xs text-gray-500 md:text-sm'>
          Due Date: 2022/04/05
        </span>
      </div>
      <div>
        <span className='rounded bg-green-100 px-2.5 py-1 text-sm font-semibold text-black'>
          Not Attempt
        </span>
      </div>
    </div>
  )
}

export default SubmitionsList
