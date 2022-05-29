import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RequestForm from './topic/RequestForm'
import TopicForm from './topic/TopicForm'
import axios from 'axios'
import Spinner from '../Spinner'

const StudentTopic = () => {
  const [loading, setLoading] = useState(false)
  const [topicData, setTopicData] = useState(null)

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const getTopic = async () => {
      if (user && user.groupId) {
        setLoading(true)
        try {
          const response = await axios.get(
            `${process.env.SERVER_BACKEND_URL}/api/v1/topic/group/${user.groupId}`
          )
          setTopicData(response.data)
        } catch (error) {
          console.log(error.message)
          console.log('You not have topic')
        }
        setLoading(false)
      }
    }
    getTopic()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!user.groupId && (
        <div className='flex w-full items-center justify-center py-4'>
          <div className='w-full rounded-md bg-gray-700 py-4 text-center text-base font-medium text-white shadow-md md:text-lg lg:w-1/2 lg:text-xl'>
            You don't have a group.
          </div>
        </div>
      )}
      {user.groupId && (
        <>
          <TopicForm prevTopicData={topicData} />
          <RequestForm prevTopicData={topicData} setTopicData={setTopicData} />
        </>
      )}
    </div>
  )
}

export default StudentTopic
