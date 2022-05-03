import React, { useEffect, useState } from 'react'
import {
  MdOutlineGroups,
  MdOutlineCloudUpload,
  MdOutlineSubtitles,
  MdOutlineTopic,
} from 'react-icons/md'
import {
  HiOutlineDocumentDuplicate,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineTemplate,
} from 'react-icons/hi'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { RiChatSmile2Line } from 'react-icons/ri'
import logo from '../../assets/logo.png'
import { motion, AnimatePresence } from 'framer-motion'

const AdminMenus = [
  { name: 'Users', icon: MdOutlineGroups },
  { name: 'Submitions', icon: HiOutlineDocumentDuplicate },
  { name: 'Student Groups', icon: HiOutlineUserGroup },
  { name: 'Marking Schemes', icon: HiOutlineDocumentText },
  { name: 'Uploads', icon: MdOutlineCloudUpload },
]

const StudentMenus = [
  { name: 'Student Group', icon: MdOutlineGroups },
  { name: 'Topic', icon: VscSymbolKeyword },
  { name: 'Templates', icon: HiOutlineTemplate },
  { name: 'Submition', icon: MdOutlineTopic },
  { name: 'Chats', icon: RiChatSmile2Line },
]

const StaffMenus = [
  { name: 'Topic Requests', icon: MdOutlineSubtitles },
  { name: 'Evaluates', icon: VscSymbolKeyword },
]

const PanelMemberMenus = [
  { name: 'Topics', icon: MdOutlineSubtitles },
  { name: 'Presentations', icon: VscSymbolKeyword },
]

const sideBarVariants = {
  hidden: {
    x: '-1000',
  },
  visible: {
    x: 0,
    transition: {
      stiffness: 1000,
      duration: 0.5,
    },
  },
  exit: {
    x: '-500px',
    transition: { stiffness: 1000, duration: 0.5 },
  },
}

const DashboardSidebar = ({
  userType,
  activeTab,
  setActiveTab,
  openSideBar,
  setOpenSideBar,
}) => {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    if (userType === 'admin') {
      setMenus(AdminMenus)
    } else if (userType === 'student') {
      setMenus(StudentMenus)
    } else if (userType === 'supervisor' || userType === 'co_supervisor') {
      setMenus(StaffMenus)
    } else if (userType === 'panel_member') {
      setMenus(PanelMemberMenus)
    }
  }, [userType])

  return (
    <>
      <div className='hidden h-screen w-72 border-r-2 bg-[#3a454b] pt-8 md:block'>
        <div className='flex items-center justify-center'>
          <img src={logo} className='h-40 w-40 object-cover' alt='logo' />
        </div>
        <ul className='space-y-4 pt-6'>
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`flex cursor-pointer items-center space-x-4 border-l-[#e2a500] py-2 pl-10 text-base font-medium text-gray-400 hover:border-l-4 hover:text-[#e2a500] ${
                index === activeTab ? 'border-l-4 text-[#e2a500]' : ''
              }`}
              onClick={() => setActiveTab(index)}
            >
              <menu.icon className='text-xl' />
              <p>{menu.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {openSideBar && (
          <motion.div
            className='absolute z-20 h-screen w-64 border-r-2 bg-[#3a454b] pt-8'
            variants={sideBarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='flex items-center justify-center'>
              <img src={logo} className='h-40 w-40 object-cover' alt='logo' />
            </div>
            <ul className='space-y-4 pt-6'>
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className={`flex cursor-pointer items-center space-x-4 border-l-[#e2a500] py-2 pl-10 text-base font-medium text-gray-400 hover:border-l-4 hover:text-[#e2a500] ${
                    index === activeTab ? 'border-l-4 text-[#e2a500]' : ''
                  }`}
                  onClick={() => {
                    setActiveTab(index)
                    setOpenSideBar(false)
                  }}
                >
                  <menu.icon className='text-xl' />
                  <p>{menu.name}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DashboardSidebar
