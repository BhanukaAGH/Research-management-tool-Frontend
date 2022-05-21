import React, { useState } from 'react'
import axios from 'axios'

const StudentTopic = () => {
  const [topic, setTopic] = useState({
    groupID: '',
    topicName: '',
    researchArea: '',
    supervisorName: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setTopic({ ...topic, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTopic = {
      groupID,
      topicName,
      researchArea,
      supervisorName,
    }

    axios
      .post('/api/v1/topic/', newTopic)
      .then(() => {
        //swal('Added!', 'You have successfully added an employee', 'success')
        alert('Topic added')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      Student Topic Registration
      <form>
        <div className='mb-6'>
          <label
            htmlFor='groupID'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Group ID
          </label>
          <input
            type='text'
            id='groupID'
            name='groupID'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Group ID'
            required=''
            value={topic.groupID}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='topicName'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Topic Name
          </label>
          <input
            type='text'
            id='topicName'
            name='topicName'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Topic Name'
            required=''
            value={topic.topicName}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='researchArea'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Research Area
          </label>
          <input
            type='email'
            id='researchArea'
            name='researchArea'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Research Area'
            required=''
            value={topic.researchArea}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='researchArea'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Supervisor Name
          </label>
          <input
            type='email'
            id='supervisorName'
            name='supervisorName'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Research Area'
            required=''
            value={topic.supervisorName}
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

export default StudentTopic
