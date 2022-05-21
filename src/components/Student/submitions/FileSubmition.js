import React from 'react'

const FileSubmition = ({ setSelectFile }) => {
  return (
    <div className='flex w-full items-center justify-center'>
      <label
        htmlFor='document'
        className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
      >
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <svg
            className='mb-3 h-10 w-10 animate-bounce text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='mb-2 text-sm text-gray-500'>
            <span className='font-semibold'>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-gray-500'>
            You can drag and drop files here to add them.
          </p>
        </div>
        <input
          id='document'
          type='file'
          className='hidden'
          onChange={(e) => setSelectFile(e.target.files[0])}
        />
      </label>
    </div>
  )
}

export default FileSubmition
