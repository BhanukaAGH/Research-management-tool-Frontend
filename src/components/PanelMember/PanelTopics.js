import React, { useState } from 'react'
import AcceptTopics from './TopicComponent/AcceptTopics'
import Spinner from '../Spinner'
const PanelTopics = () => {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <Spinner />
  }
  return (
    <div className='h-full w-full overflow-auto p-5'>
      <AcceptTopics setLoading={setLoading} />
    </div>
  )
}

export default PanelTopics
