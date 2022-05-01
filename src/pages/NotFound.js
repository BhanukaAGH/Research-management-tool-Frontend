import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from '../assets/notFound.png'

const NotFound = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col items-center'>
        <img
          src={NotFoundImage}
          className='w-11/12 object-cover sm:w-[500px] lg:w-[600px]'
          alt='404'
        />
        <h1 className='text-9xl font-bold text-blue-600'>404</h1>

        <h6 className='mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl'>
          <span className='text-red-500'>Oops!</span> Page not found
        </h6>

        <p className='mb-8 text-center text-gray-500 md:text-lg'>
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to={'/'}
          className='bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800'
        >
          Go home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
