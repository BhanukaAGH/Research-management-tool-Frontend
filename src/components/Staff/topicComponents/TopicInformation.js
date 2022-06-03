import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { updateTopic } from '../../../features/topic/topicSlice'
import Spinner from '../../Spinner'
import { useSnackbar } from 'notistack'

const TopicInformation = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { isLoading, isSuccess, isError, message, topic } = useSelector(
    (state) => state.topic
  )
  const { user } = useSelector((state) => state.user)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          Topic Information
        </h3>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Topic name</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {topic.topicName}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Gorup id</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {topic.groupId || 'Research ID'}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Research area</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {topic.researchArea}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Submit date</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {moment(topic.createdAt).format('YYYY/MM/DD')}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Status</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <div className='flex items-center justify-between'>
                {user &&
                  user.role === 'supervisor' &&
                  topic.supervisor.status.toUpperCase()}
                {user &&
                  user.role === 'co_supervisor' &&
                  topic.coSupervisor.status.toUpperCase()}
                <div className='space-x-2'>
                  <span
                    className='cursor-pointer rounded-md bg-blue-200 py-1  px-4 text-blue-500'
                    onClick={() => {
                      dispatch(
                        updateTopic({
                          topicId: topic._id,
                          topicData: {
                            id:
                              user.role === 'supervisor'
                                ? topic.supervisor.id
                                : user.role === 'co_supervisor' &&
                                  topic.coSupervisor.id,
                            status: 'approve',
                          },
                        })
                      )
                      enqueueSnackbar('topic was approved.', {
                        variant: 'success',
                      })
                    }}
                  >
                    Approve
                  </span>
                  <span
                    className='cursor-pointer rounded-md bg-red-200 py-1  px-4 text-red-500'
                    onClick={() => {
                      dispatch(
                        updateTopic({
                          topicId: topic._id,
                          topicData: {
                            id:
                              user.role === 'supervisor'
                                ? topic.supervisor.id
                                : user.role === 'co_supervisor' &&
                                  topic.coSupervisor.id,
                            status: 'reject',
                          },
                        })
                      )
                      enqueueSnackbar('topic was rejected.', {
                        variant: 'warning',
                      })
                    }}
                  >
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
