import React, {useEffect, useLayoutEffect} from 'react'
import AboutBento from "../sections/AboutBento"
import Timeline from '../sections/Timeline';

const About = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    return () => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
        }
    };
}, []);
  return (
    <div>
      <AboutBento />
      <Timeline />
    </div>
  )
}

export default About