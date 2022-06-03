import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from '../Spinner'

import StudentGroupDetails from './StudentGroup/StudentGroupDetails'
import AddStudentGroup from './StudentGroup/AddStudentGroup'

const StudentGroup = () => {
  const [loading, setLoading] = useState(true)
  const [groupData, setGroupData] = useState(null)

  const { user } = useSelector((store) => store.auth)

  const groupDetails = async () => {
    const response = await axios.get(
      `${process.env.SERVER_BACKEND_URL}/api/v1/student/${user.userId}`
    )

    setLoading(false)

    setGroupData(response.data)
  }

  useEffect(() => {
    groupDetails()
  }, [])

  if (groupData) {
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      <div className='flex flex-row space-x-10'></div>

      {groupData ? (
        <StudentGroupDetails groupData={groupData} />
      ) : (
        <AddStudentGroup setGroupData={setGroupData} />
      )}
    </div>
  )
}

export default StudentGroup
