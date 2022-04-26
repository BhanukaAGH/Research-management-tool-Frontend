import React from 'react'

const StaffChat = () => {
  return (
    <div className='mt-6 w-full rounded border bg-white'>
      <div>
        <div className='w-full'>
          <div className='relative h-80 w-full overflow-y-auto p-6'>
            <ul className='space-y-2 text-base font-normal'>
              <li className='flex justify-start'>
                <div className='relative max-w-xl rounded px-2 py-1 text-gray-700 shadow'>
                  <span className='block'>Hi</span>
                </div>
              </li>
              <li className='flex justify-end'>
                <div className='relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow'>
                  <span className='block'>Hiiii</span>
                </div>
              </li>
              <li className='flex justify-end'>
                <div className='relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow'>
                  <span className='block'>how are you?</span>
                </div>
              </li>
              <li className='flex justify-start'>
                <div className='relative max-w-xl rounded px-4 py-2 text-gray-700 shadow'>
                  <span className='block'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.{' '}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className='flex w-full items-center justify-between border-t border-gray-300 p-2'>
            <input
              type='text'
              placeholder='Message'
              className='mx-1 block w-full rounded-full bg-gray-100 py-1 pl-4 text-lg outline-none focus:text-gray-700'
              name='message'
              required
            />
            <button type='submit'>
              <svg
                className='h-6 w-6 origin-center rotate-90 transform text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffChat
