import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import DashboardContent from '../components/Dashboard/DashboardContent'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [openSideBar, setOpenSideBar] = useState(false)

  const { user } = useSelector((state) => state.auth)

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
