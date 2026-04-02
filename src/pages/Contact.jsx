import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import Gutters from "../layouts/Gutters";

const ContactPage = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".contact-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          ".contact-heading",
          { clipPath: "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.8"
        )
        .fromTo(
          ".contact-form",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          ".contact-img",
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1"
        )
        .fromTo(
          ".image-mask",
          { x: "-100%" },
          { x: "100%", duration: 1.4, ease: "expo.inOut" },
          "-=1.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            setSuccess(false);
          }, 2000);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE]"
    >
      <Gutters>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <div className="relative z-10">

            <div className="absolute left-0 top-0 h-full w-px bg-[#0F172A]/10" />
            <div className="absolute left-0 top-0 h-24 w-px bg-[#1E40AF] contact-line origin-top" />
            <div className="absolute left-0 top-0 h-24 w-[3px] bg-[#38BDF8] blur-[6px] opacity-60 contact-line origin-top" />

            <div className="pl-6 sm:pl-10 mb-10">
              <h1 className="contact-heading font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#0F172A]">
                Contact
                <span className="text-[#1E40AF]"> Our Team</span>
              </h1>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form flex flex-col gap-8 pl-6 sm:pl-10"
            >
              <input
                type="text"
                name="from_name"
                placeholder="Full Name"
                required
                className="bg-transparent border-b border-[#0F172A]/20 focus:border-[#1E40AF] outline-none py-3 text-[#0F172A]"
              />

              <input
                type="email"
                name="from_email"
                placeholder="Email Address"
                required
                className="bg-transparent border-b border-[#0F172A]/20 focus:border-[#1E40AF] outline-none py-3 text-[#0F172A]"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="bg-transparent border-b border-[#0F172A]/20 focus:border-[#1E40AF] outline-none py-3 text-[#0F172A]"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                required
                className="bg-transparent border-b border-[#0F172A]/20 focus:border-[#1E40AF] outline-none py-3 text-[#0F172A] resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="relative mt-6 px-8 py-4 border border-[#1E40AF]/30 overflow-hidden group uppercase tracking-[0.3em] text-xs text-[#1E40AF] disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading ? "Sending..." : success ? "Sent ✓" : "Send Message"}
                </span>

                <div className="absolute inset-0 bg-[#1E40AF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  Send Message
                </span>
              </button>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#0F172A]/5 shadow-2xl">

              <div className="image-mask absolute inset-0 bg-[#F8FAFC] z-20" />

              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                alt="Hospital Interior"
                className="contact-img h-full w-full object-cover opacity-90"
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
    </section>
  );
};

export default ContactPage;