import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSlider({ data = [] }) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    const ctx = gsap.context(() => {
      const getTotalWidth = () => sliderRef.current.scrollWidth;
      const getViewportWidth = () => window.innerWidth;

      gsap.to(sliderRef.current, {
        x: () => -(getTotalWidth() - getViewportWidth()),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getTotalWidth() * 0.3}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0.85, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [data.length]);

  if (!data.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-t from-[#F8FAFC] to-[#E0F2FE] overflow-hidden"
    >
      <div className="flex flex-col items-center text-center pt-12 sm:pt-16 mb-8 sm:mb-12 px-4">
        <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.4em] sm:tracking-[0.5em] text-[#0F172A]/40 uppercase mb-2 font-bold">
          Professionals
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0F172A] tracking-tight">
          Our <span className="italic opacity-70 text-[#1E40AF]">Doctors</span>
        </h2>
      </div>

      <div
        ref={sliderRef}
        className="flex h-auto md:h-[70vh] items-center"
      >
        {data.map((item, i) => (
          <div
            key={i}
            className="min-w-full px-4 sm:px-8 md:px-16 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
          >
            <div className="flex justify-center">
              <div className="w-64 sm:w-72 md:w-80 h-80 sm:h-88 md:h-96 overflow-hidden rounded-2xl shadow-2xl border border-[#0F172A]/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1E40AF]">
                {item.name}
              </h2>

              <p className="text-sm sm:text-base text-[#0EA5A4] font-medium tracking-wide">
                {item.role}
              </p>

              <p className="text-sm sm:text-base text-[#0F172A]/60">
                {item.degrees}
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#0F172A]/80 font-medium">
                {item.specialty}
              </p>

              <p className="text-sm sm:text-base text-[#0F172A]/60">
                {item.experience}
              </p>

              <div className="relative mt-6 px-2 sm:px-0">
                <span className="text-[#38BDF8] text-4xl sm:text-5xl md:text-6xl absolute -left-2 sm:-left-4 md:-left-6 -top-4 md:-top-6">
                  “
                </span>
                <p className="text-base sm:text-lg text-[#0F172A] leading-relaxed">
                  {item.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}