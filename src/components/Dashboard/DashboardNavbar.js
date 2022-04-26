import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'
import UserImg from '../../assets/user.jpeg'

import { InfoBox } from '../OutSideClickFunctionals'

const DashboardNavbar = ({ setOpenSideBar }) => {
  const [openDropDown, setOpenDropDown] = useState(false)

  return (
    <div className='flex w-full items-center justify-between border-b-2 px-8 py-3'>
      <AiOutlineMenu
        className='float-left cursor-pointer text-2xl duration-300 hover:scale-125 md:hidden'
        onClick={() => setOpenSideBar((sidebar) => !sidebar)}
      />
      <div className='flex w-full items-center justify-end space-x-2'>
        <div class='relative ml-3'>
          <button
            type='button'
            class='flex items-center space-x-3 text-sm'
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            <img
              class='h-10 w-10 rounded-full object-cover ring-2 ring-[#e2a500]'
              src={UserImg}
              alt='user-profile'
            />
            <span className='hidden font-medium md:block'>
              it20009472@my.sliit.lk
            </span>
            <RiArrowDropDownLine className='text-xl' />
          </button>
          <InfoBox
            show={openDropDown}
            onClickOutside={() => setOpenDropDown(false)}
          />

          {openDropDown && (
            <>
              <div
                class='absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabindex='-1'
              >
                <Link
                  to='/'
                  class='block px-4 py-2 text-sm text-gray-700 hover:bg-[#e2a500]'
                  role='menuitem'
                  tabindex='-1'
                >
                  Your Profile
                </Link>
                <Link
                  to='/'
                  class='block px-4 py-2 text-sm text-gray-700 hover:bg-[#e2a500]'
                >
                  Sign out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar
