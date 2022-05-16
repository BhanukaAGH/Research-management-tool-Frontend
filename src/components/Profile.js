import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleProfile } from '../features/ui/uiSlice'
import { MdClose, MdOutlineAddCircle } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import UserImage from '../assets/user.jpeg'
import { motion } from 'framer-motion'

const profileVariants = {
  hidden: {
    x: '500',
  },
  visible: {
    x: 0,
    transition: {
      stiffness: 1000,
      duration: 0.5,
    },
  },
  exit: {
    x: '500px',
    transition: { stiffness: 1000, duration: 0.5 },
  },
}

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false)
  const [regNo, setRegNo] = useState('IT20009472')
  const [name, setName] = useState('Hashan Bhanuka')
  const [email, setEmail] = useState('it20009472@gmail.com')

  const dispatch = useDispatch()

  return (
    <motion.div
      variants={profileVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='absolute top-0 right-0 bottom-0 h-full w-80 overflow-y-auto rounded-l-md bg-slate-50 text-base shadow-lg'
    >
      <div className='w-full flex-col'>
        <div className='flex w-full items-center justify-between bg-gray-100 py-4 px-3'>
          <h4 className='font-sans text-xl'>Your Profile</h4>
          <MdClose
            className='cursor-pointer text-xl font-semibold hover:scale-110'
            onClick={() => dispatch(toggleProfile(false))}
          />
        </div>
        {/* Content */}
        <div className='flex h-full w-full flex-col px-3'>
          {/* User Profile Pic */}
          <div className='relative flex w-full flex-col items-center justify-center py-6'>
            <BiEdit
              className='absolute top-3 right-0 cursor-pointer text-xl text-gray-700 hover:scale-110 hover:text-gray-900'
              onClick={() => setEditProfile(!editProfile)}
            />
            <div className='relative'>
              <img
                src={UserImage}
                alt='user-image'
                className='ring- mb-2 h-28 w-28 rounded-full border-2 border-[#e2a500] object-cover ring-4 ring-orange-100'
              />
              {editProfile && (
                <div className='absolute bottom-3 right-2 -mr-2 cursor-pointer rounded-full bg-white text-3xl'>
                  <label htmlFor='file-input' className='cursor-pointer'>
                    <MdOutlineAddCircle />
                  </label>
                  <input id='file-input' type='file' className='hidden' />
                </div>
              )}
            </div>

            <h2 className='text-slate-800'>{name}</h2>
            <span className='text-sm text-slate-500'>Supervisor</span>
          </div>
          {/* User Details */}
          <div>
            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Name
              </span>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full ${
                  editProfile
                    ? 'rounded-md border border-gray-400 py-1 px-2 text-sm'
                    : 'bg-transparent text-base font-medium text-blue-500'
                }`}
                disabled={!editProfile}
              />
            </div>
            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Registration Number
              </span>
              <input
                type='text'
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className={`w-full ${
                  editProfile
                    ? 'rounded-md border border-gray-400 py-1 px-2 text-sm'
                    : 'bg-transparent text-base font-medium text-blue-500'
                }`}
                disabled={!editProfile}
              />
            </div>

            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Email
              </span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${
                  editProfile
                    ? 'rounded-md border border-gray-400 py-1 px-2 text-sm'
                    : 'bg-transparent text-base font-medium text-blue-500'
                }`}
                disabled={!editProfile}
              />
            </div>
          </div>
        </div>
        {editProfile && (
          <button
            type='button'
            className='ml-3 mt-2 rounded-lg bg-blue-700 px-4 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Update
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Profile
