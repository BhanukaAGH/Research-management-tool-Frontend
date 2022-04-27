import React from 'react'
import SelectedTopic from './topic components/SelectedTopic'
import TopicsList from './topic components/TopicsList'
import { useSelector } from 'react-redux'

const TopicRequest = () => {
  const { topic } = useSelector((state) => state.topic)

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!topic && <TopicsList />}
      {topic && <SelectedTopic />}
    </div>
  )
}

export default TopicRequest
