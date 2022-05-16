import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'
import { toggleProfile } from '../../features/ui/uiSlice'
import { AnimatePresence } from 'framer-motion'
import DashboardNavbar from './DashboardNavbar'
// Admin Component
import UsersContent from '../Admin/UsersContent'
import AdminSubmission from '../Admin/AdminSubmission'
import StudentGroups from '../Admin/StudentGroups'
import MarkingScheme from '../Admin/MarkingScheme'
import UploadsContent from '../Admin/UploadsContent'

// Student Component
import StudentGroup from '../Student/StudentGroup'
import StudentTopic from '../Student/StudentTopic'
import StudentTemplates from '../Student/StudentTemplates'
import StudentSubmission from '../Student/StudentSubmission'
import StudentChats from '../Student/StudentChats'

// Staff Component
import TopicRequest from '../Staff/TopicRequest'
import Evaluates from '../Staff/Evaluates'

// Staff Component
import PanelTopics from '../PanelMember/PanelTopics'
import PanelPresentation from '../PanelMember/PanelPresentation'
import Profile from '../Profile'

const DashboardContent = ({
  userType,
  activeTab,
  openSideBar,
  setOpenSideBar,
}) => {
  const dispatch = useDispatch()
  const { openProfile } = useSelector((state) => state.ui)

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      {openSideBar && (
        <div
          className='absolute z-10 h-screen w-full bg-black opacity-40 md:hidden'
          onClick={() => setOpenSideBar(false)}
        ></div>
      )}
      <DashboardNavbar setOpenSideBar={setOpenSideBar} />
      <div className='relative h-full w-full overflow-hidden bg-indigo-50 text-2xl font-semibold'>
        {/* Admin Content */}
        {userType === 'admin' && activeTab === 0 && <UsersContent />}
        {userType === 'admin' && activeTab === 1 && <AdminSubmission />}
        {userType === 'admin' && activeTab === 2 && <StudentGroups />}
        {userType === 'admin' && activeTab === 3 && <MarkingScheme />}
        {userType === 'admin' && activeTab === 4 && <UploadsContent />}

        {/* Student Content */}
        {userType === 'student' && activeTab === 0 && <StudentGroup />}
        {userType === 'student' && activeTab === 1 && <StudentTopic />}
        {userType === 'student' && activeTab === 2 && <StudentTemplates />}
        {userType === 'student' && activeTab === 3 && <StudentSubmission />}
        {userType === 'student' && activeTab === 4 && <StudentChats />}

        {/* Staff Content */}
        {(userType === 'supervisor' || userType === 'co_supervisor') &&
          activeTab === 0 && <TopicRequest />}
        {(userType === 'supervisor' || userType === 'co_supervisor') &&
          activeTab === 1 && <Evaluates />}

        {/* PanelMember */}
        {userType === 'panel_member' && activeTab === 0 && <PanelTopics />}
        {userType === 'panel_member' && activeTab === 1 && (
          <PanelPresentation />
        )}
        <AnimatePresence>
          {openProfile && (
            <OutsideClickHandler
              onOutsideClick={() => dispatch(toggleProfile(false))}
            >
              <Profile />
            </OutsideClickHandler>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashboardContent
