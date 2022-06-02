import * as React from 'react'
import { useState, useEffect } from 'react'
import AcceptTopic from './AcceptTopic'
import axios from 'axios'

const AcceptTopics = ({ setLoading }) => {
  const [topics, setTopics] = useState([])
  const [isTopicIn, setTopicIn] = useState(true)
  const fetchTopics = async () => {
    const response = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getAcceptTopics`
    )
    const {
      data: { acceptTopics },
    } = response

    if (acceptTopics.length != 0) {
      setTopics(acceptTopics)
      return
    } else {
      setTopicIn(false)
      return
    }
  }
  useEffect(() => {
    fetchTopics()
  }, [])

  return isTopicIn ? (
    <main>
      <h2 className='mb-4 text-center'>List of Topics</h2>

      {topics.map((topic) => {
        return (
          <AcceptTopic key={topic._id} setLoading={setLoading} topic={topic} />
        )
      })}
    </main>
  ) : (
    <h1 className='mb-4 text-center'>No Topics Accept by the Supervisor yet</h1>
  )
}

export default AcceptTopics
