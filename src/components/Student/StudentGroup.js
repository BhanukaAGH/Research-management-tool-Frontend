import React, { useState } from 'react'
import axios from 'axios'

const StudentGroup = () => {
  // const [leaderName, setLeaderName] = useState('');
  // const [leaderStudentID, setLeaderStudentID] = useState('');
  // const [leaderEmail, setLeaderEmail] = useState('');

  // const [member2Name, setMeber2Name] = useState('');
  // const [member2StudentID, setMember2StudentID] = useState('');
  // const [member2Email, setMember2Email] = useState('');

  // const [member3Name, setMember3Name] = useState('');
  // const [member3StudentID, setMember3StudentID] = useState('');
  // const [member3Email, setMember3Email] = useState('');

  // const [member4Name, setMember4Name] = useState('');
  // const [member4StudentID, setMember4StudentID] = useState('');
  // const [member4Email, setMember4Email] = useState('');

  const [student, setStudent] = useState({
    leaderName: '',
    leaderStudentID: '',
    leaderEmail: '',
    member2Name: '',
    member2StudentID: '',
    member2Email: '',
    member3Name: '',
    member3StudentID: '',
    member3Email: '',
    member4Name: '',
    member4StudentID: '',
    member4Email: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setStudent({ ...student, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newGroup = {
      leader: {
        name: student.leaderName,
        studentID: student.leaderStudentID,
        email: student.leaderEmail,
      },

      member2: {
        name: student.member2Name,
        studentID: student.member2StudentID,
        email: student.member2Email,
      },

      member3: {
        name: student.member3Name,
        studentID: student.member3StudentID,
        email: student.member3Email,
      },

      member4: {
        name: student.member4Name,
        studentID: student.member4StudentID,
        email: student.member4Email,
      },
    }

    // console.log(newEmployee);
    axios
      .post('/api/v1/student/groupRegister', newGroup)
      .then(() => {
        //swal('Added!', 'You have successfully added an employee', 'success')
        alert('Group added')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      Student Group Registration
      <form>
        <div className='mb-6'>
          <label
            for='name'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Leader(member 1) name
          </label>
          <input
            type='text'
            id='leaderName'
            name='leaderName'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Name'
            required=''
            value={student.leaderName}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            for='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
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
            for='email'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Leader SLIIT email
          </label>
          <input
            type='email'
            id='leaderEmail'
            name='leaderEmail'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='itXXXXXXXX@my.sliit.lk'
            required=''
            value={student.leaderEmail}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6'>
          <label
            for='name'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 2 name
          </label>
          <input
            type='text'
            id='member2Name'
            name='member2Name'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Name'
            required=''
            value={student.member2Name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            for='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
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
            for='email'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 2 SLIIT email
          </label>
          <input
            type='email'
            id='member2Email'
            name='member2Email'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='itXXXXXXXX@my.sliit.lk'
            required=''
            value={student.member2Email}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6'>
          <label
            for='name'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 3 name
          </label>
          <input
            type='text'
            id='member3Name'
            name='member3Name'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Name'
            required=''
            value={student.member3Name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            for='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
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
            for='email'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 3 SLIIT email
          </label>
          <input
            type='email'
            id='member3Email'
            name='member3Email'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='itXXXXXXXX@my.sliit.lk'
            required=''
            value={student.member3Email}
            onChange={handleChange}
          />
        </div>

        <div className='mb-6'>
          <label
            for='name'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 4 name
          </label>
          <input
            type='text'
            id='member4Name'
            name='member4Name'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Name'
            required=''
            value={student.member4Name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            for='StudentID'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
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
        <div className='mb-6'>
          <label
            for='email'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Member 4 SLIIT email
          </label>
          <input
            type='email'
            id='member4Email'
            name='member4Email'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='itXXXXXXXX@my.sliit.lk'
            required=''
            value={student.member4Email}
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

export default StudentGroup
