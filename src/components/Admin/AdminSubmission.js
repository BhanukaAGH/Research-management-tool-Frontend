import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import CreateSubType from './Sub components/CreateSubType'

const AdminSubmission = () => {
  const [data, setData] = useState([])
  const [clickEdit, setClickEdit] = useState(false) //state to display add user
  const [subID, setsubID] = useState('')

  //

  //method to refresh table upon every change
  const tableList = () => {
    axios
      .get('http://localhost:5000/subtype/list')
      .then((json) => setData(json.data))
  }

  useEffect(() => {
    tableList()
  }, [])

  async function DeletSubtype(name) {
    const result = await confirm('Confirm if you want to delete user: ' + name)
    if (result) {
      const url = `http://localhost:5000/subtype/${subID}`
      axios.delete(url).then((response) => {
        console.log(response)
        //to refresh the data
        tableList()
      })
    } else {
      //console.log("users not removed");
      window.alert('SubType Not removed')
    }
  }

  const renderTable = () => {
    return data.map((Submission, index) => {
      //display details
      return (
        <tr
          className='overflow-y-auto border-b bg-white dark:border-gray-400 dark:bg-[#EEF2FF]'
          key={index}
        >
          <th
            scope='row'
            className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'
          >
            {Submission.name}
          </th>
          <td className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'>
            {Submission.type}
          </td>
          <td className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'>
            {Submission.dueDate}
          </td>
          <td className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'>
            {Submission.description}
          </td>
          <td className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'>
            {Submission.createdAt}
          </td>
          <td className='text-black-900 whitespace-nowrap px-6 py-4 font-medium dark:text-black'>
            <a
              href='#'
              className='text-bold font-medium text-[#ff0000] hover:underline  dark:text-[#ff0000]'
              onClick={() => {
                setsubID(Submission._id)
                DeletSubtype(Submission.name)
              }}
            >
              Delete
            </a>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div className='h-full w-full overflow-y-auto p-5'>
        Submission Managment
      </div>
      <div className='relative overflow-y-auto'>
        <div className='flex items-center justify-end'>
          <button
            type='button'
            className='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
            onClick={() => {
              setClickEdit(true)
            }}
          >
            Create Submission Type
          </button>
        </div>
        <div className='justify-left flex items-center'>
          <button
            className='mr-2 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 hover:bg-yellow-200  dark:bg-yellow-200 dark:text-yellow-800 dark:hover:bg-yellow-300'
            onClick={tableList}
          >
            refresh Table
          </button>
        </div>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Submission Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Submission Type
              </th>
              <th scope='col' className='px-6 py-3'>
                Due Date
              </th>
              <th scope='col' className='px-6 py-3'>
                description
              </th>
              <th scope='col' className='px-6 py-3'>
                Created Date
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      {clickEdit && <CreateSubType setClickEdit={setClickEdit} />}
    </div>
  )
}

export default AdminSubmission
