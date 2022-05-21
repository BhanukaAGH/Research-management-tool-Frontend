import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import Spinner from '../../Spinner'
import axios from 'axios'

const Allocate = ({ setAllocate, groupID }) => {
  const [group, setGroup] = useState([]) //set group details of seected group
  const [panel, setPanel] = useState([]) //store panel details

  const tableList = async () => {
    const url = `http://localhost:5000/api/v1/student/getgroups/${groupID}`
    await axios.get(url).then((json) => setGroup(json.data))
  }

  //get list of panel members
  const panelList = async () => {
    const url = 'http://localhost:5000/users/findby/panel_member'
    await axios.get(url).then((json) => setPanel(json.data))
  }

  useEffect(() => {
    tableList()
    panelList()
  }, [])

  async function allocate(un) {
    // console.log("works",un,groupID)
    const url = `http://localhost:5000/api/v1/student/update/${groupID}`

    const res = await axios.patch(url, { Panelmember: un })
    //console.log(res.status);
    if (res.status == 200) {
      //console.log("updated")
      window.alert('updated refresh table')
      setAllocate(false)
    } else {
      window.alert('update failed')
      console.log('update failed')
    }
  }

  const renderTable = () => {
    return panel.map((user, index) => {
      //display details
      return (
        <tr
          class='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-[#3a454b]'
          key={index}
        >
          <td class='w-4 p-4'>
            <div class='flex items-center'></div>
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.name}
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            <button
              type='button'
              onClick={() => {
                allocate(user.name)
              }}
              class='mr-2 mb-2 rounded-lg  bg-[#e2a500] px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900'
            >
              Allocate
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='absolute inset-0 z-[5] min-w-full overflow-y-auto'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        <div className='absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity'></div>

        <div className=' w-full transform overflow-hidden rounded-lg  bg-white shadow-xl transition-all sm:my-8 sm:max-w-lg'>
          <div className='relative rounded-lg bg-white shadow'>
            <button
              type='button'
              className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={() => setAllocate(false)}
            >
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900'>
                Allocate Panel Member
              </h3>
              <center>
                <p class='items-center justify-center font-medium dark:text-black'>
                  Group ID:{group.groupID}
                </p>
              </center>

              <div class='mb-6 grid gap-6 lg:grid-cols-2'>
                <div class='mb-6'>
                  <p class='font-medium dark:text-black '>
                    Panel Member:{group.Panelmember}
                  </p>
                </div>
              </div>

              <div className='h-full w-full overflow-auto p-5'>
                <button
                  type='button'
                  onClick={() => {
                    allocate('Not Allocated')
                  }}
                  class='mr-2 mb-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                >
                  Un-Allocate Member
                </button>
                <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
                  <table
                    id='myTable'
                    class='w-full text-left text-sm text-gray-500 dark:text-gray-400'
                  >
                    <thead class='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
                      <tr>
                        <th scope='col' class='p-4'>
                          <div class='flex items-center'></div>
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Name
                        </th>
                        <th scope='col' class='px-6 py-3'></th>
                      </tr>
                    </thead>

                    <tbody>{renderTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allocate
