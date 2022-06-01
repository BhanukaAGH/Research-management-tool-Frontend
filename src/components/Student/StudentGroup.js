import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import Spinner from '../Spinner'

import StudentGroupDetails from './StudentGroup/StudentGroupDetails'
import AddStudentGroup from './StudentGroup/AddStudentGroup'

const StudentGroup = () => {
  // const [loading, setLoading] = useState(false)
  // const [groupData, setGroupData] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  // const { user } = useSelector((store) => store.auth)

  // const groupDetails = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.get(
  //       `${process.env.SERVER_BACKEND_URL}/api/v1/student/${user.userId}`
  //     )
  //     setGroupData(response.data)
  //     console.log(groupData.groupID)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  //   setLoading(false)
  // }
  // useEffect(() => {
  //   groupDetails()
  // }, [])

  // if (loading) {
  //   return <Spinner />
  // }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      <div className='flex flex-row space-x-10'>
        <div> Student Group </div>

        <div>
          <button
            className='w-2/12 rounded border-2 border-indigo-400 bg-gray-900 py-2 text-center font-bold text-indigo-400 focus:outline-none'
            onClick={() => setShowRegister(!showRegister)}
          >
            Register
          </button>
        </div>
      </div>

      {showRegister ? <AddStudentGroup /> : <StudentGroupDetails />}
    </div>
  )
}

export default StudentGroup
