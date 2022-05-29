import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleProfile } from '../features/ui/uiSlice'
import { updateUserPicture, reset } from '../features/user/userSlice'
import { MdClose, MdOutlineAddCircle } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import UserImage from '../assets/user.jpeg'
import { motion } from 'framer-motion'
import { useSnackbar } from 'notistack'

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
  const [prevImageUrl, setPrevImageUrl] = useState('')

  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  )

  const updateProfileImage = (e) => {
    setPrevImageUrl(user?.photoUrl)
    dispatch(updateUserPicture(e.target.files[0]))
  }

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' })
    }
    if (isSuccess && prevImageUrl !== user?.photoUrl) {
      enqueueSnackbar('update user image', { variant: 'success' })
      setPrevImageUrl(user?.photoUrl)
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

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
                src={UserImage && user?.photoUrl}
                alt='user-image'
                className='ring- mb-2 h-28 w-28 rounded-full border-2 border-[#e2a500] object-cover ring-4 ring-orange-100'
              />
              {editProfile && (
                <div className='absolute bottom-3 right-2 -mr-2 cursor-pointer rounded-full bg-white text-3xl'>
                  <label htmlFor='image' className='cursor-pointer'>
                    <MdOutlineAddCircle />
                  </label>
                  <input
                    id='image'
                    type='file'
                    className='hidden'
                    onChange={updateProfileImage}
                  />
                </div>
              )}
            </div>

            <h2 className='text-slate-800'>{user?.name}</h2>
            <span className='text-sm text-slate-500'>{user?.role}</span>
          </div>
          {/* User Details */}
          <div>
            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Name
              </span>
              <input
                type='text'
                defaultValue={user?.name}
                className='w-full bg-transparent text-base font-medium text-blue-500'
                disabled={true}
              />
            </div>
            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Registration Number
              </span>
              <input
                type='text'
                defaultValue={user?.regNo}
                className='w-full bg-transparent text-base font-medium text-blue-500'
                disabled={true}
              />
            </div>

            <div className='mb-4 flex flex-col'>
              <span className='mb-1 text-sm font-medium text-gray-500'>
                Email
              </span>
              <input
                type='email'
                defaultValue={user?.email}
                className='w-full bg-transparent text-base font-medium text-blue-500'
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
