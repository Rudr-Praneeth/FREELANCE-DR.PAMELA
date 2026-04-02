import React, {useEffect, useLayoutEffect} from 'react'
import AboutBento from "../sections/AboutBento"
import Timeline from '../sections/Timeline';

const About = () => {
  return (
    <div className='font-sans font-normal text-[14px] leading-[20px] tracking-normal overflow-x-hidden mt-12'>
      <AboutBento />
      <Timeline />
    </div>
  )
}

export default About