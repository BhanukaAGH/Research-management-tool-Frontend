import React from 'react'

const StudentGroupDetails = ({ groupData }) => {
  return (
    <div>
      <div> Student Group </div>
      <br />
      <div>
        {' '}
        Your Group ID :{' '}
        <span className='rounded-md bg-gray-300 p-1'>
          {' '}
          {groupData.groupID}{' '}
        </span>
      </div>
      <br />
      <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
        <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
          <thead className='sticky top-0'>
            <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
              <th className='px-6 py-3'>Role</th>
              <th className='px-6 py-3'>Name</th>
              <th className='px-6 py-3'>Student ID</th>
              <th className='px-6 py-3'>Email</th>
            </tr>
          </thead>

          <tbody>
            <tr className=' border-b bg-white hover:bg-gray-200'>
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                leader (member 1)
              </th>
              <td className='px-6 py-4'>{groupData.leader.name}</td>
              <td className='px-6 py-4'>{groupData.leader.regNo}</td>
              <td className='px-6 py-4'>{groupData.leader.email}</td>
            </tr>
            <tr className=' border-b bg-white hover:bg-gray-200'>
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                member 2
              </th>
              <td className='px-6 py-4'>{groupData.member2.name}</td>
              <td className='px-6 py-4'>{groupData.member2.regNo}</td>
              <td className='px-6 py-4'>{groupData.member2.email}</td>
            </tr>
            <tr className=' border-b bg-white hover:bg-gray-200'>
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                member 3
              </th>
              <td className='px-6 py-4'>{groupData.member3.name}</td>
              <td className='px-6 py-4'>{groupData.member3.regNo}</td>
              <td className='px-6 py-4'>{groupData.member3.email}</td>
            </tr>
            <tr className=' border-b bg-white hover:bg-gray-200'>
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                member 4
              </th>
              <td className='px-6 py-4'>{groupData.member4.name}</td>
              <td className='px-6 py-4'>{groupData.member4.regNo}</td>
              <td className='px-6 py-4'>{groupData.member4.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentGroupDetails
