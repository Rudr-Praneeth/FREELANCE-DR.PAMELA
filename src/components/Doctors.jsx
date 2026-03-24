import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctorData = [
  {
    name: "Dr. D. Pushpalatha",
    role: "Obstetrician & Gynaecologist",
    degrees: "M.D.",
    specialty: "Women's Health & Maternity Care",
    experience: "Senior Consultant",
    bio: "Specialist in comprehensive maternity care and women's health, guiding patients through every stage with expertise and warmth.",
    image: "Pushpalatha.jpeg",
    color: "#9D174D",
    accent: "#FCE7F3",
    tag: "Women's Health",
    credentials: [
      "M.D. in Obstetrics & Gynaecology",
      "Senior Consultant, Lakshmi Hospital",
    ],
    narrative: `Dr. D. Pushpalatha is a Senior Consultant specialising in Obstetrics and Gynaecology, bringing years of dedicated practice in women's health and maternity care.`,
    extended: `Her expertise spans both routine and high-risk obstetric cases, and she approaches each patient with a commitment to preventative care and long-term wellness. Dr. Pushpalatha believes that women's health is not a speciality in isolation  it is foundational to the health of families and communities.\n\nAt Lakshmi Hospital, she provides a space where women feel heard, respected, and supported through every phase of their health journey.`,
  },
  {
    name: "Dr. Sriram Chandra Damaraju",
    role: "Consultant Neurosurgeon",
    degrees: "M.Ch. (Vellore) · D.N.B",
    specialty: "Neurosurgery & Neurocritical Care",
    experience: "Neuro Specialist",
    bio: "Specialist in complex neurosurgical procedures and neurocritical care management.",
    image: "M3.jpg.jpeg",
    color: "#1E3A8A",
    accent: "#BFDBFE",
    tag: "Neurosurgery",
    credentials: [
      "M.B.B.S.",
      "Master in Chirurgie (M.Ch.) in Neurosurgery",
      "Christian Medical College, Vellore",
    ],
    narrative: `Dr. Sriram Chandra Damaraju completed both his M.B.B.S. and his Master in Chirurgie (M.Ch.) in Neurosurgery from one of India's most prestigious institutions  Christian Medical College, Vellore.`,
    extended: `His deep interest in neuro-rehabilitation is not incidental  it is a natural extension of his belief that surgical excellence must be followed through with thoughtful recovery. Surgery restores possibility; rehabilitation restores life.\n\nAs co-founder of Lakshmi Hospital and Research Centre, Dr. Damaraju has built a specialised healthcare environment committed to providing holistic neurological services at affordable cost  ensuring that a smooth and dignified process to wellness is available to every patient who walks through their doors.`,
  },
  {
    name: "Dr. Pamela Narayan",
    role: "Consultant Physiotherapist",
    degrees: "B.P.T. (Vellore) · M.Sc. (London)",
    specialty: "Neurological Rehabilitation & Obstetric Physiotherapy",
    experience: "Senior Consultant",
    bio: "Expert in neurological rehabilitation, movement disorders, and obstetric physiotherapy with international training.",
    image: "Pamela.jpeg",
    color: "#0F766E",
    accent: "#CCFBF1",
    tag: "Rehabilitation",
    credentials: [
      "B.P.T., Christian Medical College, Vellore",
      "M.Sc. Neurophysiotherapy, University of East London (1997)",
      "Certificate in Neurological Rehabilitation, University of Newcastle, UK",
    ],
    narrative: `Pamela Narayan holds a Bachelor in Physiotherapy from Christian Medical College, Vellore  one of India's foremost medical institutions. She went on to complete her M.Sc. in Neurophysiotherapy from the University of East London in 1997, bringing international rigour to her practice.`,
    extended: `Most recently, she completed a Certificate Course in Neurological Rehabilitation awarded by the University of Newcastle, UK  a testament to her commitment to staying at the forefront of her field.\n\nBeyond neurological disorders, Pamela brings specialised experience in obstetric physiotherapy, supporting women through the physical demands of pregnancy and recovery.\n\nShe is a proud member of the Physiotherapy Committee of the World Federation of Haemophilia, where she remains an active and valued contributor  bridging the worlds of physiotherapy and haematological care with both expertise and dedication.`,
  },
];

