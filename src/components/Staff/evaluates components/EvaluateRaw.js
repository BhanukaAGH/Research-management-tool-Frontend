import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EvaluateRaw = ({ setSelectGroup, submission }) => {
  const [groupDetails, setGroupDetails] = useState(null)
  const [topicDetails, setTopicDetails] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      const groupResponse = await axios.get(
        `/api/v1/student/${submission.submitUserId}`
      )
      setGroupDetails(groupResponse.data)
      const topicResponse = await axios.get(
        `/api/v1/topic/group/${groupResponse.data.groupID}`
      )
      setTopicDetails(topicResponse.data)
    }
    getDetails()
  }, [])

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
          <td className='px-6 py-4'>{submission.updatedAt}</td>
        </tr>
      )}
    </>
  )
}

export default EvaluateRaw
