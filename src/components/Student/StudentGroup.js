import React, { useState } from 'react'
import axios from 'axios'

import StudentGroupDetails from './StudentGroup/StudentGroupDetails'
import AddStudentGroup from './StudentGroup/AddStudentGroup'

const StudentGroup = () => {
  const [showRegister, setShowRegister] = useState(false)

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
