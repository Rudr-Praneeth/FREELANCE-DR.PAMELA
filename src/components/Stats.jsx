import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Gutters from '../layouts/Gutters'

gsap.registerPlugin(ScrollTrigger)

const Stats = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statItems = gsap.utils.toArray('.stat-item')

      statItems.forEach((item, index) => {
        const line = item.querySelector('.scan-line')
        const content = item.querySelector('.stat-content')
        const glow = item.querySelector('.line-glow')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 90%', 
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        })

        tl.fromTo([line, glow], 
          { x: '8rem', opacity: 0 }, 
          { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut', delay: index * 0.1 }
        )
        .fromTo(content,
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 1, ease: 'power2.inOut' },
          '<'
        )
        .to(glow, { opacity: 0.3, duration: 0.5 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#3B466B] to-[#7E878E] flex items-center overflow-hidden">
      <Gutters>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl sm:text-6xl leading-[1.15] tracking-tight text-white">
              Three decades of<br />clinical excellence
            </h2>
            <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg leading-relaxed text-white/80">
              Established in 1999, Lakshmi Hospital has evolved into a premier multi-specialty tertiary care center, 
              committed to providing holistic neurological services and compassionate healthcare.
            </p>
            <button className="group relative mt-10 sm:mt-12 inline-flex items-center overflow-hidden border border-white/40 px-6 py-3 sm:px-7 sm:py-4 font-sans text-sm font-medium tracking-wide text-white">
              <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Our Departments
                <span className="text-lg">→</span>
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-20">
            <Stat value="25+" label="Years of Legacy" />
            <Stat value="1000s" label="Neurological Procedures" />
            <Stat value="24/7" label="Emergency Care" />
            <Stat value="NABH" label="Quality Certified" />
          </div>
        </div>
      </Gutters>
    </section>
  )
}

const Stat = ({ value, label }) => {
  return (
    <div className="stat-item relative pl-4 sm:pl-6">
      <div className="scan-line absolute left-0 top-1 h-10 sm:h-12 w-px bg-white z-20" />
      <div className="line-glow absolute left-0 top-1 h-10 sm:h-12 w-[3px] bg-white blur-[6px] shadow-[0_0_20px_2px_rgba(255,255,255,0.9)] z-10" />
      
      <div className="stat-content">
        <div className="font-sans text-2xl sm:text-5xl font-semibold tracking-tight tabular-nums lining-nums text-white">
          {value}
        </div>
        <div className="mt-2 sm:mt-3 font-sans text-[10px] sm:text-sm uppercase tracking-widest sm:tracking-wide text-white/70">
          {label}
        </div>
      </div>
    </div>
  )
}

export default Stats