import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const AddStudentGroup = ({ setGroupData }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [student, setStudent] = useState({
    leaderStudentID: '',
    member2StudentID: '',
    member3StudentID: '',
    member4StudentID: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setStudent({ ...student, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newGroup = {
      leaderId: student.leaderStudentID.toUpperCase(),
      member2Id: student.member2StudentID.toUpperCase(),
      member3Id: student.member3StudentID.toUpperCase(),
      member4Id: student.member4StudentID.toUpperCase(),
    }

    axios
      .post(
        `${process.env.SERVER_BACKEND_URL}/api/v1/student/groupRegister`,
        newGroup
      )
      .then((res) => {
        enqueueSnackbar('Group Succesfully Registered', { variant: 'success' })
        setGroupData(res.data)
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.msg, { variant: 'error' })
      })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      <div> Student Group Registration</div>
      <br />

      <form className='rounded-md bg-gray-300 p-4'>
        <div className='mb-6 flex flex-row'>
          <div className='basis-1/3'>
            <label
              htmlFor='StudentID'
              className='mb-2  block  text-sm font-medium text-gray-900'
            >
              Leader(member 1) Student ID
            </label>
          </div>

          <input
            type='text'
            id='leaderStudentID'
            name='leaderStudentID'
            className=' block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='ITXXXXXXXX'
            required=''
            value={student.leaderStudentID}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6 flex flex-row'>
          <div className='basis-1/3'>
            <label
              htmlFor='StudentID'
              className='mb-2 block text-sm font-medium text-gray-900 '
            >
              Member 2 Student ID
            </label>
          </div>
          <input
            type='text'
            id='member2StudentID'
            name='member2StudentID'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='ITXXXXXXXX'
            required=''
            value={student.member2StudentID}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6 flex flex-row'>
          <div className='basis-1/3'>
            <label
              htmlFor='StudentID'
              className='mb-2 block text-sm font-medium text-gray-900 '
            >
              Member 3 Student ID
            </label>
          </div>
          <input
            type='text'
            id='member3StudentID'
            name='member3StudentID'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='ITXXXXXXXX'
            required=''
            value={student.member3StudentID}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6 flex flex-row'>
          <div className='basis-1/3'>
            <label
              htmlFor='StudentID'
              className='mb-2 block text-sm font-medium text-gray-900 '
            >
              Member 4 Student ID
            </label>
          </div>
          <input
            type='text'
            id='member4StudentID'
            name='member4StudentID'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='ITXXXXXXXX'
            required=''
            value={student.member4StudentID}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className=' mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddStudentGroup
