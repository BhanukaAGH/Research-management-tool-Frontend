import React from 'react'
import { MdOutlineAttachFile, MdKeyboardBackspace } from 'react-icons/md'

const GroupInformation = ({ selectGroup, setSelectGroup }) => {
  return (
    <>
      <div className='mb-4 text-base'>
        <div
          className='flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gray-600'
          onClick={() => setSelectGroup(null)}
        >
          <MdKeyboardBackspace />
          <span>Back</span>
        </div>
      </div>

      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Research Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Group details and documents.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Group ID</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.groupID}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Topic
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.topic_name}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Area
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.researchArea}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Submit Date</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.submitDate}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Group Members
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <ul className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      it20009472 - Bhanuka A.G.H
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      it20009472 - Bhanuka A.G.H
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      it20009472 - Bhanuka A.G.H
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      it20009472 - Bhanuka A.G.H
                    </span>
                  </li>
                </ul>
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Submit Documents
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <ul className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <div className='flex w-0 flex-1 items-center'>
                      <MdOutlineAttachFile className='h-5 w-5 flex-shrink-0 text-gray-400' />
                      <span className='ml-2 w-0 flex-1 truncate'>
                        research_document 01.pdf
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0 cursor-pointer'>
                      <span className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </span>
                    </div>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <div className='flex w-0 flex-1 items-center'>
                      <MdOutlineAttachFile className='h-5 w-5 flex-shrink-0 text-gray-400' />
                      <span className='ml-2 w-0 flex-1 truncate'>
                        research_document 02.pdf
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0 cursor-pointer'>
                      <span className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default GroupInformation
