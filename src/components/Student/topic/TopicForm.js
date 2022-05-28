import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCreateTopic } from '../../../features/ui/uiSlice'
import {
  createTopic,
  updateTopic,
  reset,
} from '../../../features/topic/topicSlice'
import { MdCheck } from 'react-icons/md'
import { useSnackbar } from 'notistack'
import Spinner from '../../Spinner'

const TopicForm = ({ prevTopicData }) => {
  const [formData, setFormData] = useState({
    topicName: prevTopicData ? prevTopicData.topicName : '',
    researchArea: prevTopicData ? prevTopicData.researchArea : '',
  })
  const { topicName, researchArea } = formData

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { isLoading, isSuccess } = useSelector((state) => state.topic)
  const { createTopicState } = useSelector((state) => state.ui)

  const { enqueueSnackbar } = useSnackbar()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = () => {
    if (topicName && researchArea) {
      const Data = {
        topicId: prevTopicData._id,
        topicData: {
          topicName,
          researchArea,
          groupId: user.groupId,
          studentId: user._id,
        },
      }
      if (!prevTopicData) {
        dispatch(createTopic(Data.topicData))
      } else {
        dispatch(updateTopic(Data))
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (prevTopicData) {
        enqueueSnackbar('Topic is updated.', { variant: 'success' })
      } else {
        enqueueSnackbar('Topic is created.', { variant: 'success' })
      }
    }
    dispatch(reset())
  }, [isSuccess, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className='mb-4 flex w-full items-center justify-end'>
        {!createTopicState && (
          <div
            className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 py-1 px-4 text-base text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
            onClick={() => dispatch(setCreateTopic(true))}
          >
            {prevTopicData ? 'Update Topic' : 'Create Topic'}
          </div>
        )}
        {createTopicState && (
          <div
            className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-[#E2A500] px-6 py-1 text-base text-slate-50 duration-500 hover:shadow-lg hover:shadow-orange-300'
            onClick={() => {
              onSubmit()
              dispatch(setCreateTopic(false))
            }}
          >
            <MdCheck className='text-2xl font-black' />
          </div>
        )}
      </div>

      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500 sm:flex sm:items-center'>
              Topic Name
            </dt>
            {createTopicState && (
              <input
                type='text'
                className='mt-1 h-fit w-full rounded-md bg-gray-200 py-3 px-4 text-sm text-gray-900 outline-none sm:col-span-2 sm:mt-0'
                name='topicName'
                value={topicName}
                onChange={onChange}
                disabled={!createTopicState}
              />
            )}
            {!createTopicState && (
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {topicName}
              </dd>
            )}
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500 sm:flex sm:items-center'>
              Research Area
            </dt>
            {createTopicState && (
              <input
                type='text'
                className='mt-1 h-fit w-full rounded-md bg-gray-200 py-3 px-4 text-sm text-gray-900 outline-none sm:col-span-2 sm:mt-0'
                name='researchArea'
                value={researchArea}
                onChange={onChange}
                disabled={!createTopicState}
              />
            )}
            {!createTopicState && (
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {researchArea}
              </dd>
            )}
          </div>
        </dl>
      </div>
    </div>
  )
}

export default TopicForm
