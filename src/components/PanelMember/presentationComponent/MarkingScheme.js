import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getEvaluation,
  reset,
} from '../../../features/evaluation/evaluationSlice'

const MarkingScheme = ({ evaluateMark, groupId, setEvaluateData }) => {
  const dispatch = useDispatch()
  // get the auth from the store
  const { user } = useSelector((state) => state.auth)

  // get the evaluate marks from the store
  const { evaluate, isLoading, isSuccess } = useSelector(
    (state) => state.evaluate
  )
  const [markingScheme, setMarkingScheme] = useState(null)

  // fetch the marking schema from the db according to the group id and type
  useEffect(() => {
    const data = {
      groupId,
      evaluationType: 'presentation',
    }
    dispatch(getEvaluation(data))
    dispatch(reset())
  }, [])

  //set marking scheme values
  useEffect(() => {
    if (evaluate) {
      setMarkingScheme(
        evaluate.markScheme.map((item) => ({ ...item, marks: item.marks || 0 }))
      )
    }
  }, [isSuccess])

  //calculate the total marks for the scheme
  const calcTotal = () => {
    if (markingScheme) {
      const totalMarks =
        markingScheme.reduce((total, criteria) => {
          total += Number(criteria.marks)
          return total
        }, 0) || 0

      return Math.round(totalMarks / markingScheme.length)
    }
    return 0
  }

  useEffect(() => {
    const evaluationData = {
      groupId,
      evaluationType: 'presentation',
      markScheme: markingScheme,
      totalMark: calcTotal(),
      evaluateBy: user.userId,
    }
    setEvaluateData(evaluationData)
  }, [markingScheme])

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full border-collapse text-left text-sm text-gray-500'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
          <tr>
            <th className='border px-6 py-3'>Criteria</th>
            <th className='border px-6 py-3 text-center'>Allocated Marks</th>
            <th className='border px-6 py-3 text-center'>Marks</th>
          </tr>
        </thead>
        <tbody>
          {markingScheme &&
            markingScheme.map((scheme, index) => (
              <tr className='border-b bg-white' key={index}>
                <th className='whitespace border px-6 py-4 font-normal text-gray-900'>
                  {scheme.criteria}
                </th>
                <th className='border px-6 py-4 text-center font-normal text-gray-900 lg:w-32'>
                  {scheme.allocatedMark}
                </th>
                <td className='border lg:w-32'>
                  <input
                    type='number'
                    value={scheme.marks}
                    className={`h-full w-full px-6  py-4 text-center outline-none ${
                      evaluateMark && 'bg-slate-700 text-white'
                    }`}
                    disabled={!evaluateMark}
                    onChange={(e) =>
                      setMarkingScheme((value) =>
                        value.map((item, i) => {
                          if (i === index) {
                            item.marks = Number(e.target.value)
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
            <th
              className='whitespace-nowrap border px-8 py-4 text-right font-medium uppercase text-gray-900'
              colSpan={2}
            >
              Total
            </th>
            <td className='border px-6 py-4 text-center'>{calcTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MarkingScheme
