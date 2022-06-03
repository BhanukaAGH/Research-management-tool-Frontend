import React, { useState } from 'react'
import GroupInformation from './evaluatesComponents/GroupInformation'
import GroupsLists from './evaluatesComponents/GroupsLists'

const Evaluates = () => {
  const [selectGroup, setSelectGroup] = useState(null)

  return (
    <div className='h-full w-full overflow-auto p-5'>
      {!selectGroup && <GroupsLists setSelectGroup={setSelectGroup} />}
      {selectGroup && (
        <GroupInformation
          selectGroup={selectGroup}
          setSelectGroup={setSelectGroup}
        />
      )}
    </div>
  )
}

export default Evaluates
