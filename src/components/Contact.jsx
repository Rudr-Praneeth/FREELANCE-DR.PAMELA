import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Gutters from "../layouts/Gutters";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const formRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* CTA scroll animation */
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

  /* Modal animation */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });

      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
        .fromTo(
          modalRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
          "-=0.15"
        )
        .fromTo(
          closeRef.current,
          { rotate: -180, opacity: 0 },
          { rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.3"
        );
    } else {
      gsap.to(modalRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.25,
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.05,
        onComplete: () =>
          gsap.set(overlayRef.current, { display: "none" }),
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* EmailJS submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          formRef.current.reset();

          setTimeout(() => {
            setOpen(false);
            setSuccess(false);
          }, 2000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <>
      {/* SECTION */}
      <section
        id="contact"
        ref={sectionRef}
        className="relative w-full bg-gradient-to-b from-white to-[#eaf4fb] py-32 flex justify-center overflow-hidden"
      >
        <Gutters>
          <div className="contact-cta flex flex-col items-center text-center">
            <h2 className="text-black font-serif italic text-4xl md:text-6xl tracking-tight mb-8 leading-tight">
              Let’s Begin Your
              <span className="block font-sans not-italic uppercase text-base tracking-[0.35em] text-[#4292C7] mt-4">
                Care Journey
              </span>
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="relative group px-10 py-4 border border-black bg-[#4292C7] overflow-hidden uppercase tracking-[0.3em] text-xs text-white"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Contact Us
              </span>
              <div className="absolute inset-0 bg-[#FFCA08] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
            </button>
          </div>
        </Gutters>
      </section>

      {/* MODAL */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white border border-black/10 rounded-[32px] shadow-2xl relative"
        >
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-black/60 hover:text-black transition-all duration-300"
          >
            <FiX size={24} />
          </button>

          <div className="p-8 md:p-12">
            <h3 className="text-black text-3xl font-serif italic mb-10">
              Contact
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <input
                type="text"
                name="from_name"
                placeholder="Full Name"
                required
                className="bg-transparent border-b border-black/20 focus:border-[#4292C7] outline-none py-3 text-black"
              />

              <input
                type="email"
                name="from_email"
                placeholder="Email Address"
                required
                className="bg-transparent border-b border-black/20 focus:border-[#4292C7] outline-none py-3 text-black"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="bg-transparent border-b border-black/20 focus:border-[#4292C7] outline-none py-3 text-black"
              />

              <textarea
                name="message"
                rows="4"
                placeholder="How can we help you?"
                required
                className="bg-transparent border-b border-black/20 focus:border-[#4292C7] outline-none py-3 text-black resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="relative mt-6 py-4 border border-black bg-[#4292C7] overflow-hidden group uppercase tracking-[0.3em] text-xs text-white disabled:opacity-50"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {loading ? "Sending..." : success ? "Sent ✓" : "Send Message"}
                </span>

                <div className="absolute inset-0 bg-[#FFCA08] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
