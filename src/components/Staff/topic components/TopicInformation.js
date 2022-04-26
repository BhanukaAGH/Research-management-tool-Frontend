import React from 'react'

const TopicInformation = () => {
  return (
    <div class='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div class='px-4 py-5 sm:px-6'>
        <h3 class='text-lg font-medium leading-6 text-gray-900'>
          Topic Information
        </h3>
      </div>
      <div class='border-t border-gray-200'>
        <dl>
          <div class='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt class='text-sm font-medium text-gray-500'>Topic name</dt>
            <dd class='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              How will technology change our lives in twenty years?
            </dd>
          </div>
          <div class='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt class='text-sm font-medium text-gray-500'>Gorup id</dt>
            <dd class='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              RESEARCH_G7
            </dd>
          </div>
          <div class='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt class='text-sm font-medium text-gray-500'>Research area</dt>
            <dd class='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              INFORMATION TECHNOLOGY
            </dd>
          </div>
          <div class='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt class='text-sm font-medium text-gray-500'>Submit date</dt>
            <dd class='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              2022/04/25
            </dd>
          </div>
          <div class='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt class='text-sm font-medium text-gray-500'>Status</dt>
            <dd class='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <div className='flex items-center justify-between'>
                Approve
                <div className='space-x-2'>
                  <span className='cursor-pointer rounded-md bg-blue-200 py-1  px-4 text-blue-500'>
                    Approve
                  </span>
                  <span className='cursor-pointer rounded-md bg-red-200 py-1  px-4 text-red-500'>
                    Reject
                  </span>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default TopicInformation
