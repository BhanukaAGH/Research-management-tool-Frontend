import React from 'react'
import { useState, useEffect } from 'react'
import PopModel from './PopModel'
import SendFeedBack from './SendFeedBack'
import axios from 'axios'
import { MdOutlineAttachFile } from 'react-icons/md'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'

import { saveAs } from 'file-saver'

const TopicInfo = ({
  _id,
  topicName,
  researchArea,
  createdAt,
  group,
  setLoading,
  allocated,
  panel,
}) => {
  const [details] = group
  const { regNo, email, name: StudentName } = details.leader
  const [showbtn, setShowbtn] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [btnValue, setBtnValue] = useState('')
  const [status, setStatus] = useState('Pending')
  const [approvedDate, setApprovedDate] = useState('')
  const [ischeck, setIscheck] = useState(false)
  const [document, setDocument] = useState({})
  const [error, setError] = useState(true)
  var date = new Date(createdAt)
  var dateApproved = new Date(approvedDate)

  const fetchPanelTopic = async () => {
    axios
    const res = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getTopicStatus/${details._id}`
    )

    const { topicInfo } = res.data

    if (Object.keys(topicInfo).length === 0) {
      return setStatus('Pending')
    } else {
      setStatus(topicInfo.topicStatus)
      setApprovedDate(topicInfo.dateAppordeOrReject)
      setIscheck(true)
    }
  }

  const fetchDocument = async () => {
    const res = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getSubmittedDocument/${details.groupID}`
    )

    if (
      Object.keys(res.data.document).length === 0 &&
      Object.getPrototypeOf(document) === Object.prototype
    ) {
      setError(false)
      return
    } else {
      const { document } = res.data

      const pdf = document.find((el) => el.submitFileName.includes('pdf'))

      if (pdf) {
        const { submitFileName, submitDocumentUrl } = pdf

        const info = {
          submitFileName,
          submitDocumentUrl,
        }

        setDocument(info)
        return
      } else {
        setError(false)
      }
    }
  }

  useEffect(() => {
    fetchPanelTopic()
    fetchDocument()
  }, [])

  const sendDate = async () => {
    const allDate = {
      topicStatus: btnValue,
      groupID: details._id,
      topicID: _id,
      panelMember: panel,
    }

    const response = await axios.post(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/topicAcceptOrReject`,
      allDate
    )
  }

  const pop = () => {
    setShowbtn(!showbtn)
  }

  const passValue = (name) => {
    setBtnValue(name)
    setShowbtn(!showbtn)
  }

  const showEmailModel = () => {
    setShowEmail(!showEmail)
  }

  const closeEmail = () => {
    setShowEmail(!showEmail)
  }

  return (
    <div>
      {showbtn ? (
        <PopModel
          model={pop}
          name={btnValue}
          send={sendDate}
          fetchPanelTopic={fetchPanelTopic}
        />
      ) : null}

      {showEmail ? (
        <SendFeedBack
          emailModel={closeEmail}
          mail={email}
          reg={regNo}
          StudentName={StudentName}
          setLoading={setLoading}
        />
      ) : null}
      <div className='mb-4 mt-3 flex items-center justify-between'>
        <p className='text-base '>Research Area:{researchArea}</p>
        <p className='text-base '>Student Email:{email}</p>
        <p className='text-base '>Group Id:{details.groupID}</p>
      </div>
      <p className='text-base'>Submitted At: {date.toDateString()}</p>
      <p className='text-base'>
        Panel Member Approval:
        <span
          className={`ml-2  rounded px-2.5 py-0.5 text-base font-semibold ${
            status === 'Accept'
              ? 'bg-green-200 text-green-800'
              : status === 'Reject'
              ? 'bg-red-200 text-red-800'
              : 'bg-blue-200 text-blue-800'
          }`}
        >
          {status}
        </span>
      </p>
      {ischeck ? (
        <p className='text-base'>
          Panel member {status} At:{dateApproved.toDateString()}{' '}
        </p>
      ) : null}

      <div className='mt-4 mb-4 rounded-lg border-2 border-gray-400 bg-stone-50 p-5'>
        <h2 className='mb-4 text-lg font-medium text-gray-500'>
          Submitted Document
        </h2>
        {error ? (
          <div className='flex items-center justify-between text-base'>
            <p>File name:</p>
            <MdOutlineAttachFile className='h-5 w-5 flex-shrink-0 text-gray-400' />

            <span className='ml-2 w-0 flex-1 truncate'>
              {document.submitFileName}
            </span>
            <div
              className='flex cursor-pointer items-center justify-between gap-2 text-indigo-600 hover:text-indigo-500 '
              onClick={() =>
                saveAs(document.submitDocumentUrl, document.submitFileName)
              }
            >
              <FaRegArrowAltCircleDown className=' ' />
              <span className=' font-medium '>Download</span>
            </div>
          </div>
        ) : (
          <h4 className='text-sm'>This group still not submit the document</h4>
        )}
      </div>

      <div className='mt-3 flex items-center  justify-between'>
        <button
          type='submit'
          className={`topic-btn ${
            allocated
              ? 'cursor-pointer bg-green-500 hover:bg-green-700 '
              : ' bg-green-300'
          } `}
          onClick={() => passValue('Accept')}
          disabled={!allocated}
        >
          Accept
        </button>

        <button
          type='submit'
          className={`topic-btn ${
            allocated
              ? 'cursor-pointer bg-red-600  hover:bg-red-700 '
              : ' bg-red-300'
          } `}
          onClick={() => passValue('Reject')}
          disabled={!allocated}
        >
          Reject
        </button>

        <button
          type='submit'
          className={`topic-btn ${
            allocated
              ? 'cursor-pointer bg-yellow-400  hover:bg-yellow-600 '
              : ' bg-yellow-300'
          } `}
          onClick={showEmailModel}
          disabled={!allocated}
        >
          Send Feedback
        </button>
      </div>
    </div>
  )
}

export default TopicInfo
