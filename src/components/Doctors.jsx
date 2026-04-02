import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function TestimonialSlider({ data }) {
  const trackRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const modalContentRef = useRef(null);
  const autoRef = useRef(null);
  const animating = useRef(false);

  const startX = useRef(0);
  const endX = useRef(0);

  const [activeDoctor, setActiveDoctor] = useState(null);
  const [index, setIndex] = useState(data.length);
  const [hovering, setHovering] = useState(false);
  const currentIndex = index % data.length;

  const loopData = [...data, ...data, ...data];

  const slide = (dir) => {
    clearInterval(autoRef.current);
    if (animating.current) return;
    animating.current = true;

    const next = index + dir;

    gsap.to(trackRef.current, {
  x: `-${next * 100}vw`,
  duration: 1.1,
  ease: "expo.inOut",
  force3D: true,
  onStart: () => {
    gsap.set(trackRef.current, { willChange: "transform" });
  },
  onComplete: () => {
    let finalIndex = next;

    if (next >= data.length * 2) {
      finalIndex = data.length;
    }

    if (next < data.length) {
      finalIndex = data.length * 2 - 1;
    }

    if (finalIndex !== next) {
      gsap.set(trackRef.current, {
        x: `-${finalIndex * 100}vw`,
      });
    }

    setIndex(finalIndex);
    animating.current = false;

    gsap.set(trackRef.current, { willChange: "auto" });
  },
});
  };

  useEffect(() => {
    gsap.set(trackRef.current, {
      x: `-${index * 100}vw`,
    });
  }, []);

  useEffect(() => {
    if (activeDoctor) return;
    autoRef.current = setInterval(() => slide(1), 5000);
    return () => clearInterval(autoRef.current);
  }, [hovering, index, activeDoctor]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - endX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) slide(1);
      else slide(-1);
    }
  };

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
      duration: 0.6,
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
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.2,
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
      duration: 0.45,
      ease: "power4.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
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
      <section className="relative overflow-hidden font-body bg-gradient-to-b from-[#E0F2FE] to-[#F8FAFC] pb-10">
        <div className="flex flex-col items-center text-center px-4 mb-4">
          <div className="flex flex-col items-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#1E40AF]/60">
              EXPERTS
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
            Our <span className="italic text-[#1E40AF]">Doctors</span>
          </h2>
        </div>

        <button
          onClick={() => slide(-1)}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 transition"
        >
          <FiChevronLeft size={24} className="text-[#1E40AF]" />
        </button>

        <button
          onClick={() => slide(1)}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 transition"
        >
          <FiChevronRight size={24} className="text-[#1E40AF]" />
        </button>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ width: `${loopData.length * 100}vw` }}
          >
            {loopData.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: "100vw", padding: "0" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-40 items-center w-full max-w-5xl mx-auto">
                  <div className="w-full h-[400px] md:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        transform: i === index ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif text-[#0F172A]">
                        {item.name}
                      </h2>
                      <p
                        className="text-xs mt-1 tracking-widest"
                        style={{ color: item.color }}
                      >
                        {item.role}
                      </p>
                      <p className="text-xs text-slate-400">{item.degrees}</p>
                    </div>

                    <div
                      className="h-px w-10 mx-auto md:mx-0"
                      style={{ background: item.color, opacity: 0.3 }}
                    />

                    <p className="text-sm text-slate-500 line-clamp-2">
                      {item.specialty}
                    </p>

                    <p className="italic text-base text-slate-700 line-clamp-3">
                      {item.bio}
                    </p>

                    <button
                      onClick={() => openModal(item)}
                      className="px-6 py-2.5 rounded-full text-white text-sm"
                      style={{
                        background: item.color,
                        boxShadow: `0 4px 16px ${item.color}40`,
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (animating.current) return;
                setIndex(data.length + i);
                gsap.to(trackRef.current, {
                  x: `-${(data.length + i) * 100}vw`,
                  duration: 0.8,
                  ease: "expo.inOut",
                });
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6" : "w-2.5 bg-slate-300"
              }`}
              style={
                i === currentIndex ? { backgroundColor: data[i].color } : {}
              }
            />
          ))}
        </div>
      </section>
      {activeDoctor && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[999] flex items-end md:items-center justify-center"
          style={{
            background: "rgba(2,8,23,0.72)",
            backdropFilter: "blur(6px)",
          }}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative w-full h-full max-h-screen overflow-hidden rounded-t-3xl md:rounded-none"
            style={{
              background: "#FAFAFA",
              marginTop: "env(safe-area-inset-top)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-bg-pattern"
              style={{ color: activeDoctor.color }}
            />

            <div
              ref={modalContentRef}
              className="modal-scroll h-full overflow-y-auto pt-14 md:pt-10"
            >
              <div className="max-w-5xl mx-auto px-6 md:px-10 pt-8 pb-16 space-y-6">
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
                    <h2 className="font-display text-2xl md:text-3xl text-slate-800 leading-tight mt-3">
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
                    className="rounded-xl p-4"
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
                    className="rounded-xl p-4"
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
                        className="credential-chip font-body p-1"
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
