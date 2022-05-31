import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const StudentGroupDetails = () => {
  const [groupData, setGroupData] = useState({})

  const { user } = useSelector((store) => store.auth)

  const groupDetails = () => {
    axios
      .get(`${process.env.SERVER_BACKEND_URL}/api/v1/student/${user.userId}`)
      .then((res) => setGroupData(res.data))
  }

  useEffect(() => {
    groupDetails()
  }, [])

  // if (groupData.leader) {
  //   console.log(groupData.leader.email)
  // }

  return (
    <div>
      <div> your group ID : {groupData.groupID} </div>
      {/* <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
        <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
          <thead className='sticky top-0'>
            <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
              <th className='px-6 py-3'>Role</th>
              <th className='px-6 py-3'>Name</th>
              <th className='px-6 py-3'>Student ID</th>
              <th className='px-6 py-3'>Email</th>
            </tr>
          </thead>

          <tbody>
            <tr className='cursor-pointer border-b bg-white hover:bg-gray-200'>
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                leader
              </th>
              <td className='px-6 py-4'>{leader.name}</td>
              <td className='px-6 py-4'>{leader.regNo}</td>
              <td className='px-6 py-4'>{leader.email}</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

export default StudentGroupDetails
