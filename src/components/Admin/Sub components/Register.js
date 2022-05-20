import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { register, reset } from '../../../features/auth/authSlice'
import Spinner from '../../Spinner'

const Register = ({ setRegisterUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    userRole: '',
    password: '',
  })

  const { name, password, userRole } = formData

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message || 'user registration failed', {
        variant: 'error',
      })
    }

    if (isSuccess) {
      enqueueSnackbar('user registered', { variant: 'success' })
      setRegisterUser(false)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register(formData))
  }

  if (isLoading) {
    return <Spinner />
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
              onClick={() => setRegisterUser(false)}
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
                Add new user
              </h3>
              <form className='space-y-6' onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    User name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='user name'
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='user_role'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Select an option
                  </label>
                  <select
                    id='user_role'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    name='userRole'
                    value={userRole}
                    onChange={onChange}
                  >
                    <option defaultValue='student'>Select User role</option>
                    <option value='student'>Student</option>
                    <option value='supervisor'>Supervisor</option>
                    <option value='co_supervisor'>Co-Supervisor</option>
                    <option value='panel_member'>Panel Member</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    User password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    placeholder='password'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
