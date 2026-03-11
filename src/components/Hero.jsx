import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Gutters from "../layouts/Gutters";
import "../App.css";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".hero-line",{ scaleY: 0 },{ scaleY: 1, duration: 1.2, ease: "power3.out" })
        .fromTo(".hero-pre",{ opacity: 0, x: -10 },{ opacity: 1, x: 0, duration: 0.8 },"-=0.8")
        .fromTo(".hero-heading",{ clipPath: "inset(0 0 0 100%)" },{ clipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "power3.inOut" },"-=0.8")
        .fromTo(".hero-sub",{ opacity: 0, y: 10 },{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },"-=0.6")
        .fromTo(".hero-cta",{ opacity: 0 },{ opacity: 1, duration: 0.8 },"-=0.4")
        .fromTo(".image-mask",{ x: "-100%" },{ x: "100%", duration: 1.4, ease: "expo.inOut" },"-=1.2")
        .fromTo(".hero-img",{ scale: 1.1, opacity: 0 },{ scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },"-=1.0");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE]"
    >
      <Gutters>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <div className="relative z-10">

            <div className="absolute left-0 top-0 h-full w-px bg-[#0F172A]/10" />
            <div className="absolute left-0 top-0 h-24 w-px bg-[#1E40AF] hero-line origin-top" />
            <div className="absolute left-0 top-0 h-24 w-[3px] bg-[#38BDF8] blur-[6px] opacity-60 hero-line origin-top" />

            <div className="pl-6 sm:pl-10">

              <p className="hero-pre text-[10px] tracking-[0.45em] uppercase text-[#0F172A]/50 font-semibold mb-6">
                Established Excellence in Neurological Care
              </p>

              <h1 className="hero-heading font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#0F172A]">
                Lakshmi Hospital
                <br />
                <span className="text-[#1E40AF]">
                  & Research Centre
                </span>
              </h1>

              <p className="hero-sub mt-6 max-w-md text-sm text-[#0F172A]/70 leading-relaxed font-sans">
                A centre of advanced neurological medicine dedicated to
                precision diagnosis, modern clinical research, and
                compassionate patient care. Our specialists combine decades of
                expertise with state-of-the-art technology to deliver
                exceptional treatment outcomes.
              </p>

              <div className="hero-cta mt-10 flex flex-wrap items-center gap-6">

                <a
                  href="#contact"
                  className="group relative overflow-hidden border border-[#1E40AF]/30 px-6 py-3 text-[#1E40AF] font-sans text-[12px] font-medium tracking-widest uppercase"
                >
                  <span className="absolute inset-0 bg-[#1E40AF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-[#F8FAFC] transition-colors duration-300">
                    Book Appointment
                  </span>
                </a>

                <a
                  href="#services"
                  className="text-[12px] font-sans tracking-[0.25em] uppercase text-[#0F172A]/50 hover:text-[#0EA5A4] transition-colors duration-300"
                >
                  Explore Departments →
                </a>

              </div>

            </div>

          </div>

          <div className="relative hidden lg:block">

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#0F172A]/5 shadow-2xl">

              <div className="image-mask absolute inset-0 bg-[#F8FAFC] z-20" />

              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                alt="Hospital Interior"
                className="hero-img h-full w-full object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/70 to-transparent" />

              <div className="absolute bottom-6 left-6 z-30">
                <p className="font-serif text-lg text-[#1E40AF]">
                  Excellence in Care
                </p>
              </div>

            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#0F172A]/10 pointer-events-none" />

          </div>

        </div>
      </Gutters>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 opacity-20">
        <div className="w-px h-12 bg-gradient-to-b from-[#1E40AF] to-transparent" />
      </div>

    </section>
  );
};

export default Hero;