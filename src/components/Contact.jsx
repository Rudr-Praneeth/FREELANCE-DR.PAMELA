import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gutters from "../layouts/Gutters";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-cta",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });

      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      ).fromTo(
        modalRef.current,
        { y: 40, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.15"
      );
    } else {
      gsap.to(modalRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.35,
        ease: "power2.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.35,
        delay: 0.1,
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#0D0D0D] py-32 flex justify-center overflow-hidden"
      >
        <Gutters>
          <div className="contact-cta flex flex-col items-center text-center">
            <h2 className="text-[#F5F5F6] font-serif italic text-4xl md:text-6xl tracking-tight mb-8 leading-tight">
              Let’s Begin Your
              <span className="block font-sans not-italic uppercase text-base tracking-[0.35em] opacity-40 mt-4">
                Care Journey
              </span>
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="relative group px-10 py-4 border border-white/10 overflow-hidden uppercase tracking-[0.3em] text-xs text-[#F5F5F6]"
            >
              <span className="relative z-10">Contact Us</span>

              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />

              <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                Contact Us
              </span>
            </button>
          </div>
        </Gutters>
      </section>

      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-6 bg-[#0D0D0D]/90 backdrop-blur-2xl"
        onClick={() => setOpen(false)}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111111] border border-white/10 rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,0.9)] relative"
        >
          <div className="absolute -inset-1 bg-white/5 blur-2xl rounded-[40px] opacity-60 pointer-events-none" />

          <div className="relative p-8 md:p-12">
            <h3 className="text-[#F5F5F6] text-3xl font-serif italic mb-10">
              Contact
            </h3>

            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-b border-white/10 focus:border-white/40 outline-none py-3 text-[#F5F5F6] placeholder-[#7E878E] transition-colors"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b border-white/10 focus:border-white/40 outline-none py-3 text-[#F5F5F6] placeholder-[#7E878E] transition-colors"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-transparent border-b border-white/10 focus:border-white/40 outline-none py-3 text-[#F5F5F6] placeholder-[#7E878E] transition-colors"
              />

              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="bg-transparent border-b border-white/10 focus:border-white/40 outline-none py-3 text-[#F5F5F6] placeholder-[#7E878E] transition-colors resize-none"
              />

              <button
                type="button"
                className="relative mt-6 py-4 border border-white/10 overflow-hidden group uppercase tracking-[0.3em] text-xs text-[#F5F5F6]"
              >
                <span className="relative z-10">Send Message</span>

                <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />

                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
