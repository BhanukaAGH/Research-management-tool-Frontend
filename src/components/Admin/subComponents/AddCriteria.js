import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

const AddCriteria = ({ setclickCriteria, ms, setms }) => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [criteria, setCriteria] = useState('') //set critirea
  const [mark, setMark] = useState('') //set mark

  //to refresh criteria list
  const MarkSchemeData = () => {
    const id = ms._id
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/getOne/${id}`
    axios.get(url).then((json) => {
      setms(json.data)
      console.log(json.data)
    })
  }
  useEffect(() => {
    MarkSchemeData()
  }, [])

  //add criteria
  const onSubmit = async (data) => {
    //event.preventDefault()
    const id = ms._id
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/update/${id}`

    await axios
      .patch(url, {
        criteria: data.criteria,
        allocatedMark: data.mark,
      })
      .then(function (response) {
        console.log('response', response)
        enqueueSnackbar(response.data.msg, { variant: 'success' })
        MarkSchemeData()
        document.getElementById('form').reset()
      })
      .catch(function (error) {
        console.log('error', error)
        enqueueSnackbar('Error', { variant: 'error' })
      })
  }
  //delete criteria
  async function HandleDelete(Cid) {
    const id = ms._id
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/remove/${id}`

    const result = await confirm(
      'Are you sure you want to remove this Criteria'
    )
    if (result) {
      await axios
        .patch(url, {
          _id: Cid,
        })
        .then(function (response) {
          console.log('response', response)
          enqueueSnackbar(response.data.msg, { variant: 'success' })
          MarkSchemeData()
        })
        .catch(function (error) {
          console.log('error', error)
          enqueueSnackbar(error.response.data.msg, { variant: 'error' })
        })
    } else {
      enqueueSnackbar('Criteria Not removed', { variant: 'info' })
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
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid xl:grid-cols-5 xl:gap-6'>
                <div className='group relative z-0 col-span-3 mb-6 w-full'>
                  <input
                    type='text'
                    name='criteria'
                    id='criteria'
                    className='text-white-900 peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500'
                    onChange={(e) => setCriteria(e.target.value)}
                    required
                    {...register('criteria')}
                  />
                  <label
                    htmlFor='criteria'
                    className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                  >
                    Criteria
                  </label>
                </div>
                <div className='group relative z-0 col-span-1 mb-6 w-full'>
                  <input
                    type='number'
                    name='mark'
                    id='mark'
                    className='text-white-900 peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500'
                    onChange={(e) => setMark(e.target.value)}
                    required
                    {...register('mark')}
                  />
                  <label
                    htmlFor='mark'
                    className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                  >
                    Mark
                  </label>
                </div>
                <div className=' group relative z-0 mb-6 w-full  '>
                  <button
                    type='submit'
                    className='mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 '
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
                      className='font-medium text-[#C81E1E] hover:underline'
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
