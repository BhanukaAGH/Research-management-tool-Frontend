import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'
import TopicInfo from './TopicInfo'

const AcceptTopic = ({ topic, setLoading }) => {
  const { _id, topicName, researchArea, createdAt, groupId } = topic

  const [show, setShow] = useState(false)
  const [group, setGroup] = useState([])
  const topicInformation = {
    _id,
    researchArea,
    createdAt,
    topicName,
    group,
  }

  const getGroup = async () => {
    const res = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getGroupDetails/${groupId}`
    )
    const { groupDetails } = res.data
    setGroup(groupDetails)
  }

  useEffect(() => {
    getGroup()
  }, [])

  return (
    <article className='mb-3 rounded-md border-2 border-gray-400 bg-stone-50 p-4 '>
      <div className=' flex items-center justify-between'>
        <h1 className='text-sm text-lg'>Topic Name: {topicName}</h1>
        <button onClick={() => setShow(!show)}>
          {show ? (
            <FaRegArrowAltCircleUp className='cursor-pointer' />
          ) : (
            <FaRegArrowAltCircleDown className='cursor-pointer' />
          )}
        </button>
      </div>
      {show && <TopicInfo {...topicInformation} setLoading={setLoading} />}
    </article>
  )
}

export default AcceptTopic
