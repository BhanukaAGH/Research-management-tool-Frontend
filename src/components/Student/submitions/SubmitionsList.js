import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAssignments } from '../../../features/assignment/assignmentSlice'
import Spinner from '../../Spinner'
import SubmissionCard from './SubmissionCard'

const SubmitionsList = ({ setSelectSubmition }) => {
  const dispatch = useDispatch()
  const { assignments, isLoading } = useSelector((state) => state.assignment)

  useEffect(() => {
    dispatch(getAllAssignments())
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {assignments &&
        assignments.map((assignment) => (
          <SubmissionCard
            key={assignment._id}
            assignment={assignment}
            setSelectSubmition={setSelectSubmition}
          />
        ))}
    </div>
  )
}

export default SubmitionsList
