import React from 'react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Doctors from '../components/Doctors'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div className='font-sans font-normal text-[14px] leading-[20px] tracking-normal'>
      <Hero />
      <Stats />
      <Services />
      <Doctors />
      <Contact />
    </div>
  )
}

export default Home
