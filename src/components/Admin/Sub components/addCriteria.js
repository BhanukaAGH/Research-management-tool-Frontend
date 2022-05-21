import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'

const AddCriteria = ({ setclickCriteria, ms, setms }) => {
  const [criteria, setCriteria] = useState('') //set critirea
  const [mark, setMark] = useState('') //set mark

  //to refresh criteria list
  const MarkSchemeData = () => {
    const id = ms._id
    const url = `http://localhost:5000/markscheme/getOne/${id}`
    axios.get(url).then((json) => {
      setms(json.data)
      console.log(json.data)
    })
  }
  useEffect(() => {
    MarkSchemeData()
  }, [])

  //add criteria
  async function onSubmit(event) {
    event.preventDefault()
    const id = ms._id
    const url = `http://localhost:5000/markscheme/update/${id}`

    const res = await axios.patch(url, {
      criteria: criteria,
      allocatedMark: mark,
    })

    if (res.status == 200) {
      window.alert('success full')
    } else {
      window.alert('failedl')
    }
    setCriteria('')
    setMark('')
    event.target.reset()
    MarkSchemeData()
  }
  //delete criteria
  async function HandleDelete(Cid) {
    const id = ms._id
    const url = `http://localhost:5000/markscheme/remove/${id}`

    const result = await confirm(
      'Are you sure you want to remove this Criteria'
    )
    if (result) {
      const res = await axios.patch(url, {
        _id: Cid,
      })
      MarkSchemeData()
    } else {
      window.alert('Criteria Not removed')
    }
  }

  return (
    <div className='h-full w-full overflow-auto p-5  '>
      <div className='mb-4 text-base'>
        <div
          className='flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gray-600'
          onClick={() => setclickCriteria(false)}
        >
          <span>Back</span>
        </div>
        <br />
        <div className='mb-4 overflow-hidden bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Mark Scheme Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Mark Scheme Details
            </p>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  MarkScheme Name:
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {ms.markSchemeName}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  MarkScheme Type
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {ms.schemeType}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Description:
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {ms.Description}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className='mb-4 overflow-hidden bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <form onSubmit={onSubmit}>
              <div class='grid xl:grid-cols-5 xl:gap-6'>
                <div class='group relative z-0 col-span-3 mb-6 w-full'>
                  <input
                    type='text'
                    name='criteria'
                    id='criteria'
                    class='text-white-900 peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500'
                    onChange={(e) => setCriteria(e.target.value)}
                    required
                  />
                  <label
                    for='criteria'
                    class='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                  >
                    Criteria
                  </label>
                </div>
                <div class='group relative z-0 col-span-1 mb-6 w-full'>
                  <input
                    type='number'
                    name='mark'
                    id='mark'
                    class='text-white-900 peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500'
                    onChange={(e) => setMark(e.target.value)}
                    required
                  />
                  <label
                    for='mark'
                    class='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                  >
                    Mark
                  </label>
                </div>
                <div class=' group relative z-0 mb-6 w-full  '>
                  <button
                    type='submit'
                    class='mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 '
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full border-collapse text-left text-sm text-black'>
            <thead className='bg-gray-50 text-xs uppercase text-black'>
              <tr>
                <th className='border px-6 py-3'>Criteria</th>
                <th className='border px-6 py-3'>Marks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ms.markScheme.map((item, index) => (
                <tr className='border-b bg-white' key={index}>
                  <td className='border px-6 py-4'>{item.criteria}</td>
                  <td className='border px-6 py-4'>{item.allocatedMark}</td>
                  <td>
                    <a
                      onClick={() => {
                        HandleDelete(item._id)
                      }}
                      class='font-medium text-[#C81E1E] hover:underline'
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddCriteria
