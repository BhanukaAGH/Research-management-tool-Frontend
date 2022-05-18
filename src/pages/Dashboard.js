import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, reset } from '../features/user/userSlice'

import DashboardContent from '../components/Dashboard/DashboardContent'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [openSideBar, setOpenSideBar] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isSuccess, isError, message } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getCurrentUser(user.userId))
  }, [])

  useEffect(() => {
    dispatch(reset())
  }, [isSuccess, isError, message, dispatch])

  return (
    <div className='flex w-screen overflow-hidden'>
      <DashboardSidebar
        userType={user && user.role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />
      <DashboardContent
        userType={user && user.role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />
    </div>
  )
}

export default Dashboard
