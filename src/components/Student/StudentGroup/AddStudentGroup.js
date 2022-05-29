import React, { useState } from 'react'

const AddStudentGroup = () => {
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
      leaderId: student.leaderStudentID,
      member2Id: student.member2StudentID,
      member3Id: student.member3StudentID,
      member4Id: student.member4StudentID,
    }

    axios
      .post('/api/v1/student/groupRegister', newGroup)
      .then(() => {
        //swal('Added!', 'You have successfully added an employee', 'success')
        alert('Group added')
        // console.log(res.data)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      <form>
        <div className='mb-6'>
          <label
            htmlFor='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 '
          >
            Leader(member 1) Student ID
          </label>
          <input
            type='text'
            id='leaderStudentID'
            name='leaderStudentID'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='ITXXXXXXXX'
            required=''
            value={student.leaderStudentID}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 '
          >
            Member 2 Student ID
          </label>
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

        <div className='mb-6'>
          <label
            htmlFor='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 '
          >
            Member 3 Student ID
          </label>
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

        <div className='mb-6'>
          <label
            htmlFor='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 '
          >
            Member 4 Student ID
          </label>
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

        <button
          type='submit'
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddStudentGroup
