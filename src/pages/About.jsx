import React, {useEffect, useLayoutEffect} from 'react'
import AboutBento from "../sections/AboutBento"
import Timeline from '../sections/Timeline';
import ScrollToTop from '../utils/ScrollToTop';


const About = () => {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <AboutBento />
      <Timeline />
    </div>
  )
}

export default About