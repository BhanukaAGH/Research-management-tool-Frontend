import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { toggleProfile } from '../../features/ui/uiSlice'
import OutsideClickHandler from 'react-outside-click-handler'
import { AiOutlineMenu } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'
import UserImg from '../../assets/user.jpeg'

const DashboardNavbar = ({ setOpenSideBar }) => {
  const [openDropDown, setOpenDropDown] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='flex w-full items-center justify-between border-b-2 px-8 py-3'>
      <AiOutlineMenu
        className='float-left cursor-pointer text-2xl duration-300 hover:scale-125 md:hidden'
        onClick={() => setOpenSideBar((sidebar) => !sidebar)}
      />
      <div className='flex w-full items-center justify-end space-x-2'>
        <div className='relative ml-3'>
          <button
            type='button'
            className='flex items-center space-x-3 text-sm'
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            <img
              className='h-10 w-10 rounded-full object-cover ring-2 ring-[#e2a500]'
              src={UserImg && user && user.photoUrl}
              alt='user-profile'
            />
            <span className='hidden font-medium md:block'>
              {user && user.name}
            </span>
            <RiArrowDropDownLine className='text-xl' />
          </button>

          {openDropDown && (
            <OutsideClickHandler onOutsideClick={() => setOpenDropDown(false)}>
              <div
                className='absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
              >
                <span
                  className='block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-[#e2a500]'
                  onClick={() => {
                    setOpenDropDown(false)
                    dispatch(toggleProfile())
                  }}
                >
                  Your Profile
                </span>
                <span
                  className='block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-[#e2a500]'
                  onClick={onLogout}
                >
                  Sign out
                </span>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar
