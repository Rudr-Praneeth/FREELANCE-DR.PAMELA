import React from "react";
import Gutters from "../layouts/Gutters";
import "../App.css";

const AboutBento = () => {
  return (
    <section
      id="about"
      className="relative py-12 lg:py-20 bg-white overflow-hidden"
    >
      <Gutters>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
          <div className="max-w-2xl group">
            <p className="text-[11px] tracking-[0.5em] uppercase text-[#1E40AF] font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#1E40AF] transition-all duration-500 group-hover:w-12" /> Since 1999
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#0F172A] leading-[0.9] tracking-tight transition-transform duration-500 group-hover:translate-x-2">
              Pioneering <br />
              <span className="italic text-[#1E40AF]">
                Health Care
              </span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm text-[#0F172A]/50 leading-relaxed uppercase tracking-wider">
              Specialized treatment for complex neurological conditions and recovery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[200px] md:auto-rows-[240px] gap-4">
          
          <div className="col-span-1 md:col-span-6 row-span-2 bg-[#F8FAFC] p-6 lg:p-10 flex flex-col justify-end relative overflow-hidden group hover:bg-[#F1F5F9] transition-colors duration-500">
            <div className="absolute top-6 right-6 w-16 h-16 border border-[#1E40AF]/10 rounded-full flex items-center justify-center group-hover:rotate-45 group-hover:border-[#1E40AF]/30 transition-all duration-700 ease-out">
               <span className="text-[#1E40AF] text-[10px] font-bold tracking-tighter">EST. 99</span>
            </div>
            <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <h3 className="text-2xl font-serif text-[#0F172A] mb-6 max-w-md">
                Bridging the gap between acute injury and independent living.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#0F172A]/70 text-sm leading-relaxed">
                <p>
                  Founded by two visionary neuro-specialists, we provide the environment needed to relearn essential life skills.
                </p>
                <p>
                  From mobility to cognitive speech, our facility is engineered for high-performance neurological rehabilitation.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 row-span-1 bg-[#1E40AF] p-6 flex flex-col justify-between group hover:bg-[#1e3a8a] transition-colors duration-500">
            <div className="flex justify-between items-start">
              <span className="text-[10px] tracking-widest text-white/50 uppercase font-bold group-hover:text-white/80 transition-colors duration-300">Mission</span>
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] group-hover:scale-150 transition-transform duration-500" />
            </div>
            <p className="text-white text-lg font-medium leading-tight transition-transform duration-500 group-hover:translate-x-1">
              Personalized, affordable care through clinical excellence and family involvement.
            </p>
          </div>

          <div className="col-span-1 md:col-span-6 row-span-2 rounded-xl relative overflow-hidden group">
            <img
              src="/1.JPG"
              alt="Neurological Excellence"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 transition-transform duration-500 group-hover:-translate-y-2">
              <p className="text-white font-serif text-xl">Relearn. Recover.</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 row-span-1 bg-[#E0F2FE] p-6 flex flex-col justify-between group hover:bg-[#bae6fd] transition-colors duration-500">
             <span className="text-[10px] tracking-widest text-[#1E40AF] uppercase font-bold group-hover:tracking-[0.25em] transition-all duration-500">Vision</span>
             <p className="text-[#0F172A] text-xl font-serif leading-tight">
               Global standards in <span className="text-[#1E40AF]">neuro health</span>
             </p>
          </div>

          <div className="col-span-1 md:col-span-3 row-span-1 relative rounded-xl overflow-hidden group">
            <img
              src="/2.JPG"
              alt="Advanced Facility"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/20 transition-colors duration-500" />
          </div>

          <div className="col-span-1 md:col-span-6 row-span-1 bg-[#0F172A] p-8 flex flex-col justify-center">
             <div className="grid grid-cols-2 gap-y-6 gap-x-4">
               {["Empathy", "Transparency", "Excellence", "Affordability"].map((usp, i) => (
                 <div key={i} className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-4 h-px bg-[#38BDF8] group-hover:w-10 group-hover:bg-white transition-all duration-300 ease-out" />
                   <span className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-white group-hover:translate-x-1 transition-transform duration-300 ease-out">{usp}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="col-span-1 md:col-span-3 row-span-1 relative rounded-xl overflow-hidden group">
            <img
              src="/3.JPG"
              alt="Patient Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/20 transition-colors duration-500" />
          </div>

          <div className="col-span-1 md:col-span-3 row-span-1 relative rounded-xl overflow-hidden group">
            <img
              src="/4.JPG"
              alt="Medical Team"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/20 transition-colors duration-500" />
          </div>

          <div className="col-span-1 md:col-span-12 row-span-1 relative rounded-xl overflow-hidden group">
            <img
              src="/5.JPG"
              alt="Innovation"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#1E40AF]/20 group-hover:bg-[#1E40AF]/40 transition-colors duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
               <h4 className="text-white text-3xl md:text-5xl font-serif italic tracking-tighter opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out">
                 Research Driven Excellence
               </h4>
            </div>
          </div>

        </div>
      </Gutters>
    </section>
  );
};

export default AboutBento;