import React from 'react'
import Footer from '../components/Home/Footer'
import Navbar from '../components/Home/Navbar'
import SLIITLOGO from '../assets/sliit_logo.png'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='relative'>
        <Navbar />
        <main className='flex h-[calc(100vh-52px)] items-center justify-center bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400'>
          <div className='container flex flex-col items-center py-12'>
            <div className='mb-5 w-11/12 flex-col items-center justify-center sm:mb-10  sm:w-4/5'>
              <div className='mb-2 flex items-center justify-center'>
                <img
                  src={SLIITLOGO}
                  alt='sliit-logo'
                  className='w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-44'
                />
              </div>
              <h1 className='mb-1 text-center font-serif text-3xl tracking-tight text-[#FF7300] sm:text-4xl md:mb-2 md:text-5xl lg:text-6xl xl:mb-4 xl:text-7xl 2xl:text-8xl'>
                SLIIT
              </h1>
              <h1 className='text-center font-serif text-lg font-black uppercase text-[#00007B] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                Research Management System
              </h1>
              <p className='mx-auto mt-1 text-center text-sm font-normal text-gray-500 sm:mt-4 sm:text-lg lg:w-10/12'>
                As a leading tertiary educational Institute in Sri Lanka,
                research is an integral part of SLIIT.We strive for a vibrant
                research culture and numerous initiatives are in place for
                programming research among the academic and student communities.
                <span className='hidden 2xl:inline'>
                  Integrating research methodology to undergraduate and
                  postgraduate curricula, establishing a research center to
                  carry out research work, the SLIIT research grant scheme is
                  all meant to promote research.
                </span>
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
