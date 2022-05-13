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
    const tableList=()=>{
      axios
        .get('http://localhost:5000/subtype/list')
        .then((json) => setData(json.data))
    }
  
    useEffect(() => {
      tableList();
      
    }, [])
  
async function DeletSubtype(name){
  
  const result = await confirm('Confirm if you want to delete user: '+name)
  if (result) {
    const url = `http://localhost:5000/subtype/${subID}`
    axios.delete(url).then((response) => {
      console.log(response)
      //to refresh the data
      tableList();
    })
    
    
  } else {
    //console.log("users not removed");
    window.alert('SubType Not removed')
  }

 
}





  const renderTable = () => {
    return data.map((Submission) => {
      //display details
      return (
        <tr class="bg-white overflow-y-auto border-b dark:bg-[#EEF2FF] dark:border-gray-400">
        <th scope="row" class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
          {Submission.name}
        </th>
        <td class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
            {Submission.type}
        </td>
        <td class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
            {Submission.dueDate}
        </td>
        <td class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
            {Submission.description}
        </td>
        <td class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
            {Submission.createdAt}
        </td>
        <td class='whitespace-nowrap px-6 py-4 font-medium text-black-900 dark:text-black'>
            <a href="#" class='font-medium text-[#ff0000] text-bold hover:underline  dark:text-[#ff0000]' onClick={() => {setsubID(Submission._id);DeletSubtype(Submission.name);}}  >Delete</a>
        </td>
    </tr>
      )
    })
    
  }


  return <div><div className='h-full w-full overflow-y-auto p-5'>Submission Managment</div>
  <div class="relative overflow-y-auto">
 
        <div className='flex items-center justify-end'>
          <button
            type='button'
            class='mr-2 mb-2 rounded-lg bg-[#e2a500]  px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none'
            onClick={() => {setClickEdit(true)}}
          >
            Create Submission Type
          </button>
        </div>
        <div className='flex items-center justify-left'>
            <button class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5  dark:bg-yellow-200 dark:text-yellow-800 dark:hover:bg-yellow-300" onClick={tableList} >refresh Table</button>
        </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class='bg-[#3a454b] text-xs uppercase text-[#e2a500] dark:bg-[#3a454b] dark:text-[#e2a500]'>
          
            <tr>
                <th scope="col" class="px-6 py-3">
                Submission Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Submission Type
                </th>
                <th scope="col" class="px-6 py-3">
                    Due Date
                </th>
                <th scope="col" class="px-6 py-3">
                    description
                </th>
                <th scope="col" class="px-6 py-3">
                    Created Date
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
{clickEdit && <CreateSubType   setClickEdit={setClickEdit} />}
  
  
  </div>
  
  
  
  

}

export default AdminSubmission
