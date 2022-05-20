import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import FileSubmition from './FileSubmition'

const Submition = ({ selectSubmition, setSelectSubmition }) => {
  return (
    <div>
      <div
        className='hover:scale-102 mb-4 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-base text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
        onClick={() => setSelectSubmition(false)}
      >
        <MdKeyboardBackspace />
        <span>Back</span>
      </div>
      <div className='mb-6'>
        <dl>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission name
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Aplication Framework Submission
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission Description
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              This is a Description
            </dd>
          </div>
          <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission type
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              pdf
            </dd>
          </div>
          <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission status
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Not attempt
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Due Date</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              2022/04/05
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Time Remaining
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              5 days 4 min
            </dd>
          </div>
        </dl>
      </div>

      <FileSubmition />
    </div>
  )
}

export default Submition
