import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaGlobe,
} from 'react-icons/fa'
import sliitLogo from '../../assets/sliit.png'

const Footer = () => {
  return (
    <footer className='bg-blue-900'>
      <hr className='w-full bg-blue-900 ring-2' />
      <div className='flex h-full justify-between space-y-4 bg-white py-8 px-4 sm:px-6'>
        <div className='grid grid-cols-2 gap-8 lg:grid-cols-5'>
          {/* column 01 */}
          <div className='col-span-full flex-col items-start space-y-2 lg:col-span-2 lg:mr-8'>
            <img src={sliitLogo} className='mr-3 h-8' alt='Sliit Logo' />
            <p>
              We are a leading non-state higher education institute approved by
              the University Grants Commission (UGC) under the Universities Act.
              We are members of the Association of Commonwealth Universities
              (ACU), as well as the International Association of Universities
              (IAU). We are also the first Sri Lankan institute to be accredited
              by the Institute of Engineering & Technology( IET), UK and
              Engineering Council, UK.
            </p>
          </div>
          {/* column 02 */}
          <div>
            <h2 className='mb-4 text-sm font-semibold uppercase text-blue-500'>
              About SLIIT
            </h2>
            <ul className='text-gray-500'>
              <li className='mb-1'>
                <Link to='#' className='hover:underline '>
                  About us
                </Link>
              </li>
              <li className='mb-1'>
                <Link to='#' className='hover:underline'>
                  Programmes
                </Link>
              </li>
              <li className='mb-1'>
                <Link to='#' className='hover:underline'>
                  Facilities
                </Link>
              </li>
              <li>
                <Link to='#' className='hover:underline'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* column 03 */}
          <div>
            <h2 className='mb-4 text-sm font-semibold uppercase text-blue-500'>
              Legal
            </h2>
            <ul className='text-gray-500'>
              <li className='mb-1'>
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
          {/* column 04 */}
          <div>
            <h2 className='mb-4 text-sm font-semibold uppercase text-blue-500'>
              Follow us
            </h2>
            <ul className='text-gray-500'>
              <li className='mb-1'>
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
        </div>
      </div>
      <div className='flex h-full w-full items-center py-3 px-4 sm:px-6'>
        <div className='w-full space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0'>
          <span className='text-sm text-white sm:text-center'>
            {`© ${new Date().getFullYear()}  SLIIT™ . All Rights Reserved.`}
          </span>
          <div className='flex space-x-6 sm:mt-0 sm:justify-center'>
            <Link to='#'>
              <FaFacebookF className='rounded-full bg-white p-1 text-2xl  text-blue-900 hover:bg-[#da733b] hover:text-white' />
            </Link>
            <Link to='#'>
              <FaInstagram className='rounded-full bg-white p-1 text-2xl  text-blue-900 hover:bg-[#da733b] hover:text-white' />
            </Link>
            <Link to='#'>
              <FaTwitter className='rounded-full bg-white p-1 text-2xl  text-blue-900 hover:bg-[#da733b] hover:text-white' />
            </Link>
            <Link to='#'>
              <FaGithub className='rounded-full bg-white p-1 text-2xl  text-blue-900 hover:bg-[#da733b] hover:text-white' />
            </Link>
            <Link to='#'>
              <FaGlobe className='rounded-full bg-white p-1 text-2xl  text-blue-900 hover:bg-[#da733b] hover:text-white' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
