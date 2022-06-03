import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Submition from './submitions/Submition'
import SubmitionsList from './submitions/SubmitionsList'

const StudentSubmission = () => {
  const [selectSubmition, setSelectSubmition] = useState(null)

  const { user } = useSelector((state) => state.user)

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!user?.groupId && (
        <div className='flex w-full items-center justify-center py-4'>
          <div className='w-full rounded-md bg-gray-700 py-4 text-center text-base font-medium text-white shadow-md md:text-lg lg:w-1/2 lg:text-xl'>
            You don't have a group.
          </div>
        </div>
      )}

      {user?.groupId && !selectSubmition && (
        <SubmitionsList setSelectSubmition={setSelectSubmition} />
      )}
      {user?.groupId && selectSubmition && (
        <Submition
          selectSubmition={selectSubmition}
          setSelectSubmition={setSelectSubmition}
        />
      )}
    </div>
  )
}

export default StudentSubmission
