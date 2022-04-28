import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaGlobe,
} from 'react-icons/fa'
import sliitLogo from '../../assets/sliit.png'

const Footer = () => {
  return (
    <footer className='bg-gray-800 p-4 sm:p-6'>
      <div className='flex justify-between'>
        <div className='mb-6 md:mb-0'>
          <img src={sliitLogo} className='mr-3 h-8' alt='Sliit Logo' />
        </div>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6'>
          <div>
            <h2 className='mb-6 text-sm font-semibold uppercase text-white'>
              Follow us
            </h2>
            <ul className='text-gray-400'>
              <li className='mb-4'>
                <Link to='#' className='hover:underline '>
                  Github
                </Link>
              </li>
              <li>
                <Link to='#' className='hover:underline'>
                  Discord
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='mb-6 text-sm font-semibold uppercase text-white'>
              Legal
            </h2>
            <ul className='text-gray-400'>
              <li className='mb-4'>
                <Link to='#' className='hover:underline'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='#' className='hover:underline'>
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className='my-6 border-gray-700 sm:mx-auto lg:my-8' />
      <div className='sm:flex sm:items-center sm:justify-between'>
        <span className='text-sm text-gray-400 sm:text-center'>
          {`© ${new Date().getFullYear()}  SLIIT™ . All Rights Reserved.`}
        </span>
        <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
          <Link to='#' className='text-gray-500 hover:text-white'>
            <FaFacebook className='h-5 w-5' />
          </Link>
          <Link to='#' className='text-gray-500 hover:text-white'>
            <FaInstagram className='h-5 w-5' />
          </Link>
          <Link to='#' className='text-gray-500 hover:text-white'>
            <FaTwitter className='h-5 w-5' />
          </Link>
          <Link to='#' className='text-gray-500 hover:text-white'>
            <FaGithub className='h-5 w-5' />
          </Link>
          <Link to='#' className='text-gray-500 hover:text-white'>
            <FaGlobe className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
