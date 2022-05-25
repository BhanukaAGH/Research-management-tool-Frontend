import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {
  getAllTopics,
  selectTopic,
  reset,
} from '../../../features/topic/topicSlice'
import Spinner from '../../Spinner'

const TopicsList = () => {
  const dispatch = useDispatch()

  const { topics, isLoading } = useSelector((state) => state.topic)

  useEffect(() => {
    dispatch(getAllTopics())
  }, [])

  useEffect(() => {
    dispatch(reset())
  }, [topics])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {topics.length === 0 && (
        <div className='flex w-full items-center justify-center py-4'>
          <div className='w-full rounded-md bg-gray-700 py-4 text-center text-base font-medium text-white shadow-md md:text-lg lg:w-1/2 lg:text-xl'>
            No topic request.
          </div>
        </div>
      )}
      {topics.length > 0 && (
        <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
          <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
            <thead className='sticky top-0'>
              <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
                <th className='px-6 py-3'>Topic name</th>
                <th className='px-6 py-3'>Group ID</th>
                <th className='px-6 py-3'>Research Area</th>
                <th className='px-6 py-3'>Submit Date</th>
                <th className='px-6 py-3'>Status</th>
              </tr>
            </thead>

            <tbody>
              {topics &&
                topics.map((topic, index) => (
                  <tr
                    className='cursor-pointer border-b bg-white hover:bg-gray-200'
                    key={index}
                    onClick={() => dispatch(selectTopic(topic))}
                  >
                    <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                      {topic.topicName}
                    </th>
                    <td className='px-6 py-4'>{topic.groupId || 'Group Id'}</td>
                    <td className='px-6 py-4'>{topic.researchArea}</td>
                    <td className='px-6 py-4'>
                      {moment(topic.createdAt).format('YYYY/MM/DD')}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`rounded  px-2.5 py-0.5 text-sm font-semibold  ${
                          topic.status === 'approve'
                            ? 'bg-green-200 text-green-800'
                            : topic.status === 'reject'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {topic.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default TopicsList
