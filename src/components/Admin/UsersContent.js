import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { confirm } from 'react-confirm-box'
import Register from './Sub components/Register'

function UsersContent() {
  const [data, setData] = useState([])
  const [Uid, setUid] = useState([])
  const [registerUser, setRegisterUser] = useState(false)
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/users/list')
      .then((json) => setData(json.data))
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
        const url = `http://localhost:5000/users/deletem/${Uid}`

        axios.delete(url).then((response) => {
          console.log(response)
        })
        //to refresh the data
        axios
        .get('http://localhost:5000/users/list')
        .then((json) => setData(json.data))
      } else {
        //console.log("users not removed");
        window.alert('Users Not removed')
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
    var url;
    if(e.target.value=='all'){
        url='http://localhost:5000/users/list'
    }else{
       url = `http://localhost:5000/users/findby/${e.target.value}`
    }
    axios
    .get(url)
    .then((json) => setData(json.data))
    
  }


  const renderTable = () => {
    return data.map((user) => {
      return (
        <tr class='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-[#3a454b]'>
          <td class='w-4 p-4'>
            <div class='flex items-center'>
              <input
                id={user._id}
                value={user._id}
                checked={Uid.some((val) => val === user._id)}
                onChange={handleUidchange}
                type='checkbox'
                class='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-yellow-600'
              ></input>

              <label for='checkbox-table-search-1' class='sr-only'>
                checkbox
              </label>
            </div>
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.name}
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.email}
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.regNo}
          </td>
          <td class='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
            {user.role}
          </td>
          <td class='px-6 py-4 text-right'>
            <a
              href='#'
              class='font-medium text-blue-600 hover:underline dark:text-[#e2a500]'
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
      <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div class='p-4'>
          <label for='table-search' class='sr-only'>
            Search
          </label>
          <div class='relative mt-1'>
            <div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                class='h-5 w-5 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              class='w-70 block rounded-lg border border-gray-300 bg-gray-50  p-2.5 pl-10 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 '
              placeholder='Search Users'
            ></input>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <button
            type='button'
            class='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
            onClick={() => setRegisterUser(true)}
          >
            ADD User
          </button>

          <button
            onClick={HandleDelete}
            type='button'
            class='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
          >
            Delete Users
          </button>
        </div>
        <table class='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead class='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
            <tr>
              <th scope='col' class='p-4'>
                <div class='flex items-center'></div>
              </th>
              <th scope='col' class='px-6 py-3'>
                Name
              </th>
              <th scope='col' class='px-6 py-3'>
                Email
              </th>
              <th scope='col' class='px-6 py-3'>
                Registration No.
              </th>
              <th scope='col' class='px-6 py-3'>
              <select  class="bg-[#3a454b] font-bold text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]" id="cars"
                onChange={handleRoleChange}
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="supervisor">Supervisor</option>
                <option value="co_supervisor">Co-Supervisor</option>
                <option value="panel_member">Panel Member</option>
                <option value="admin">Admin</option>
              </select>
              </th>
              <th scope='col' class='px-6 py-3'>
                <span class='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>

          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      {registerUser && <Register setRegisterUser={setRegisterUser} />}
    </div>
  )
}
// <tbody>{renderTable()}</tbody>

export default UsersContent
