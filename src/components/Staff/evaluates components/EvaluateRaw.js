import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const EvaluateRaw = ({ setSelectGroup, submission }) => {
  const [loading, setLoading] = useState(false)
  const [groupDetails, setGroupDetails] = useState(null)
  const [topicDetails, setTopicDetails] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true)
      const groupResponse = await axios.get(
        `/api/v1/student/${submission.submitUserId}`
      )
      setGroupDetails(groupResponse.data)
      const topicResponse = await axios.get(
        `/api/v1/topic/group/${groupResponse.data.groupID}`
      )
      setTopicDetails(topicResponse.data)
      setLoading(false)
    }
    getDetails()
  }, [])

  if (loading) {
    return (
      <tr className='animate-pulse border-b bg-white'>
        <th className='px-6 py-5'>
          <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
        </th>
        <td className='px-6 py-5'>
          <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
        </td>
        <td className='px-6 py-5'>
          <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
        </td>
        <td className='px-6 py-5'>
          <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
        </td>
      </tr>
    )
  }

  return (
    <>
      {groupDetails && topicDetails && (
        <tr
          className='cursor-pointer border-b bg-white hover:bg-gray-200'
          onClick={() =>
            setSelectGroup({
              group: groupDetails,
              topic: topicDetails,
              submission,
            })
          }
        >
          <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
            {groupDetails.groupID}
          </th>
          <td className='px-6 py-4'>{topicDetails.topicName}</td>
          <td className='px-6 py-4'>{topicDetails.researchArea}</td>
          <td className='px-6 py-4'>
            {moment(submission.updatedAt).format('YYYY/MM/DD')}
          </td>
        </tr>
      )}
    </>
  )
}

export default EvaluateRaw
