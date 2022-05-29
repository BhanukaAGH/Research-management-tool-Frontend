import React, { useState } from 'react'
import Submition from './submitions/Submition'
import SubmitionsList from './submitions/SubmitionsList'

const StudentSubmission = () => {
  const [selectSubmition, setSelectSubmition] = useState(null)

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!selectSubmition && (
        <SubmitionsList setSelectSubmition={setSelectSubmition} />
      )}
      {selectSubmition && (
        <Submition
          selectSubmition={selectSubmition}
          setSelectSubmition={setSelectSubmition}
        />
      )}
    </div>
  )
}

export default StudentSubmission
