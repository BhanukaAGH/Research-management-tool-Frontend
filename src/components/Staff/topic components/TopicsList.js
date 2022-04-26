import React from 'react'
import topics from './dummydata'

const TopicsList = ({ setSelectTopic }) => {
  return (
    <div className='scrollbar max-h-full w-full overflow-auto scroll-smooth'>
      <table className='relative h-full w-full overflow-auto text-left text-sm text-gray-500'>
        <thead className='sticky top-0'>
          <tr className='bg-gray-600 text-xs uppercase text-gray-50'>
            <th className='px-6 py-3'>Topic name</th>
            <th className='px-6 py-3'>Group ID</th>
            <th className='px-6 py-3'>Research Area</th>
            <th className='px-6 py-3'>Submit Date</th>
            <th className='px-6 py-3'>Status</th>
          </tr>
        </thead>

        <tbody>
          {topics.map((topic, index) => (
            <tr
              className='cursor-pointer border-b bg-white hover:bg-gray-200'
              key={index}
              onClick={() => setSelectTopic(topic)}
            >
              <th className='truncate whitespace-normal px-6 py-4 font-medium text-gray-900'>
                {topic.topic_name}
              </th>
              <td className='px-6 py-4'>{topic.groupID}</td>
              <td className='px-6 py-4'>{topic.researchArea}</td>
              <td className='px-6 py-4'>{topic.submitDate}</td>
              <td className='px-6 py-4'>
                <span
                  className={`rounded  px-2.5 py-0.5 text-sm font-semibold  ${
                    topic.status === 'approve'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {topic.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TopicsList
