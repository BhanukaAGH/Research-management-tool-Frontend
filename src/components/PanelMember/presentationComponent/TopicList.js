import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OneRow from './OneRow'

const TopicList = (props) => {
  const [topics, setTopics] = useState([])
  const [IsDisplay, setIsDisplay] = useState(true)
  const getTopicList = async () => {
    const res = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getAcceptTopicsByPanel`
    )
    const { acceptTopics } = res.data
    if (acceptTopics.length != 0) {
      setTopics(acceptTopics)
      return
    } else {
      setIsDisplay(false)
      return
    }
  }

  useEffect(() => {
    getTopicList()
  }, [])

  const display = () => {
    props.displayData(topics)
  }

  return IsDisplay ? (
    <div>
      <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
        <thead className='sticky top-0'>
          <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
            <th className='px-6 py-3'>Group ID</th>
            <th className='px-6 py-3'>Topic name</th>
            <th className='px-6 py-3'>Research Area</th>
            <th className='px-6 py-3'>Submit Date</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => {
            return <OneRow key={topic._id} {...topic} IsShow={display} />
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <h1 className='mb-4 text-center'>No Topics to evaluate to Presentation</h1>
  )
}

export default TopicList
