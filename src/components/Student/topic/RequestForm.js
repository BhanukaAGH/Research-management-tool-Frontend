import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  requestSupervisor,
  requestCoSupervisor,
  reset,
} from '../../../features/topic/topicSlice'
import {
  getAllSupervisors,
  getAllCoSupervisors,
} from '../../../features/user/userSlice'
import { useSnackbar } from 'notistack'

const RequestForm = ({ prevTopicData, setTopicData }) => {
  const [supervisorId, setSupervisorId] = useState('')
  const [coSupervisorId, setCoSupervisorId] = useState('')

  const dispatch = useDispatch()
  const { supervisors, coSupervisors, isLoading } = useSelector(
    (state) => state.user
  )
  const { topic, isSuccess } = useSelector((state) => state.topic)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    dispatch(getAllSupervisors())
    dispatch(getAllCoSupervisors())
  }, [])

  const submitSupervisor = (topicId) => {
    if (topicId && supervisorId !== 'Select Supervisor' && supervisorId) {
      dispatch(requestSupervisor({ topicId, supervisorId }))
    } else {
      enqueueSnackbar('Please select supervisor', { variant: 'warning' })
    }
  }

  const submitCoSupervisor = (topicId) => {
    if (
      topicId &&
      coSupervisorId !== 'Select Co-supervisor' &&
      coSupervisorId
    ) {
      dispatch(requestCoSupervisor({ topicId, coSupervisorId }))
    } else {
      enqueueSnackbar('Please select Co-Supervisor', { variant: 'warning' })
    }
  }

  useEffect(() => {
    if (isSuccess && topic && prevTopicData != topic) {
      setTopicData(topic)
    }

    dispatch(reset())
  }, [isSuccess])

  if (isLoading) {
    return (
      <div className='mt-4 bg-gray-100 py-4'>
        <div className='mb-5 flex w-full animate-pulse items-center justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-gray-300'>
          <div className='flex flex-col items-start justify-center'>
            <div className='mb-2 h-2 w-24 rounded-md bg-slate-300'></div>
            <div className='h-2 w-32 rounded-md bg-slate-300'></div>
          </div>
          <div className='h-2 w-24 rounded-md bg-slate-300'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='mt-4 bg-gray-100 py-4'>
      {prevTopicData && (
        <div className='mb-5 flex w-full items-center justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-gray-300'>
          <div className='flex flex-col items-start justify-center'>
            <span className='py-1 font-sans text-lg font-medium text-gray-800'>
              Supervisor
              {prevTopicData.supervisor?.id && (
                <span className='ml-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800'>
                  {prevTopicData.supervisor.status}
                </span>
              )}
            </span>
            {supervisors && (
              <select
                className='rounded-lg border border-gray-300 bg-gray-50 py-0.5 px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                name='supervisor'
                onChange={(e) => setSupervisorId(e.target.value)}
              >
                <option>Select Supervisor</option>
                {supervisors.map((supervisor, index) => (
                  <option value={supervisor._id} key={index}>
                    {supervisor.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <span
            className='mr-2 cursor-pointer rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300'
            onClick={() => submitSupervisor(prevTopicData._id)}
          >
            Request
          </span>
        </div>
      )}

      {prevTopicData && prevTopicData.supervisor.id && (
        <div className='mb-5 flex w-full items-center justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-gray-300'>
          <div className='flex flex-col items-start justify-center'>
            <span className='py-1 font-sans text-lg font-medium text-gray-800'>
              Co-supervisor
              {prevTopicData.coSupervisor?.id && (
                <span className='ml-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800'>
                  {prevTopicData.coSupervisor?.status}
                </span>
              )}
            </span>
            {coSupervisors && (
              <select
                className='rounded-lg border border-gray-300 bg-gray-50 py-0.5 px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                name='co-supervisor'
                onChange={(e) => setCoSupervisorId(e.target.value)}
              >
                <option>Select Co-supervisor</option>
                {coSupervisors.map((co_supervisor, index) => (
                  <option value={co_supervisor._id} key={index}>
                    {co_supervisor.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <span
            className='mr-2 cursor-pointer rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300'
            onClick={() => submitCoSupervisor(prevTopicData._id)}
          >
            Request
          </span>
        </div>
      )}
    </div>
  )
}

export default RequestForm
