import React from 'react'

const OneRow = ({ groupID, topicID, IsShow }) => {
  const { groupID: sdf } = groupID
  const { topicName, researchArea, createdAt } = topicID

  let submittedDate = new Date(createdAt)
  const showData = () => {
    IsShow()
  }
  return (
    <tr
      className='cursor-pointer border-b bg-white hover:bg-gray-200'
      onClick={showData}
    >
      <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
        {sdf}
      </th>
      <td className='px-6 py-4'>{topicName}</td>
      <td className='px-6 py-4'>{researchArea}</td>
      <td className='px-6 py-4'>{submittedDate.toDateString()}</td>
    </tr>
  )
}

export default OneRow
