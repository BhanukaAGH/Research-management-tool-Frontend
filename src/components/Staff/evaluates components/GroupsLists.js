import React from 'react'
import GroupsData from './dummyGroups'

const GroupsLists = ({ setSelectGroup }) => {
  return (
    <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
      <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
        <thead className='sticky top-0'>
          <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
            <th className='px-6 py-3'>Group ID</th>
            <th className='px-6 py-3'>Topic name</th>
            <th className='px-6 py-3'>Research Area</th>
            <th className='px-6 py-3'>Submit Date</th>
          </tr>
        </thead>

        <tbody>
          {GroupsData.map((group, index) => (
            <tr
              className='cursor-pointer border-b bg-white hover:bg-gray-200'
              key={index}
              onClick={() => setSelectGroup(group)}
            >
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                {group.groupID}{' '}
              </th>
              <td className='px-6 py-4'>{group.topic_name}</td>
              <td className='px-6 py-4'>{group.researchArea}</td>
              <td className='px-6 py-4'>{group.submitDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupsLists
