import React, { useState } from 'react'
import EvaluateTopicInfo from './presentationComponent/EvaluateTopicInfo'
import TopicList from './presentationComponent/TopicList'

const PanelPresentation = () => {
  const [isShow, setIsShow] = useState(true)
  const [info, setInfo] = useState([])

  const showOtherPart = (list) => {
    setIsShow(false)
    setInfo(list)
  }

  const close = () => {
    setIsShow(true)
  }
  return (
    <div className='h-full w-full overflow-auto p-5'>
      {isShow ? (
        <TopicList displayData={showOtherPart} />
      ) : (
        <EvaluateTopicInfo displayData={close} data={info} />
      )}
    </div>
  )
}

export default PanelPresentation