export default function TestimonialSlider({ data = doctorData }) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const modalContentRef = useRef(null);

  const [activeDoctor, setActiveDoctor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data.length) return;

    const ctx = gsap.context(() => {
      const totalSlides = data.length;

      gsap.to(sliderRef.current, {
        x: () => -(sliderRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerWidth * totalSlides}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          // markers: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalSlides - 1));
            setCurrentIndex(idx);
          },
        },
      });

      Array.from(sliderRef.current.children).forEach((slide) => {
        gsap.fromTo(
          slide.querySelectorAll(".reveal-item"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
          },
        );
      });
    }, sectionRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => ctx.revert();
  }, [data.length]);

  const openModal = (doctor) => setActiveDoctor(doctor);

  useEffect(() => {
    if (!activeDoctor || !modalRef.current) return;
    document.body.style.overflow = "hidden";

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(modalRef.current, { y: "100%", opacity: 0 });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(modalRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.7,
      ease: "power4.out",
    });

    if (modalContentRef.current) {
      const items = modalContentRef.current.querySelectorAll(".modal-reveal");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeDoctor]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power4.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      delay: 0.1,
      onComplete: () => {
        document.body.style.overflow = "auto";
        setActiveDoctor(null);
      },
    });
  };

  if (!data.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .slide-track { will-change: transform; }
        .card-image-wrap { position: relative; overflow: hidden; border-radius: 20px; }
        .card-image-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(160deg, transparent 40%, rgba(15,23,42,0.18) 100%); border-radius: 20px; }
        .card-image-wrap img { transition: transform 0.8s ease; }
        .card-image-wrap:hover img { transform: scale(1.04); }
        .know-more-btn { position: relative; overflow: hidden; letter-spacing: 0.08em; }
        .dot-indicator { transition: all 0.4s ease; }
        .modal-bg-pattern { position: absolute; inset: 0; opacity: 0.025; background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
        .credential-chip { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 999px; font-size: 13px; line-height: 1.5; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
      `}</style>
      <div id="doctors"></div>
      <section
        ref={sectionRef}
        className="relative overflow-hidden font-body bg-gradient-to-t from-[#F8FAFC] to-[#E0F2FE]"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="flex flex-col items-center text-center px-4"
          style={{
            paddingTop: "clamp(80px, 12vh, 120px)",
            paddingBottom: "clamp(24px, 4vh, 40px)",
          }}
        >
          <span className="font-body text-[10px] tracking-[0.55em] text-slate-400 uppercase font-medium">
            Our Professionals
          </span>
          <h2 className=" text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
            Our <span className="italic text-[#1E40AF]">Doctors</span>
          </h2>
        </div>

        <div
          ref={sliderRef}
          className="slide-track flex"
          style={{ width: `${data.length * 100}vw` }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ width: "100vw", padding: "0 5vw" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full max-w-6xl mx-auto">
                <div
                  className="reveal-item card-image-wrap mx-auto md:mx-0"
                  style={{
                    width: "min(320px, 80vw)",
                    height: "min(400px, 65vw)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "20px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      zIndex: 2,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      padding: "7px 14px",
                    }}
                  >
                    <span
                      className="font-body text-xs font-medium"
                      style={{ color: item.color, letterSpacing: "0.08em" }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="text-center md:text-left space-y-4">
                  <div className="reveal-item">
                    <h2 className="font-display text-3xl md:text-4xl text-slate-800 leading-tight">
                      {item.name}
                    </h2>
                    <p
                      className="font-body text-sm font-medium mt-1"
                      style={{ color: item.color, letterSpacing: "0.1em" }}
                    >
                      {item.role}
                    </p>
                    <p className="font-body text-xs text-slate-400 mt-0.5 tracking-wide">
                      {item.degrees}
                    </p>
                  </div>

                  <div
                    className="reveal-item h-px w-12 mx-auto md:mx-0"
                    style={{ background: item.color, opacity: 0.3 }}
                  />

                  <div className="reveal-item">
                    <p className="text-sm text-slate-500">{item.specialty}</p>
                  </div>

                  <div className="reveal-item relative pl-5 md:pl-6">
                    <span
                      className="font-display absolute -left-1 top-0 text-5xl leading-none"
                      style={{ color: item.color, opacity: 0.2 }}
                    >
                      "
                    </span>
                    <p className="font-display text-lg md:text-xl text-slate-700 leading-relaxed italic">
                      {item.bio}
                    </p>
                  </div>

                  <div className="reveal-item pt-2">
                    <button
                      onClick={() => openModal(item)}
                      className="relative know-more-btn font-body text-sm font-medium px-7 py-3 rounded-full transition-all duration-300 overflow-hidden group"
                      style={{
                        background: item.color,
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: `0 4px 20px ${item.color}40`,
                      }}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
                        View Full Profile
                      </span>
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(120deg, ${item.color} 0%, #ffffff33 50%, ${item.color} 100%)`,
                        }}
                      ></span>
                      <span
                        className="absolute inset-0 rounded-full transition-transform duration-500 scale-0 group-hover:scale-110"
                        style={{
                          border: `2px solid ${item.color}`,
                        }}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {data.map((item, i) => (
            <div
              key={i}
              className="dot-indicator rounded-full"
              style={{
                width: currentIndex === i ? 24 : 8,
                height: 8,
                background:
                  currentIndex === i ? data[currentIndex]?.color : "#CBD5E1",
              }}
            />
          ))}
        </div>
      </section>

      {activeDoctor && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{
            background: "rgba(2,8,23,0.72)",
            backdropFilter: "blur(6px)",
          }}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative w-full overflow-hidden top-15"
            style={{ height: "100vh", background: "#FAFAFA" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-bg-pattern"
              style={{ color: activeDoctor.color }}
            />

            <div
              ref={modalContentRef}
              className="modal-scroll h-full overflow-y-auto"
            >
              <div className="max-w-5xl mx-auto px-8 md:px-14 pt-14 pb-24 space-y-10">
                <div className="modal-reveal flex items-start justify-between">
                  <div>
                    <span
                      className="font-body text-xs font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{
                        background: activeDoctor.accent,
                        color: activeDoctor.color,
                      }}
                    >
                      {activeDoctor.tag}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl text-slate-800 leading-tight mt-4">
                      {activeDoctor.name}
                    </h2>
                    <p
                      className="font-body text-sm font-medium mt-2 tracking-widest uppercase"
                      style={{ color: activeDoctor.color }}
                    >
                      {activeDoctor.role}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="font-body text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none ml-4 mt-1 flex-shrink-0"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div
                  className="modal-reveal h-px w-full"
                  style={{
                    background: `linear-gradient(to right, ${activeDoctor.color}60, transparent)`,
                  }}
                />

                <div className="modal-reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: activeDoctor.accent + "80" }}
                  >
                    <p className="font-body text-xs text-slate-400 uppercase tracking-widest mb-2">
                      Specialisation
                    </p>
                    <p className="font-body text-base text-slate-700 font-medium">
                      {activeDoctor.specialty}
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: activeDoctor.accent + "80" }}
                  >
                    <p className="font-body text-xs text-slate-400 uppercase tracking-widest mb-2">
                      Qualifications
                    </p>
                    <p className="font-display text-lg text-slate-700">
                      {activeDoctor.degrees}
                    </p>
                  </div>
                </div>

                <div className="modal-reveal space-y-3">
                  <p className="font-body text-sm text-slate-400 tracking-widest uppercase">
                    Academic & Professional Formation
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {activeDoctor.credentials.map((c, i) => (
                      <span
                        key={i}
                        className="credential-chip font-body"
                        style={{
                          background: activeDoctor.accent,
                          color: activeDoctor.color,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-reveal space-y-4">
                  <p className="font-body text-sm text-slate-400 tracking-widest uppercase">
                    Profile
                  </p>
                  <p className="font-body text-[15px] leading-[1.85] text-slate-600">
                    {activeDoctor.narrative}
                  </p>
                  {activeDoctor.extended.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="font-body text-[15px] leading-[1.85] text-slate-600"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="modal-reveal">
                  <div className="rounded-2xl px-8 py-4 border-2 border-slate-200">
                    <p className="font-body text-xs text-slate-400 uppercase tracking-widest ">
                      Lakshmi Hospital & Research Centre
                    </p>
                    <p className="font-display text-lg italic text-slate-700 leading-relaxed">
                      Providing holistic neurological services at affordable
                      cost every patient's journey to wellness is our shared
                      mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
