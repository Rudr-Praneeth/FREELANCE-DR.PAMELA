import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gutters from "../layouts/Gutters";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { title: "Gynaecology", desc: "Diagnosis and treatment of female reproductive health." },
  { title: "Laparoscopic Surgery", desc: "Minimally invasive procedures with faster recovery." },
  { title: "Orthopedic & Arthroscopic", desc: "Advanced care for joints, bones, and mobility." },
  { title: "Paediatrics", desc: "Complete healthcare for infants, children, and adolescents." },
  { title: "Bleeding Disorders", desc: "Specialized care for clotting and blood conditions." },
  { title: "General Medicine", desc: "Comprehensive diagnosis and adult medical care." }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");

      cards.forEach((card, index) => {
        const line = card.querySelector(".scan-line");
        const glow = card.querySelector(".line-glow");
        const heading = card.querySelector(".card-heading");
        const desc = card.querySelector(".card-desc");
        const glassBg = card.querySelector(".glass-bg");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo(
          [line, glow],
          { x: 250, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.inOut",
            delay: (index % 4) * 0.15
          }
        )
          .fromTo(
            heading,
            { clipPath: "inset(0 0 0 100%)" },
            { clipPath: "inset(0 0 0 0%)", duration: 0.9, ease: "power3.inOut" },
            "<"
          )
          .fromTo(
            desc,
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            glassBg,
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
          .to(glow, { opacity: 0.3, duration: 0.5 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services"
      className="min-h-screen bg-gradient-to-b from-white to-[#eaf4fb] pb-16 overflow-hidden flex items-center"
    >
      <Gutters>
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-sans tracking-[0.5em] text-black/40 uppercase mb-2 font-bold">
            Expertise
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-black tracking-tight">
            Departments &{" "}
            <span className="italic text-[#4292C7]">
              Services
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="service-card group relative p-6 min-h-[160px] flex flex-col justify-center cursor-default transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Card Background */}
              <div className="glass-bg absolute inset-0 bg-white border border-black/10 shadow-lg rounded-sm pointer-events-none transition-all duration-300 group-hover:border-[#4292C7]/40 group-hover:shadow-xl" />

              {/* Left Accent Line */}
              <div className="relative w-full mb-2 z-10">
                <div className="scan-line absolute left-0 top-0 h-full w-[2px] bg-[#4292C7] z-20" />
                <div className="line-glow absolute left-0 top-0 h-full w-[5px] bg-[#4292C7] blur-[6px] shadow-[0_0_12px_rgba(66,146,199,0.5)] z-10" />

                <h3 className="card-heading pl-6 font-serif text-xl text-black leading-tight font-medium tracking-tight">
                  {service.title}
                </h3>
              </div>

              <p className="card-desc pl-6 font-sans text-xs md:text-sm text-black/70 leading-snug font-normal relative z-10">
                {service.desc}
              </p>

              {/* Subtle Yellow Hover Accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FFCA08] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Gutters>
    </section>
  );
};

export default Services;
