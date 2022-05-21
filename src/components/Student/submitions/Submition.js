import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import {
  getSubmission,
  submitDocument,
  reset,
} from '../../../features/submission/submissionSlice'
import { submitSubmission } from '../../../features/ui/uiSlice'
import { MdKeyboardBackspace, MdCheck } from 'react-icons/md'
import FileSubmition from './FileSubmition'
import { useSnackbar } from 'notistack'
import Spinner from '../../Spinner'

const Submition = ({ selectSubmition, setSelectSubmition }) => {
  const [selectFile, setSelectFile] = useState(null)

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { submission, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submission
  )
  const { submit } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(getSubmission(selectSubmition._id))
    if (!submit && selectFile) {
      const submission = {
        submissionId: selectSubmition._id,
        submissionName: selectSubmition.name,
        submissionDescription: selectSubmition.description,
      }
      const data = {
        document: selectFile,
        submission,
      }
      dispatch(submitDocument(data))
      setSelectFile(null)
    }
  }, [submit])

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' })
    }

    if (isSuccess) {
      enqueueSnackbar('Successfully, Submited.', { variant: 'success' })
    }

    dispatch(reset())
  }, [isSuccess, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className='mb-4 flex w-full items-center justify-between'>
        <div
          className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-base text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
          onClick={() => setSelectSubmition(null)}
        >
          <MdKeyboardBackspace />
          <span>Back</span>
        </div>
        <div
          className={`hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md py-1 text-base text-slate-50 duration-500 hover:shadow-lg  ${
            submit
              ? 'bg-[#E2A500] px-6 hover:shadow-orange-300'
              : 'bg-gray-700 px-4 hover:shadow-gray-600'
          }`}
          onClick={() => dispatch(submitSubmission(!submit))}
        >
          {submit && <MdCheck className='text-2xl font-black' />}
          {!submit && (
            <span>{!submission ? 'Add Submission' : 'Edit Submission'}</span>
          )}
        </div>
      </div>

      <div className='mb-6'>
        <dl>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission name
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {selectSubmition.name}
            </dd>
          </div>
          <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission Description
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {selectSubmition.description}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission type
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {selectSubmition.type}
            </dd>
          </div>
          <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Submission status
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {!submission ? 'Not attempt' : 'Submitted'}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Due Date</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {selectSubmition.dueDate}
            </dd>
          </div>
          <div className='bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Time Remaining
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {moment(selectSubmition.dueDate, 'MMDDYYYY').fromNow()}
            </dd>
          </div>
          {submission && (
            <div className='bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500 sm:py-3'>
                Submit Document
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <div className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <div className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <div className='flex w-0 flex-1 items-center'>
                      <svg
                        className='h-5 w-5 flex-shrink-0 text-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='ml-2 w-0 flex-1 truncate'>
                        {submission.submitFileName}
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <span
                        className='cursor-pointer font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() =>
                          saveAs(
                            submission.submitDocumentUrl,
                            submission.submitFileName
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
          )}
        </dl>
      </div>

      {submit && <FileSubmition setSelectFile={setSelectFile} />}
    </div>
  )
}

export default Submition
