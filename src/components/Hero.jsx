import React from 'react'
import Gutters from '../layouts/Gutters'

const Hero = () => {
  return (
    <div className='bg-gradient-to-b from-[#090A10] to-[#3B466B]'>
      <Gutters>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold text-center'>Welcome to Dr. Pamela's Clinic</h1>
          <p className='mt-4 text-lg text-center'>Providing exceptional healthcare services since 2005</p>
        </div>
      </Gutters>
    </div>
  )
}

export default Hero