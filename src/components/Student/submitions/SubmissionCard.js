import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { submitSubmission } from '../../../features/ui/uiSlice'

const SubmissionCard = ({ assignment, setSelectSubmition }) => {
  const [isSubmit, setIsSubmit] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    assignment.submitUsers.length > 0
      ? assignment.submitUsers.filter(
          (submitUser) => submitUser.user.toString() === user.userId
        ).length > 0
        ? setIsSubmit(true)
        : setIsSubmit(false)
      : setIsSubmit(false)
  }, [])

  return (
    <div
      className='mb-4 flex cursor-pointer items-center justify-between rounded-lg border-b-4 border-b-[#E2A500] bg-white px-2 py-2 shadow-md md:px-4'
      onClick={() => {
        setSelectSubmition(assignment)
        dispatch(submitSubmission(false))
      }}
    >
      <div>
        <span className='block text-lg font-semibold md:text-xl'>
          {assignment.name}
        </span>
        <span className='block text-sm text-gray-500 md:text-base'>
          {assignment.description}
        </span>
        <span className='block text-xs text-gray-500 md:text-sm'>
          Due Date: {assignment.dueDate}
        </span>
      </div>
      <div>
        <span
          className={`rounded px-2.5 py-1 text-sm font-semibold text-black ${
            isSubmit ? 'bg-green-100' : 'bg-blue-100'
          }`}
        >
          {isSubmit ? 'Submitted' : 'Not Attempt'}
        </span>
      </div>
    </div>
  )
}

export default SubmissionCard
