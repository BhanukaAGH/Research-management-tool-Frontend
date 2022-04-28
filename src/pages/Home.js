import React from 'react'
import Footer from '../components/Home/Footer'
import Navbar from '../components/Home/Navbar'
// import Background from '../assets/background.jpg'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='relative'>
        <Navbar />
        <main className='flex h-screen items-center justify-center bg-gray-100'>
          <div className='container flex flex-col items-center py-12'>
            <div className='mb-5 w-11/12 flex-col items-center justify-center sm:mb-10  sm:w-2/3'>
              <h1 className='text-center text-2xl font-black leading-7 text-gray-800 sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl'>
                <span className='text-indigo-700'>SLIIT </span>
                Research Management System
              </h1>
              <p className='mx-auto mt-5 text-center text-sm font-normal text-gray-400 sm:mt-10 sm:text-lg lg:w-10/12'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos corrupti modi aspernatur libero maxime labore eos
                distinctio expedita ea dolore
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home
