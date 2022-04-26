import React, { useState } from 'react'
import SelectedTopic from './topic components/SelectedTopic'
import TopicsList from './topic components/TopicsList'

const TopicRequest = () => {
  const [selectTopic, setSelectTopic] = useState(null)

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!selectTopic && <TopicsList setSelectTopic={setSelectTopic} />}
      {selectTopic && <SelectedTopic setSelectTopic={setSelectTopic} />}
    </div>
  )
}

export default TopicRequest
