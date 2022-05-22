import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createEvaluation } from '../../../features/evaluation/evaluationSlice'
import { saveAs } from 'file-saver'
import moment from 'moment'
import {
  MdOutlineAttachFile,
  MdKeyboardBackspace,
  MdCheck,
} from 'react-icons/md'
import MarkingScheme from './MarkingScheme'

const GroupInformation = ({ selectGroup, setSelectGroup }) => {
  const [evaluateMark, setEvaluateMark] = useState(false)
  const [evaluateData, setEvaluateData] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!evaluateMark && evaluateData) {
      console.log('called')
      dispatch(createEvaluation(evaluateData))
    }
  }, [evaluateMark])

  return (
    <>
      <div className='mb-4 flex justify-between text-base'>
        <div
          className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
          onClick={() => setSelectGroup(null)}
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
            Research Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Group details and documents.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Group ID</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.group.groupID}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Topic
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.topic.topicName}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Research Area
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {selectGroup.topic.researchArea}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Submit Date</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {moment(selectGroup.submission.updatedAt).format('YYYY/MM/DD')}
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
                      {selectGroup.group.leader.regNo} -{' '}
                      {selectGroup.group.leader.name}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {selectGroup.group.member2.regNo} -{' '}
                      {selectGroup.group.member2.name}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {selectGroup.group.member3.regNo} -{' '}
                      {selectGroup.group.member3.name}
                    </span>
                  </li>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <span className='ml-2 w-0 flex-1 truncate'>
                      {selectGroup.group.member4.regNo} -{' '}
                      {selectGroup.group.member4.name}
                    </span>
                  </li>
                </ul>
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Submit Documents
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <div className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <div className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <div className='flex w-0 flex-1 items-center'>
                      <MdOutlineAttachFile className='h-5 w-5 flex-shrink-0 text-gray-400' />
                      <span className='ml-2 w-0 flex-1 truncate'>
                        {selectGroup.submission.submitFileName}
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0 cursor-pointer'>
                      <span
                        className='cursor-pointer font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() =>
                          saveAs(
                            selectGroup.submission.submitDocumentUrl,
                            selectGroup.submission.submitFileName
                          )
                        }
                      >
                        Download
                      </span>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <MarkingScheme
        groupId={selectGroup.group.groupID}
        evaluateMark={evaluateMark}
        setEvaluateData={setEvaluateData}
      />
    </>
  )
}

export default GroupInformation
