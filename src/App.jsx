import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-[#090A10] text-[#F5F5F6] font-sans font-normal text-[14px] leading-[20px] tracking-normal'>
      <NavBar />
      <Hero />
      <Stats />
      <Services />
      <Doctors />
      <Footer />
    </div>
  )
}

export default App