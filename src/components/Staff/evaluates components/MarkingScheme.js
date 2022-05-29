import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getEvaluation,
  reset,
} from '../../../features/evaluation/evaluationSlice'

const MarkingScheme = ({ groupId, evaluateMark, setEvaluateData }) => {
  const [markingScheme, setMarkingScheme] = useState(null)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { evaluate, isLoading, isSuccess } = useSelector(
    (state) => state.evaluate
  )

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
    const data = {
      groupId,
      evaluationType: 'document',
    }
    dispatch(getEvaluation(data))
    dispatch(reset())
  }, [])

  useEffect(() => {
    if (evaluate) {
      setMarkingScheme(
        evaluate.markScheme.map((item) => ({ ...item, marks: item.marks || 0 }))
      )
    }
  }, [isSuccess])

  useEffect(() => {
    const evaluationData = {
      groupId,
      evaluationType: 'document',
      markScheme: markingScheme,
      totalMark: calcTotal(),
      evaluateBy: user.userId,
    }
    setEvaluateData(evaluationData)
  }, [markingScheme])

  if (isLoading) {
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
          <tbody className='animate-pulse'>
            <tr className='border-b bg-white'>
              <th className='whitespace border px-6 py-4'>
                <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
              </th>
              <th className='border px-6 py-4 text-center lg:w-32'>
                <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
              </th>
              <td className='border px-6 py-4 lg:w-32'>
                <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
              </td>
            </tr>

            <tr className='border-b bg-white'>
              <th
                className='whitespace-nowrap border px-8 py-4 text-right'
                colSpan={2}
              >
                Total
              </th>
              <td className='border px-6 py-4 text-center'>
                <div className='h-2 w-1/2 rounded-md bg-slate-300'></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

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
