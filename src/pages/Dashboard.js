import React, { useState } from 'react'

import DashboardContent from '../components/Dashboard/DashboardContent'
import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

const Dashboard = () => {
  const userType = 'Admin'
  const [activeTab, setActiveTab] = useState(0)
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className='flex overflow-hidden w-screen'>
      <DashboardSidebar
        userType={userType}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />
      <DashboardContent
        userType={userType}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />
    </div>
  )
}

export default Dashboard
