import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import Register from './subComponents/Register'
import EditUser from './subComponents/EditUser'
import { useSnackbar } from 'notistack'

function UsersContent() {
  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState([])
  const [Uid, setUid] = useState([])
  const [clickEdit, setClickEdit] = useState(false) //state to display update
  const [id, setid] = useState('') //to pass id to edit user
  const [registerUser, setRegisterUser] = useState(false)

  //method to get data of single user for update purposes
  // async function userDetails(Userid) {
  //   const url = `http://localhost:5000/users/find1/${Userid}`
  //   axios.get(url).then((json) => setsingleUser(json.data))
  // }
  //method to refresh table upon every change
  const tableList = () => {
    axios
      .get(`${process.env.SERVER_BACKEND_URL}/api/v1/users/list`)
      .then((json) => setData(json.data))
  }

  useEffect(() => {
    tableList()
  }, [])

  async function HandleDelete() {
    //delete all from uid array

    if (Uid.length == 0) {
      //check if users selected to delete
      //console.log("no users selected")
      window.alert('Select Users to Remove')
    } else {
      const result = await confirm(
        'Are you sure u want to remove all checked users ?'
      )
      if (result) {
        const url = `${process.env.SERVER_BACKEND_URL}/api/v1/users/deletem/${Uid}`

        axios
          .delete(url)
          .then((response) => {
            console.log(response)
            setUid([])
            enqueueSnackbar(response.data.msg, { variant: 'success' })
            //to refresh the data
            tableList()
          })
          .catch(function (error) {
            //console.log("responseError",error.response.data.msg);
            setUid([])
            enqueueSnackbar(error.data.msg, { variant: 'error' })
          })
      } else {
        //console.log("users not removed");
        //window.alert('Users Not removed')
        enqueueSnackbar("User/'s Not Removed", { variant: 'info' })
      }
    }
  }
  const handleUidchange = (event) => {
    //add object ids of selected checkboxes to Uid arrau
    const { checked, value } = event.currentTarget

    setUid((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    )
  }
  //filter users by role
  const handleRoleChange = (e) => {
    console.log(e.target.value)
    var url
    if (e.target.value == 'all') {
      url = `${process.env.SERVER_BACKEND_URL}/api/v1/users/list`
    } else {
      url = `${process.env.SERVER_BACKEND_URL}/api/v1/users/findby/${e.target.value}`
    }
    axios.get(url).then((json) => setData(json.data))
  }

  function search() {
    var input, filter, table, tr, td, i, txtValue
    input = document.getElementById('myInput')
    filter = input.value.toUpperCase()
    table = document.getElementById('myTable')
    tr = table.getElementsByTagName('tr')
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[3] //search users by coloumn 3 which is registration number
      if (td) {
        txtValue = td.textContent || td.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ''
        } else {
          tr[i].style.display = 'none'
        }
      }
    }
  }

  const renderTable = () => {
    return data.map((user, index) => {
      //display details
      return (
        <tr
          className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-[#3a454b]'
          key={index}
        >
          <td className='w-4 p-4'>
            <div className='flex items-center'>
              <input
                id={user._id}
                value={user._id}
                checked={Uid.some((val) => val === user._id)}
                onChange={handleUidchange}
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-yellow-600'
              ></input>

              <label htmlFor='checkbox-table-search-1' className='sr-only'>
                checkbox
              </label>
            </div>
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.name}
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.email}
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.regNo}
          </td>
          <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.role}
          </td>
          <td className='px-6 py-4 text-right'>
            <a
              className='font-medium text-[#e2a500] hover:underline'
              onClick={() => {
                if (user.role == 'admin') {
                  enqueueSnackbar('Admin cannot be updated', {
                    variant: 'info',
                  })
                  window.alert('Admin cannot be updated')
                } else {
                  setClickEdit(true)
                  setid(user._id)
                }
              }}
            >
              Update
            </a>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className='h-full w-full overflow-auto p-5'>
      User Managment
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='p-4'>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative mt-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              onKeyUp={search}
              id='myInput'
              className='w-70 block rounded-lg border border-gray-300 bg-gray-50  p-2.5 pl-10 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 '
              placeholder='Search By Reg No.'
            ></input>
          </div>
        </div>

        <div className='flex items-center justify-end'>
          <button
            type='button'
            className='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
            onClick={() => setRegisterUser(true)}
          >
            ADD User
          </button>

          <button
            onClick={HandleDelete}
            type='button'
            className='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
          >
            Delete Users
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
        <a onClick={tableList}>
          <table
            id='myTable'
            className='w-full text-left text-sm text-gray-500 dark:text-gray-400'
          >
            <thead className='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
              <tr>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'></div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Registration No.
                </th>
                <th scope='col' className='px-6 py-3'>
                  <select
                    className='bg-[#3a454b] text-xs font-bold uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'
                    id='cars'
                    onChange={handleRoleChange}
                  >
                    <option value='all'>All Roles</option>
                    <option value='student'>Students</option>
                    <option value='supervisor'>Supervisor</option>
                    <option value='co_supervisor'>Co-Supervisor</option>
                    <option value='panel_member'>Panel Member</option>
                    <option value='admin'>Admin</option>
                  </select>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>

            <tbody>{renderTable()}</tbody>
          </table>
        </a>
      </div>
      {clickEdit && <EditUser id={id} setClickEdit={setClickEdit} />}
      {registerUser && <Register setRegisterUser={setRegisterUser} />}
    </div>
  )
}

export default UsersContent
