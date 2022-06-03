import React from 'react'
import SelectedTopic from './topicComponents/SelectedTopic'
import TopicsList from './topicComponents/TopicsList'
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
