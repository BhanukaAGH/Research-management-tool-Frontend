import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import SliitLogo from '../assets/logo.png'
import { useSnackbar } from 'notistack'

const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' })
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex min-h-screen items-center bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400'>
      <div className='container mx-auto'>
        <div className='mx-auto mb-10 max-w-md'>
          <div className='flex flex-col items-center text-center'>
            <img
              src={SliitLogo}
              alt='sliit-logo'
              className='h-36 w-36 object-cover'
            />
            <h1 className='my-2 text-3xl font-semibold text-gray-700'>
              Sign in
            </h1>
            <p className='text-gray-500'>Sign in to access your account</p>
          </div>
          <div className='my-3 bg-slate-50 p-6'>
            <form action=''>
              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm text-gray-600'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='itxxxxxxxx@my.sliit.lk'
                  className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-[#e2a500] focus:outline-none focus:ring focus:ring-orange-100'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm text-gray-600'
                >
                  Password
                </label>

                <input
                  type='password'
                  name='password'
                  placeholder='Your Password'
                  className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-[#e2a500] focus:outline-none focus:ring focus:ring-orange-100'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                <button
                  type='button'
                  className='w-full rounded-md bg-[#e2a500] px-3 py-2 text-white focus:bg-[#e2a500] focus:outline-none'
                  onClick={(e) => onSubmit(e)}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
