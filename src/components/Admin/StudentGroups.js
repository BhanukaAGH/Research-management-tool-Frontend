import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import Allocate from './Sub components/Allocate'

const StudentGroups = () => {
  const [data, setData] = useState([]) //get all student groups
  const [allocate, setAllocate] = useState(false) //open allocatewindow
  const [groupID, setGroupID] = useState('') //set group id of selected group

  //get student group details
  const tableList = () => {
    axios
      .get('http://localhost:5000/api/v1/student/getgroups')
      .then((json) => setData(json.data))
  }

  useEffect(() => {
    tableList()
  }, [])
  const renderTable = () => {
    return data.map((user, index) => {
      //display details
      return (
        <tr
          className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-[#3a454b]'
          key={index}
        >
          <td className='w-4 p-4'></td>
          <td className='whitespace-nowrapont-medium text-gray-900 dark:text-white'>
            {user.groupID}
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            <ul>
              <li>{user.leader.name}</li>
              <li>{user.leader.regNo}</li>
              <li>{user.leader.email}</li>
            </ul>
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            <ul>
              <li>{user.member2.name}</li>
              <li>{user.member2.regNo}</li>
              <li>{user.member2.email}</li>
            </ul>
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            <ul>
              <li>{user.member3.name}</li>
              <li>{user.member3.regNo}</li>
              <li>{user.member3.email}</li>
            </ul>
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            <ul>
              <li>{user.member4.name}</li>
              <li>{user.member4.regNo}</li>
              <li>{user.member4.email}</li>
            </ul>
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.Panelmember}
          </td>
          <td className='px-6 py-4 text-right'>
            <a
              className='font-medium text-[#e2a500] hover:underline dark:text-[#e2a500]'
              onClick={() => {
                setGroupID(user._id)
                setAllocate(true)
              }}
            >
              Allocate
            </a>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      StudentGroups
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='justify-left flex items-center'>
          <button
            className='mr-2 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 hover:bg-yellow-200  dark:bg-yellow-200 dark:text-yellow-800 dark:hover:bg-yellow-300'
            onClick={tableList}
          >
            refresh Table
          </button>
        </div>
        <table
          id='myTable'
          className='w-full text-left text-sm text-gray-500 dark:text-gray-400'
        >
          <thead className='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
            <tr>
              <th scope='col' className='p-4'>
                <div className='flex items-center'></div>
              </th>
              <th scope='col' className='px-2 py-1'>
                Group ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Leader
              </th>
              <th scope='col' className='px-6 py-3'>
                Member 1
              </th>
              <th scope='col' className='px-6 py-3'>
                Member 2
              </th>
              <th scope='col' className='px-6 py-3'>
                Member 3
              </th>
              <th scope='col' className='px-6 py-3'>
                Panel_Member
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>

          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      {allocate && <Allocate groupID={groupID} setAllocate={setAllocate} />}
    </div>
  )
}

export default StudentGroups
