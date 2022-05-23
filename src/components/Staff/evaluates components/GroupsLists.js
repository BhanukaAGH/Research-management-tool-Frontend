import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSubmissions } from '../../../features/submission/submissionSlice'
import Spinner from '../../Spinner'
import EvaluateRaw from './EvaluateRaw'

const GroupsLists = ({ setSelectGroup }) => {
  const dispatch = useDispatch()
  const { submissions, isLoading } = useSelector((state) => state.submission)

  useEffect(() => {
    dispatch(getAllSubmissions())
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
      <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
        <thead className='sticky top-0'>
          <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
            <th className='px-6 py-3'>Group ID</th>
            <th className='px-6 py-3'>Topic name</th>
            <th className='px-6 py-3'>Research Area</th>
            <th className='px-6 py-3'>Submit Date</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((submission, index) => (
            <EvaluateRaw
              key={index}
              setSelectGroup={setSelectGroup}
              submission={submission}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupsLists
