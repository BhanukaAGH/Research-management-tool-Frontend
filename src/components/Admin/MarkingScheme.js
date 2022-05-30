import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import CreateMS from './subComponents/CreateMS'
import AddCriteria from './subComponents/AddCriteria'
import { useSnackbar } from 'notistack'

const MarkingScheme = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState([])
  const [clickCreate, setclickCreate] = useState(false) //state to open create MS comonent
  const [clickCriteria, setclickCriteria] = useState(false) //state to open create criteria comonent
  const [ms, setms] = useState(null) //set markscheme id

  const cardList = () => {
    axios
      .get(`${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/get`)
      .then((json) => {
        setData(json.data)
      })
  }

  useEffect(() => {
    cardList()
  }, [])

  async function HandleDelete(id) {
    console.log('Delete button works', id)

    const result = await confirm(
      'Are you sure you want to remove this MarkScheme'
    )
    if (result) {
      const url = `${process.env.SERVER_BACKEND_URL}/api/v1/markscheme/del/${id}`

      axios
        .delete(url)
        .then((response) => {
          console.log(response)
          enqueueSnackbar(response.data.msg, { variant: 'success' })
          //to refresh the data
          cardList()
        })
        .catch(function (error) {
          console.log('error', error)

          enqueueSnackbar(error.response.data.msg, { variant: 'error' })
        })
    } else {
      //console.log("users not removed");
      enqueueSnackbar('Mark Scheme Not Deleted', { variant: 'info' })
    }
  }

  function test() {
    console.log('button works', data)
  }

  const renderCard = () => {
    return data.map((ms, index) => {
      //display details
      return (
        <div key={index}>
          <div className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <a
              onClick={() => {
                setms(ms)
                setclickCriteria(true)
              }}
            >
              <h5 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                {ms.markSchemeName}
              </h5>

              <ul className='list-none'>
                <li className='text-base font-normal text-gray-700 dark:text-gray-400'>
                  {ms.schemeType}{' '}
                </li>
                <li className='text-base font-normal text-gray-700 dark:text-gray-400'>
                  {ms.Description}
                </li>
                <li className='text-base font-normal text-gray-700 dark:text-gray-400'></li>
              </ul>
              <br />
            </a>
            <button
              type='button'
              onClick={() => {
                HandleDelete(ms._id)
              }}
              className='mr-2 mb-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              Remove
            </button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      MarkingScheme Managment
      <br />
      {clickCriteria && (
        <AddCriteria
          ms={ms}
          setms={setms}
          setclickCriteria={setclickCriteria}
        />
      )}
      {!clickCriteria && (
        <div>
          <div className='flex items-center justify-center'>
            <button
              type='button'
              className='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
              onClick={() => {
                setclickCreate(true)
              }}
            >
              Create Mark Scheme
            </button>
          </div>
          <div className='justify-left flex items-center'>
            <button
              className='mr-2 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 hover:bg-yellow-200  dark:bg-yellow-200 dark:text-yellow-800 dark:hover:bg-yellow-300'
              onClick={cardList}
            >
              refresh Cards
            </button>

            <br />
            <p className='text-sm text-red-500'>
              Click On MarkScheme to add criteria
            </p>
          </div>
          <br />
          <div className='grid grid-cols-4 gap-4'>{renderCard()}</div>
          {clickCreate && <CreateMS setclickCreate={setclickCreate} />}
        </div>
      )}
    </div>
  )
}

export default MarkingScheme
