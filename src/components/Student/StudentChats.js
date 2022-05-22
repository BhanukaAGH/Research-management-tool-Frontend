import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import {
  collection,
  orderBy,
  query,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { IoChatbubblesSharp } from 'react-icons/io5'
import axios from 'axios'

const StudentChats = () => {
  const [chat, setChat] = useState([])
  const [topic, setTopic] = useState(null)
  const [message, setMessage] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const getTopic = async () => {
      if (user && user.groupId) {
        try {
          const response = await axios.get(
            `/api/v1/topic/group/${user.groupId}`
          )
          setTopic(response.data)
        } catch (error) {
          enqueueSnackbar('You have no Topic', { variant: 'warning' })
        }
      }
    }
    getTopic()
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message) {
      const collectionRef = collection(db, topic._id)
      await addDoc(collectionRef, {
        text: message,
        username: user.name,
        uid: user._id,
        createAt: serverTimestamp(),
      })
    } else {
      enqueueSnackbar('please enter message', { variant: 'warning' })
    }
    setMessage('')
  }

  useEffect(() => {
    if (topic) {
      const collectionRef = collection(db, topic._id)
      const dataOrdered = query(collectionRef, orderBy('createAt'), limit(50))
      onSnapshot(dataOrdered, (snapshot) => {
        setChat(snapshot.docs.map((doc) => doc.data()))
      })
    }
  }, [topic])

  return (
    <div className='h-full w-full overflow-hidden p-5'>
      {!user.groupId && (
        <div className='flex w-full items-center justify-center py-4'>
          <div className='w-full rounded-md bg-gray-700 py-4 text-center text-base font-medium text-white shadow-md md:text-lg lg:w-1/2 lg:text-xl'>
            You don't have a group to chat with.
          </div>
        </div>
      )}
      {user.groupId && !topic && (
        <div className='flex w-full items-center justify-center py-4'>
          <div className='w-full rounded-md bg-gray-700 py-4 text-center text-base font-medium text-white shadow-md md:text-lg lg:w-1/2 lg:text-xl'>
            You have no Topic.
          </div>
        </div>
      )}
      {user.groupId && topic && (
        <div className='h-full w-full rounded-lg border bg-white shadow-lg shadow-gray-400'>
          <div className='flex h-full flex-col rounded-lg'>
            <div className='flex max-h-fit items-center justify-center space-x-4 rounded-t-lg bg-gray-600 px-4 py-3 text-lg text-white lg:text-xl xl:text-2xl'>
              <IoChatbubblesSharp />
              <h3 className='font-semibold'>Chats</h3>
            </div>
            <div className='scrollbar relative flex h-full w-full items-end overflow-y-auto border border-gray-200 px-6'>
              <ul className='h-full w-full space-y-2 py-2 text-base font-normal'>
                {chat &&
                  chat.map(({ uid, username, text, createAt }, index) => (
                    <li
                      className={`flex pb-1 ${
                        user._id === uid ? 'justify-end' : 'justify-start'
                      }`}
                      key={index}
                    >
                      <div className='flex-col'>
                        <div className='relative max-w-xl rounded px-2 py-1 text-gray-700 shadow'>
                          <span className='block text-xs'>{username}</span>
                          <span className='block'>{text}</span>
                        </div>
                        <span className='block text-right text-xs text-gray-400'>
                          {createAt &&
                            moment(createAt.toDate()).format('DD MMM')}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <form className='flex max-h-fit w-full items-center justify-between border-t border-gray-300 p-2'>
              <input
                type='text'
                placeholder='Message'
                className='mx-1 block w-full rounded-full bg-gray-100 py-1 pl-4 text-lg outline-none focus:text-gray-700'
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type='submit' onClick={(e) => sendMessage(e)}>
                <svg
                  className='h-6 w-6 origin-center rotate-90 transform text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentChats
