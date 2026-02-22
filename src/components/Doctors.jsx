import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function TestimonialSlider({ data = [] }) {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!data.length) return;

    gsap.to(sliderRef.current, {
      xPercent: -100 * index,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [index, data.length]);

  if (!data.length) return null;

  return (
    <div className="h-screen pb-10 bg-gradient-to-t from-[#F8FAFC] to-[#E0F2FE] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl overflow-hidden">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-sans tracking-[0.5em] text-[#0F172A]/40 uppercase mb-2 font-bold">Professionals</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#0F172A] tracking-tight">
            Our <span className="italic opacity-70 text-[#1E40AF]">Doctors</span>
          </h2>
        </div>
        <div ref={sliderRef} className="flex w-full">
          {data.map((item, i) => (
            <div
              key={i}
              className="min-w-full grid md:grid-cols-2 gap-10 items-center"
            >
              <div className="flex justify-center">
                <div className="w-80 h-96 overflow-hidden rounded-2xl shadow-3xl border border-[#0F172A]/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-[#1E40AF]">
                  {item.name}
                </h2>

                <p className="text-[#0EA5A4] font-medium tracking-wide">
                  {item.role}
                </p>

                <p className="text-[#0F172A]/60">
                  {item.degrees}
                </p>

                <p className="mt-2 text-[#0F172A]/80 font-medium">
                  {item.specialty}
                </p>

                <p className="text-[#0F172A]/60">
                  {item.experience}
                </p>

                <div className="relative mt-6">
                  <span className="text-[#38BDF8] text-6xl absolute -left-6 -top-6">
                    “
                  </span>
                  <p className="text-lg text-[#0F172A] leading-relaxed">
                    {item.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prev}
            className="w-12 h-12 border border-[#1E40AF]/40 rounded-full flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-[#F8FAFC] transition-all duration-300"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="w-12 h-12 border border-[#1E40AF]/40 rounded-full flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-[#F8FAFC] transition-all duration-300"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}