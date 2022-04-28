import React from 'react'
import { useNavigate } from 'react-router-dom'
import sliitlogo from '../../assets/sliit.png'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className='absolute top-0 left-0 w-full border-b'>
      <div className='container mx-auto flex items-center justify-between py-2 px-6 md:py-2'>
        <div>
          <img className='h-9 md:h-12 md:w-auto' src={sliitlogo} alt='logo' />
        </div>

        <button
          className='rounded border border-indigo-700 bg-transparent px-4 py-1 text-sm text-indigo-700 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 sm:px-8 sm:py-3 lg:text-base lg:font-bold'
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>
    </nav>
  )
}

export default Navbar
