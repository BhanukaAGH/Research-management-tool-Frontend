import React from 'react'
import StaffChat from './StaffChat'
import TopicInformation from './TopicInformation'
import { MdKeyboardBackspace } from 'react-icons/md'

const SelectedTopic = ({ setSelectTopic }) => {
  return (
    <>
      <div className='mb-4 text-base'>
        <div
          className='flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gray-600'
          onClick={() => setSelectTopic(null)}
        >
          <MdKeyboardBackspace />
          <span>Back</span>
        </div>
      </div>
      <TopicInformation />
      <StaffChat />
    </>
  )
}

export default SelectedTopic
