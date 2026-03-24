import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Gutters from "../layouts/Gutters";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    title: "Obstetrics & Gynaecology",
    desc: "Complete women’s healthcare across life stages",
    fullDesc:
      "Comprehensive women’s healthcare covering adolescent wellness, maternity care, fertility guidance, surgical expertise, and menopause management with a patient-first approach.",
    details: [
      "Antenatal & high-risk pregnancy care",
      "Normal delivery & postnatal support",
      "Fibroid & ovarian cyst treatment",
      "Hormonal & menstrual management",
      "Family planning & contraception",
    ],
  },
  {
    title: "Laparoscopic Surgery",
    desc: "Advanced minimally invasive surgery.",
    fullDesc:
      "Precision-driven keyhole surgical procedures designed for faster recovery, minimal scarring, and reduced hospital stay.",
    details: [
      "Laparoscopic hysterectomy",
      "Ovarian cyst removal",
      "Endometriosis surgery",
      "Diagnostic laparoscopy",
    ],
  },
  {
    title: "Orthopedic & Arthroscopic",
    desc: "Restoring strength and mobility.",
    fullDesc:
      "Comprehensive orthopedic solutions including joint replacement, arthroscopy, trauma management, and rehabilitation programs.",
    details: [
      "Knee replacement",
      "Shoulder arthroscopy",
      "Fracture management",
      "Sports rehabilitation",
    ],
  },
  {
    title: "Paediatrics",
    desc: "Compassionate child healthcare.",
    fullDesc:
      "Dedicated pediatric care ensuring holistic development, preventive care, immunization, and neonatal expertise.",
    details: [
      "Vaccinations",
      "Growth monitoring",
      "Neonatal care",
      "Nutrition guidance",
    ],
  },
  {
    title: "Bleeding Disorders",
    desc: "Specialized blood care.",
    fullDesc:
      "Advanced management of hemophilia, clotting disorders, and genetic blood conditions using evidence-based treatment protocols.",
    details: [
      "Hemophilia management",
      "Clotting factor therapy",
      "Platelet disorder treatment",
      "Genetic counselling",
    ],
  },
  {
    title: "General Medicine",
    desc: "Comprehensive adult care.",
    fullDesc:
      "Preventive, diagnostic, and long-term care for chronic and lifestyle diseases delivered with precision and empathy.",
    details: [
      "Diabetes management",
      "Hypertension care",
      "Thyroid disorders",
      "Preventive health checkups",
    ],
  },
];

const Services = () => {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const labelLineRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelLineRef.current) {
        gsap.fromTo(
          labelLineRef.current,
          { width: 0 },
          {
            width: "100%",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: labelLineRef.current,
              start: "top 85%",
            },
          },
        );
      }

      const cards = gsap.utils.toArray(".service-card");

      cards.forEach((card, index) => {
        const line = card.querySelector(".scan-line");
        const glow = card.querySelector(".line-glow");
        const heading = card.querySelector(".card-heading");
        const desc = card.querySelector(".card-desc");

        if (!line || !glow || !heading || !desc) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          [line, glow],
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.08,
          },
        )
          .fromTo(
            heading,
            { clipPath: "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              duration: 0.8,
              ease: "power3.out",
            },
            "<",
          )
          .fromTo(
            desc,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.4",
          );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useGSAP(
    () => {
      if (!selected) return;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      tl.fromTo(
        modalRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
      )
        .fromTo(
          modalContentRef.current,
          { y: 80, scale: 0.96, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.1",
        )
        .from(
          modalContentRef.current.querySelectorAll(".stagger"),
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.5",
        );
    },
    { dependencies: [selected], scope: containerRef },
  );

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        setSelected(null);
      },
    });

    tl.to(modalContentRef.current, {
      y: 40,
      scale: 0.98,
      autoAlpha: 0,
      duration: 0.4,
    }).to(modalRef.current, { autoAlpha: 0, duration: 0.3 }, "-=0.2");
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-24 bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE] overflow-hidden"
    >
      <Gutters>
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <div className="flex flex-col items-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#1E40AF]/60 mb-3">
              Departments
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
            Departments &{" "}
            <span className="italic text-[#1E40AF]">Services</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {servicesList.map((service, i) => (
            <div
              key={i}
              onClick={() => setSelected(service)}
              className="service-card h-[30vh] group relative p-8 bg-white/70 backdrop-blur-xl border border-[#1E40AF]/10 rounded-xl hover:border-[#1E40AF]/40 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl" />

              <div className="relative mb-3">
                <div className="scan-line absolute left-0 top-0 h-full w-[1.5px] bg-[#1E40AF]" />
                <div className="line-glow absolute left-0 top-0 h-full w-[4px] bg-[#38BDF8] blur-[6px]" />

                <h3 className="card-heading pl-4 text-xl font-serif text-[#0F172A] relative z-10">
                  {service.title}
                </h3>
              </div>

              <p className="card-desc pl-4 text-sm text-[#0F172A]/60 leading-relaxed relative z-10 mb-8">
                {service.desc}
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1E40AF] transition-all duration-500 group-hover:w-full" />

              <div className="absolute bottom-10 z-10">
                <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-[#1E40AF] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Know More
                </span>
              </div>
            </div>
          ))}
        </div>
      </Gutters>

      {selected && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-white/90 backdrop-blur-xl overflow-y-auto"
        >
          <div
            ref={modalContentRef}
            className="max-w-4xl mx-auto px-6 md:px-10 py-24"
          >
            <div className="flex justify-between items-start mb-16 stagger">
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[#1E40AF]/60 mb-4">
                  Department
                </p>
                <h3 className="text-4xl md:text-6xl font-serif text-[#0F172A] leading-tight">
                  {selected.title}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="text-xs tracking-[0.3em] uppercase text-[#1E40AF] border border-[#1E40AF]/20 px-4 py-2 hover:bg-[#1E40AF] hover:text-white transition-all duration-300"
              >
                Close
              </button>
            </div>

            <p className="text-lg text-[#0F172A]/70 leading-relaxed mb-12 max-w-2xl stagger">
              {selected.fullDesc}
            </p>

            <p className="text-xs tracking-[0.4em] uppercase text-[#1E40AF] mb-6 stagger">
              Core Treatments
            </p>

            <div className="space-y-5 mb-16">
              {selected.details.map((item, i) => (
                <div key={i} className="flex items-start gap-3 stagger">
                  <div className="w-2 h-2 bg-[#1E40AF] rounded-full mt-2" />
                  <p className="text-base text-[#0F172A] leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
