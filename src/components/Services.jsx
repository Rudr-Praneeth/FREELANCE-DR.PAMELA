import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Gutters from '../layouts/Gutters'

gsap.registerPlugin(ScrollTrigger)

const servicesList = [
  { title: "Cardiology", desc: "Interventional and Non-invasive care." },
  { title: "Surgery", desc: "Bypass and valve replacements." },
  { title: "Urology", desc: "Kidney and stone-related issues." },
  { title: "Nephrology", desc: "Kidney care and dialysis services." },
  { title: "Orthopaedics", desc: "Trauma and joint replacements." },
  { title: "Medicine", desc: "Chronic and acute illness care." },
  { title: "Maternity", desc: "Obstetrics and women's health." },
  { title: "Pediatrics", desc: "Child healthcare and NICU." }
]

const Services = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card')

      cards.forEach((card, index) => {
        const line = card.querySelector('.scan-line')
        const glow = card.querySelector('.line-glow')
        const heading = card.querySelector('.card-heading')
        const desc = card.querySelector('.card-desc')
        const glassBg = card.querySelector('.glass-bg')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        })

        // 1. Heading Scan Animation (First)
        tl.fromTo([line, glow], 
          { x: 250, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.inOut', delay: (index % 4) * 0.15 }
        )
        .fromTo(heading,
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 0.9, ease: 'power3.inOut' },
          '<'
        )
        // 2. Description Fade In
        .fromTo(desc,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(glassBg, 
          { 
            opacity: 0, 
            scaleX: 0.95, 
            scaleY: 0.9,
            transformOrigin: "left center" 
          },
          { 
            opacity: 1, 
            scaleX: 1, 
            scaleY: 1, 
            duration: 0.7, 
            ease: "back.out(1.2)" 
          },
          "-=0.2"
        )
        .to(glow, { opacity: 0.3, duration: 0.5 })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className='min-h-screen bg-gradient-to-b from-[#7E878E] to-[#E1E0DB] pb-16 overflow-hidden flex items-center'>
      <Gutters>
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-sans tracking-[0.5em] text-[#1A1A1A]/40 uppercase mb-2 font-bold">Expertise</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] tracking-tight">
            Departments & <span className="italic opacity-70">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {servicesList.map((service, idx) => (
            <div key={idx} className="service-card relative p-5 min-h-[140px] flex flex-col justify-center">
              
              {/* Glassmorphic Background - now animates last */}
              <div className="glass-bg absolute inset-0 bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-sm pointer-events-none" />
              
              <div className="relative w-full mb-1 z-10">
                <div className="scan-line absolute left-0 top-0 h-full w-[1.5px] bg-white z-20" />
                <div className="line-glow absolute left-0 top-0 h-full w-[5px] bg-white blur-[6px] shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10" />
                
                <h3 className="card-heading pl-5 font-serif text-xl text-[#1A1A1A] leading-tight font-medium tracking-tight">
                  {service.title}
                </h3>
              </div>
              
              <p className="card-desc pl-5 font-sans text-xs md:text-sm text-[#1A1A1A]/60 leading-snug font-normal relative z-10">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </Gutters>
    </section>
  )
}

export default Services