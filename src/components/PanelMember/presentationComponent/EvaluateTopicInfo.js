import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createEvaluation } from '../../../features/evaluation/evaluationSlice'
import { MdKeyboardBackspace, MdCheck } from 'react-icons/md'
import MarkingScheme from './MarkingScheme'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'
import { MdOutlineAttachFile } from 'react-icons/md'
import axios from 'axios'

const EvaluvateTopicInfo = ({ displayData, data }) => {
  const [values] = data
  const { topicID, groupID } = values
  const { topicName, groupId, researchArea, createdAt } = topicID
  const { leader, member2, member3, member4 } = groupID
  let date = new Date(createdAt)

  const [evaluateMark, setEvaluateMark] = useState(false)
  const [evaluateData, setEvaluateData] = useState(null)
  const [error, setError] = useState(true)
  const [document, setDocument] = useState({})
  const closeModel = () => {
    displayData()
  }

  const dispatch = useDispatch()
  const fetchPresentationDocument = async () => {
    const res = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/panel/getSubmittedDocument/${groupId}`
    )
    const { document } = res.data

    if (
      Object.keys(res.data.document).length === 0 &&
      Object.getPrototypeOf(document) === Object.prototype
    ) {
      setError(false)
      return
    } else {
      const { document } = res.data
      console.log(document)
      const ppt = document.find((el) =>
        el.submitFileName.includes('ppt' || 'pptx')
      )
      if (ppt) {
        const { submitFileName, submitDocumentUrl } = ppt

        const info = {
          submitFileName,
          submitDocumentUrl,
        }

        setDocument(info)
        return
      } else {
        setError(false)
        return
      }
    }
  }

  useEffect(() => {
    fetchPresentationDocument()
  }, [])
  //create a evaluate marking scheme only button value(evaluateMark) changed
  useEffect(() => {
    if (!evaluateMark && evaluateData) {
      dispatch(createEvaluation(evaluateData))
    }
  }, [evaluateMark])
  return (
    <Fragment>
      <div className='mb-4 flex justify-between text-base'>
        <div
          className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
          onClick={closeModel}
        >
          <MdKeyboardBackspace />
          <span>Back</span>
        </div>
        <div>
          <button
            className={`hover:scale-102 rounded-md py-1 text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600 ${
              evaluateMark ? 'bg-green-400 px-8' : 'bg-gray-700 px-4'
            }`}
            onClick={() => setEvaluateMark(!evaluateMark)}
          >
            {evaluateMark ? (
              <MdCheck className='text-2xl text-gray-900' />
            ) : (
              'Evaluate Mark'
            )}
          </button>
        </div>
      </div>
      <div className='mb-4 overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Presentation Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            All the group information.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Group ID</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {groupId}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Topic
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {topicName}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Area
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {researchArea}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Submit Date</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {date.toDateString()}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Group Members
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <ul className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {leader.name} - {''}
                      {leader.regNo}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {member2.name} - {''}
                      {member2.regNo}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {member3.name} - {''}
                      {member3.regNo}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {member4.name} - {''}
                      {member4.regNo}
                    </span>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className='mt-4 mb-4 rounded-lg border-2 border-gray-400 bg-stone-50 p-5'>
        <h2 className='mb-4 text-lg font-medium '>
          Submitted Presentation File
        </h2>
        {error ? (
          <div className='flex items-center justify-between text-base'>
            <p>File name:</p>
            <MdOutlineAttachFile className='h-5 w-5 flex-shrink-0 text-gray-400' />

            <span className='ml-2 w-0 flex-1 truncate'>
              {document.submitFileName}
            </span>
            <div
              className='hover:red-indigo-500 flex cursor-pointer items-center justify-between gap-2 text-red-600 '
              onClick={() =>
                saveAs(document.submitDocumentUrl, document.submitFileName)
              }
            >
              <FaRegArrowAltCircleDown className=' ' />
              <span className=' font-medium '>Download</span>
            </div>
          </div>
        ) : (
          <h4 className='text-sm'>
            This group still not submit the Presentation file.
          </h4>
        )}
      </div>

      <h3 className='mb-3 text-lg font-medium leading-6 text-gray-900'>
        Presentation Marking Scheme
      </h3>
      <MarkingScheme
        evaluateMark={evaluateMark}
        groupId={groupId}
        setEvaluateData={setEvaluateData}
      />
    </Fragment>
  )
}

export default EvaluvateTopicInfo
