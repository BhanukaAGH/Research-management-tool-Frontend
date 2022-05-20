import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CreateSubType = ({ setClickEdit }) => {
  //console.log(singleUser)
  var [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    type: '',
    description: '',
  })

  var [Name, setName] = useState('')
  var [Type, setType] = useState('')
  var [Date, setDate] = useState('')
  var [Description, setDescription] = useState('')

  async function onSubmit() {
    console.log(formData)

    const url = `http://localhost:5000/subtype/create`

    //console.log("details",Name,Type,Date,Description)

    axios
      .post(url, {
        name: Name,
        dueDate: Date,
        type: Type,
        description: Description,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

    setClickEdit(false)
  }
  return (
    <div className='absolute inset-0 z-[5] min-w-full overflow-y-auto'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        <div className='absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity'></div>

        <div className=' w-full transform overflow-hidden rounded-lg  bg-white shadow-xl transition-all sm:my-8 sm:max-w-lg'>
          <div className='relative rounded-lg bg-white shadow'>
            <button
              type='button'
              className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={() => setClickEdit(false)}
            >
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900'>
                Add new Submission type
              </h3>
              <form className='space-y-6' onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Submission name
                  </label>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='Research Presentation template'
                  />
                </div>
                <div>
                  <label
                    htmlFor='regNo'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Due Date
                  </label>
                  <input
                    type='text'
                    name='dueDate'
                    onChange={(e) => setDate(e.target.value)}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='11/15/2022'
                  />
                </div>
                <label
                  for='message'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Description
                </label>
                <textarea
                  id='message'
                  rows='4'
                  class='bg-white-50 dark:bg-white-700 dark:border-white-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Description...'
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div>
                  <label
                    htmlFor='user_role'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Select document type
                  </label>
                  <select
                    id='type'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    name='type'
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option defaultValue='student'>Select Type</option>
                    <option value='.ppt'>ppt</option>
                    <option value='.word'>word doc</option>
                    <option value='.pdf'>pdf</option>
                  </select>
                </div>
                <button
                  type='submit'
                  className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                  Create Submission Type
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSubType
