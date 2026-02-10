import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gutters from "../layouts/Gutters";

gsap.registerPlugin(ScrollTrigger);

const doctorData = [
  {
    name: "Dr. Sriram Chandra Damaraju",
    role: "Consultant & Neurosurgeon",
    degrees: "m.ch. (vellore), d.n.b",
    specialty: "Neurosurgery & Neurocritical Care",
    experience: "Neuro Specialist",
    bio: "Focused on heart rhythm disorders and complex interventional cardiology.",
    image: "M3.jpg.jpeg",
  },
  {
    name: "Dr. Pamela Narayan",
    role: "Consultant Physiotherapist",
    degrees: "B.P.T. (Vellore), M.Sc. (London)",
    specialty: "Physiotherapy & Rehabilitation",
    experience: "Senior Consultant",
    bio: "Expert in physiotherapy techniques, specializing in rehabilitation, pain management, and mobility restoration.",
    image: "Pamela.jpeg",
  },
  {
    name: "Dr. D. Pushpalatha",
    role: "obstetrician & gynaecologist",
    degrees: "MD",
    specialty: "Women’s Health & Maternity",
    experience: "Senior Consultant",
    bio: "Specialist in comprehensive maternity care and women's health wellness.",
    image: "Pushpalatha.jpeg",
  },
];

const Doctors = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const fadeRef = useRef(null);
  const tlRef = useRef(null);
  const [activeDoctor, setActiveDoctor] = useState(doctorData[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".doctor-row");

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      items.forEach((item, index) => {
        const line = item.querySelector(".scan-line");
        const content = item.querySelector(".row-content");
        const glow = item.querySelector(".line-glow");

        masterTl
          .fromTo(
            [line, glow],
            { x: "2rem", opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            index * 0.1
          )
          .fromTo(
            content,
            { clipPath: "inset(0 0 0 100%)" },
            { clipPath: "inset(0 0 0 0%)", duration: 0.6, ease: "power2.out" },
            "<"
          );
      });

      masterTl.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const changeDoctor = (doctor) => {
    if (doctor.name === activeDoctor.name) return;

    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(fadeRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.18,
      ease: "power2.out",
    })
      .add(() => setActiveDoctor(doctor))
      .fromTo(
        fadeRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
  };

  return (
    <section
      ref={sectionRef}
      id="doctors"
      className="relative min-h-screen w-full bg-[#0D0D0D] flex items-center overflow-hidden py-12 md:py-24 lg:py-32"
    >
      <Gutters>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start lg:items-center">
          <div className="lg:col-span-4 flex flex-col gap-1 z-20">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#F5F5F6] mb-8 uppercase tracking-tighter">
              Our{" "}
              <span className="font-serif italic font-normal opacity-50">
                Team
              </span>
            </h2>

            <div className="flex flex-col">
              {doctorData.map((doc, index) => {
                const isActive = activeDoctor.name === doc.name;

                return (
                  <button
                    key={index}
                    onPointerEnter={() => changeDoctor(doc)}
                    onClick={() => changeDoctor(doc)}
                    className={`doctor-row group relative pl-6 py-4 text-left cursor-pointer overflow-hidden transition-opacity duration-300 
                    ${isActive ? "opacity-100" : "opacity-30 hover:opacity-100"}`}
                  >
                    <div
                      className={`scan-line absolute left-0 top-0 h-full w-px z-20 transition-colors duration-300 
                      ${isActive ? "bg-[#F5F5F6]" : "bg-[#F5F5F6]/40 group-hover:bg-[#F5F5F6]"}`}
                    />

                    <div
                      className={`line-glow absolute left-0 top-0 h-full w-[2px] blur-[4px] z-10 transition-opacity duration-300
                      ${isActive ? "opacity-100 bg-[#F5F5F6]" : "opacity-0 group-hover:opacity-100 bg-[#F5F5F6]"}`}
                    />

                    <div className="row-content relative z-10">
                      <h3
                        className={`text-base md:text-lg font-medium tracking-tight leading-tight uppercase transition-colors duration-300
                        ${isActive ? "text-white" : "text-[#F5F5F6]/70 group-hover:text-white"}`}
                      >
                        {doc.name}
                      </h3>
                      <p
                        className={`text-[9px] uppercase tracking-widest mt-1 font-bold transition-colors duration-300
                        ${isActive ? "text-[#7E878E]" : "text-[#7E878E]/60 group-hover:text-[#7E878E]"}`}
                      >
                        {doc.degrees}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={cardRef}
            className="lg:col-span-8 h-auto lg:h-[65vh] bg-[#141414] 
            border-t border-x lg:border-l lg:border-y border-white/5 
            rounded-t-[40px] lg:rounded-t-none lg:rounded-tl-[80px] lg:rounded-bl-[80px] 
            shadow-2xl overflow-hidden relative"
          >
            <div
              ref={fadeRef}
              className="h-full flex flex-col lg:flex-row"
            >
              <div className="w-full lg:w-[42%] h-[420px] sm:h-[520px] lg:h-full relative overflow-hidden bg-black">
                <img
                  key={activeDoctor.image}
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  className="w-full h-full object-cover object-[50%_20%] grayscale brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
              </div>

              <div className="w-full lg:w-[58%] flex items-center">
                <div className="w-full px-6 md:px-10 lg:px-12 py-8 lg:py-10">
                  <span className="text-[#7E878E] text-[9px] uppercase tracking-[0.35em] mb-2 block font-bold">
                    {activeDoctor.role}
                  </span>

                  <h4 className="text-[#F5F5F6] text-2xl md:text-3xl lg:text-4xl font-serif italic mb-5 leading-snug">
                    {activeDoctor.name}
                  </h4>

                  <div className="space-y-5 max-w-md">
                    <div>
                      <h5 className="text-[#F5F5F6]/30 text-[8px] uppercase tracking-[0.25em] mb-1 font-bold">
                        Primary Specialty
                      </h5>
                      <p className="text-[#F5F5F6] text-xs font-light leading-relaxed uppercase tracking-wide">
                        {activeDoctor.specialty}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[#F5F5F6]/30 text-[8px] uppercase tracking-[0.25em] mb-1 font-bold">
                        Biography
                      </h5>
                      <p className="text-[#7E878E] text-xs leading-relaxed italic">
                        {activeDoctor.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <h5 className="text-[#F5F5F6]/30 text-[8px] uppercase tracking-[0.25em] mb-1 font-bold">
                        Experience
                      </h5>
                      <p className="text-[#F5F5F6] text-xl md:text-2xl font-serif italic">
                        {activeDoctor.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Gutters>
    </section>
  );
};

export default Doctors;
