import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    year: "1967",
    title: "A Beginning Rooted in Care",
    content: `Lakshmi Hospital began as a deeply personal vision shaped by Dr. D. Pushpalatha. Having trained in Obstetrics and Gynaecology at Osmania Medical College, she recognized the need for accessible and compassionate care for women and children. In October 1967, outpatient services quietly began, laying the emotional and clinical foundation for a space where families could feel safe, heard, and cared for.`,
  },
  {
    year: "1969",
    title: "The First New Life",
    content: `Two years later, in November 1969, the hospital witnessed its first delivery. It was a defining moment — not just medically, but emotionally. It marked the beginning of a legacy where countless families would return, generation after generation, trusting the same hands that once welcomed their first child into the world.`,
  },
  {
    year: "1972",
    title: "Growing with the Community",
    content: `As the needs of the growing community evolved, so did the hospital. In 1972, it moved to its present location and transformed into Lakshmi Maternity and Nursing Home — a 10-bed facility dedicated to mothers and children. This transition reflected not just expansion, but a deeper commitment to structured, reliable, and continuous care.`,
  },
  {
    year: "1998",
    title: "A Transformational Expansion",
    content: `The journey took a transformative turn in 1998 with the arrival of Dr. D. Sriram Chandra and Dr. Pamela Narayan. With expertise in neurosurgery and rehabilitation, they expanded the hospital’s scope into neurological and recovery care. Patients facing complex brain and spine conditions found both advanced treatment and a path to regaining independence through rehabilitation.`,
  },
  {
    year: "Today",
    title: "Continuing the Legacy",
    content: `Today, Lakshmi Hospital stands as a living legacy of its founding values. It continues to evolve while staying rooted in compassion, trust, and personalized care. More than a hospital, it remains a place where families feel supported, where healing is holistic, and where every patient journey is treated with dignity and dedication.`,
  },
];

const PremiumTimeline = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      const sections = gsap.utils.toArray(".timeline-section");

      sections.forEach((section, i) => {
        const year = section.querySelector(".year");
        const card = section.querySelector(".card");

        gsap.fromTo(
          year,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          card,
          { y: 140, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8 group">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.5em] uppercase text-[#1E40AF] font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#1E40AF] transition-all duration-500 group-hover:w-12" />
              Our Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#0F172A] leading-[0.9] tracking-tight transition-transform duration-500 group-hover:translate-x-2">
              A Legacy of <br />
              <span className="italic text-[#1E40AF]">
                Care & Trust
              </span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-sm text-[#0F172A]/50 leading-relaxed uppercase tracking-wider">
              Decades of compassionate healthcare, evolving with every generation we serve.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 w-[2px] h-full bg-[#1E40AF]/10 md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-[#1E40AF] to-[#38BDF8] origin-top scale-y-0"
            />
          </div>

          <div className="space-y-40">
            {data.map((item, index) => (
              <div
                key={index}
                className="timeline-section grid md:grid-cols-2 gap-10 items-center"
              >
                <div
                  className={`year font-sans font-bold text-5xl md:text-7xl tracking-tight ${
                    index % 2 === 0
                      ? "md:text-right md:pr-20 text-[#1E40AF]"
                      : "md:order-2 md:text-left md:pl-20 text-[#1E40AF]"
                  } ml-12 md:ml-0`}
                >
                  {item.year}
                </div>

                <div
                  className={`card relative bg-white border border-[#1E40AF]/10 p-8 md:p-12 rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    index % 2 !== 0 ? "md:order-1" : ""
                  } ml-12 md:ml-0`}
                >
                  <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-[#1E40AF]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

                  <span className="text-[10px] tracking-widest uppercase text-[#1E40AF] font-bold mb-4 block">
                    {item.year}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-serif text-[#0F172A] mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-[#0F172A]/70 text-base md:text-lg leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumTimeline;