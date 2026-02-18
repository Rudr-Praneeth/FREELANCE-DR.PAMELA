import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Gutters from "../layouts/Gutters";
import "../App.css";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          ".hero-pre",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.8"
        )
        .fromTo(
          ".hero-heading",
          { clipPath: "inset(0 0 0 100%)" },
          { clipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "power3.inOut" },
          "-=0.8"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".image-mask",
          { x: "-100%" },
          { x: "100%", duration: 1.4, ease: "expo.inOut" },
          "-=1.2"
        )
        .fromTo(
          ".hero-img",
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
          "-=1.0"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white to-[#eaf4fb]"
    >
      <Gutters>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            {/* Decorative vertical line */}
            <div className="absolute left-0 top-0 h-full w-px bg-black/10" />
            <div className="absolute left-0 top-0 h-24 w-px bg-[#4292C7] hero-line origin-top" />
            <div className="absolute left-0 top-0 h-24 w-[3px] bg-[#4292C7] blur-[6px] opacity-60 hero-line origin-top" />

            <div className="pl-6 sm:pl-10">
              <p className="hero-pre text-[10px] tracking-[0.4em] uppercase text-black/50 font-bold mb-4">
                Pioneering Healthcare Since 1982
              </p>

              <h1 className="hero-heading font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-black">
                Advanced care,
                <br />
                <span className="italic font-light text-[#4292C7]">
                  guided by
                </span>
                <br />
                compassion
              </h1>

              <p className="hero-sub mt-6 max-w-sm text-[14px] sm:text-base text-black/70 leading-relaxed font-sans">
                It is to fill this need for holistic neurological services that
                Lakshmi Hospital and Research Centre was started in 1999, by two
                committed healthcare professional with specialised training in
                neuro care.
              </p>

              <div className="hero-cta mt-8 flex flex-wrap items-center gap-6">
                {/* PRIMARY CTA */}
                <a
                  href="#contact"
                  className="group relative overflow-hidden border border-black px-6 py-3 bg-[#4292C7] text-white font-sans text-[12px] font-medium tracking-widest uppercase transition-colors duration-300"
                >
                  <span className="absolute inset-0 bg-[#FFCA08] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    Book Appointment
                  </span>
                </a>

                {/* SECONDARY LINK */}
                <a
                  href="#services"
                  className="text-[12px] font-sans tracking-[0.2em] uppercase text-[#4292C7] hover:text-black transition-colors duration-300"
                >
                  Our Departments →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-black/10 shadow-xl">
              <div className="image-mask absolute inset-0 bg-white z-20" />

              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                alt="Hospital Interior"
                className="hero-img h-full w-full object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent" />

              <div className="absolute bottom-6 left-6 z-30">
                <p className="font-serif text-lg text-black">
                  Trust in Excellence
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#FFCA08] pointer-events-none" />
          </div>
        </div>
      </Gutters>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[#4292C7] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
