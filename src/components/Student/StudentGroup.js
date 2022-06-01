import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
// import Spinner from '../Spinner'

import StudentGroupDetails from './StudentGroup/StudentGroupDetails'
import AddStudentGroup from './StudentGroup/AddStudentGroup'

const StudentGroup = () => {
  // const [loading, setLoading] = useState(false)
  const [groupData, setGroupData] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  const { user } = useSelector((store) => store.auth)

  const groupDetails = () => {
    axios
      .get(`${process.env.SERVER_BACKEND_URL}/api/v1/student/${user.userId}`)
      .then((res) => setGroupData(res.data))
  }

  useEffect(() => {
    groupDetails()
  }, [])

  // if (loading) {
  //   return <Spinner />
  // }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      <div className='flex flex-row space-x-10'>
        {!groupData && (
          <div className='mb-4 flex w-full items-center justify-end'>
            <div
              className='hover:scale-102 flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 py-1 px-4 text-base text-slate-50 duration-500 hover:shadow-lg hover:shadow-gray-600'
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister ? 'Go Back' : ' Register Group'}
            </div>
          </div>
        )}
      </div>

      {showRegister ? (
        <AddStudentGroup />
      ) : (
        <StudentGroupDetails groupData={groupData} />
      )}
    </div>
  )
}

export default StudentGroup
