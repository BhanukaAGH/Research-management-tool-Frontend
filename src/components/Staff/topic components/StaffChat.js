import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
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

const StaffChat = () => {
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const { topic } = useSelector((state) => state.topic)
  const { user } = useSelector((state) => state.auth)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message) {
      const collectionRef = collection(db, topic._id)
      await addDoc(collectionRef, {
        text: message,
        username: user.name,
        uid: user.userId,
        createAt: serverTimestamp(),
      })
    } else {
      enqueueSnackbar('please enter message', { variant: 'warning' })
    }
    setMessage('')
  }

  useEffect(() => {
    const collectionRef = collection(db, topic._id)
    const dataOrdered = query(collectionRef, orderBy('createAt'), limit(50))
    onSnapshot(dataOrdered, (snapshot) => {
      setChat(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  return (
    <div className='mt-6 w-full rounded-lg border bg-white'>
      <div>
        <div className='w-full'>
          <div className='scrollbar relative flex h-80 w-full items-end overflow-y-auto p-6'>
            <ul className='h-full w-full space-y-2 text-base font-normal'>
              {chat &&
                chat.map(({ uid, username, text, createAt }, index) => (
                  <li
                    className={`flex ${
                      user.userId === uid ? 'justify-end' : 'justify-start'
                    }`}
                    key={index}
                  >
                    <div className='flex-col'>
                      <div className='relative max-w-xl rounded px-2 py-1 text-gray-700 shadow'>
                        <span className='block text-xs'>{username}</span>
                        <span className='block'>{text}</span>
                      </div>
                      <span className='block text-right text-xs text-gray-400'>
                        {createAt && moment(createAt.toDate()).format('DD MMM')}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <form className='flex w-full items-center justify-between border-t border-gray-300 p-2'>
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
    </div>
  )
}

export default StaffChat
