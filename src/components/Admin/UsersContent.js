import React, { useEffect, useState } from "react";
import axios from 'axios';

 
function UsersContent(){
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/users/list').then(json => setData(json.data))
  }, [])

  const renderTable = () => {
    return data.map(user => {
      return (
      
          
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3a454b]">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <td  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.name}
                </td>
                <td  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.email}
                </td>
                <td  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.regNo}
                </td>
                <td  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.role}
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-[#e2a500] hover:underline">Update</a>
                </td>
            </tr>
      
        
      )
    })
  }
  return (
    <div className='p-5 overflow-auto w-full h-full'>
      User Managment
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-70 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search Users"></input>
        </div>

     
        
    </div>
    <div className='flex items-center justify-end'>
    <button type="button" class="focus:outline-none text-white bg-[#e2a500] hover:bg-yellow-500  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">ADD User</button>
    <button type="button" class="focus:outline-none text-white bg-[#e2a500] hover:bg-yellow-500  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Delete Users</button>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-[#e2a500] uppercase bg-[#3a454b] dark:bg-[#3a454b] dark:text-[#e2a500]">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Registration No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        
        <tbody>
        {renderTable()}
        </tbody>

    </table>
</div>
    </div>
    
  
  )
  



    
}
    


// <tbody>{renderTable()}</tbody>



export default UsersContent

