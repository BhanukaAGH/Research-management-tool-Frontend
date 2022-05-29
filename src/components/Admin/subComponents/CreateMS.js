import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

const CreateMS = ({ setclickCreate }) => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  var [Name, setName] = useState('')
  var [Type, setType] = useState('')
  var [Description, setDescription] = useState('')

  //create MS
  const onSubmit = async (data) => {
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/create`

    await axios
      .post(url, {
        markSchemeName: data.name,
        schemeType: data.type,
        Description: data.desc,
      })
      .then(function (response) {
        console.log('response', response)
        enqueueSnackbar(response.data.msg, { variant: 'success' })
        setclickCreate(false)
      })
      .catch(function (error) {
        console.log('error', error)

        enqueueSnackbar(error.response.data.msg, { variant: 'error' })
      })
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
              onClick={() => setclickCreate(false)}
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
                Create Marking Scheme
              </h3>
              <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Marking Scheme name
                  </label>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='Marking Scheme Name'
                    {...register('name')}
                  />
                </div>
                <label
                  htmlFor='message'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Description
                </label>
                <textarea
                  id='message'
                  rows='4'
                  className='bg-white-50 dark:bg-white-700 dark:border-white-600 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Description...'
                  onChange={(e) => setDescription(e.target.value)}
                  {...register('desc')}
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
                    {...register('type')}
                  >
                    <option value=''>Select Type</option>
                    <option value='document'>Document</option>
                    <option value='presentation'>Presentation</option>
                  </select>
                </div>
                <button
                  type='submit'
                  className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                  Create MarkingScheme
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMS
