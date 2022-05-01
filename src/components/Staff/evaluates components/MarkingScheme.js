import React, { useState } from 'react'
import { schemes } from './dummyGroups'

const MarkingScheme = () => {
  const [markingScheme, setMarkingScheme] = useState(schemes)

  const calcTotal = () => {
    const totalMarks = markingScheme.reduce((total, criteria) => {
      total += Number(criteria.marks)
      return total
    }, 0)

    return Math.round(totalMarks / markingScheme.length)
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full border-collapse text-left text-sm text-gray-500'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
          <tr>
            <th className='border px-6 py-3'>Criteria</th>
            <th className='border px-6 py-3'>Marks</th>
          </tr>
        </thead>
        <tbody>
          {markingScheme &&
            markingScheme.map((scheme, index) => (
              <tr className='border-b bg-white' key={index}>
                <th className='whitespace border px-6 py-4 font-normal text-gray-900'>
                  {scheme.criteria}
                </th>
                <td className='border'>
                  <input
                    type='number'
                    value={markingScheme[index].marks}
                    className='h-full w-full px-6  py-4 outline-none'
                    onChange={(e) =>
                      setMarkingScheme(
                        schemes.map((item, i) => {
                          if (i === index) {
                            item.marks = e.target.value
                          }
                          return item
                        })
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          <tr className='border-b bg-white'>
            <th className='whitespace-nowrap border px-6 py-4 text-right font-medium uppercase text-gray-900'>
              Total
            </th>
            <td className='border px-6 py-4'>{calcTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MarkingScheme
