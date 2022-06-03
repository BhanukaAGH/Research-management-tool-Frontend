import React, { useState, useEffect } from 'react'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from 'firebase/storage'
import { storage } from '../../firebase-config'
import Spinner from '../Spinner'
import { FaDownload } from 'react-icons/fa'

const StudentTemplates = () => {
  const [loading, setLoading] = useState(true)
  const [uploads, setUploads] = useState([]) //to store all documents from firebase storage

  var filesRef = ref(storage, 'files/') //refernce to all files in folder file

  const List = () => {
    // setLoading(true)

    listAll(filesRef).then((response) => {
      response.items.forEach((item) => {
        const name = item.name
        getDownloadURL(item).then((url) => {
          setUploads((prev) => [
            ...prev,
            {
              name: name,
              url: url,
            },
          ])
        })
      })
    })

    setLoading(false)
  }
  useEffect(() => {
    List()
  }, [])

  if (uploads.length === 0) {
    return <Spinner />
  }

  return (
    <div className='h-full w-full overflow-auto p-5'>
      Student Templates
      <p className='text-sm text-red-500'>Click On File Name to Download</p>
      <br />
      <div className='grid grid-cols-4 gap-4'>
        {uploads.map((up) => {
          return (
            <div
              className='w-full rounded-lg border border-gray-200 bg-white bg-opacity-70 p-0.5 shadow-md'
              key={up.url}
            >
              <div className='url'>
                <br />

                <a href={up.url}>
                  <span>
                    {' '}
                    <FaDownload />
                  </span>
                  <h5 className='mb-2 text-lg tracking-tight text-black '>
                    Name: {up.name}
                  </h5>
                </a>

                <br />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StudentTemplates
