import React, {useEffect, useLayoutEffect} from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import Contact from "../components/Contact";
import ScrollToTop from "../utils/ScrollToTop"

const Home = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    return () => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
        }
    };
}, []);
  const doctorData = [
    {
    name: "Dr. D. Pushpalatha",
    role: "obstetrician & gynaecologist",
    degrees: "MD",
    specialty: "Women’s Health & Maternity",
    experience: "Senior Consultant",
    bio: "Specialist in comprehensive maternity care and women's health wellness.",
    image: "Pushpalatha.jpeg",
    details: (
      <ul className="list-disc pl-5 space-y-2 text-[#0F172A]/80">
        <li>Senior Consultant specializing in comprehensive maternity care.</li>
        <li>Focus on women’s health wellness and preventative care.</li>
        <li>Expertise in managing routine and high-risk obstetric cases.</li>
      </ul>
    ),
  },
  {
    name: "Dr. Sriram Chandra Damaraju",
    role: "Consultant & Neurosurgeon",
    degrees: "m.ch. (vellore), d.n.b",
    specialty: "Neurosurgery & Neurocritical Care",
    experience: "Neuro Specialist",
    bio: "Specialist in complex neurosurgical procedures and neurocritical care management.",
    image: "M3.jpg.jpeg",
    details: (
      <ul className="list-disc pl-5 space-y-2 text-[#0F172A]/80">
        <li>Completed M.B.B.S. and Master in Chirurgie (M.Ch.) in Neurosurgery from Christian Medical College, Vellore.</li>
        <li>Specialized focus on Neuro-rehabilitation to complement surgical practice.</li>
        <li>Co-founder of Lakshmi Neuro Centre, established in 1999.</li>
        <li>Expertise in providing holistic neurological services at an affordable cost.</li>
      </ul>
    ),
  },
  {
    name: "Dr. Pamela Narayan",
    role: "Consultant Physiotherapist",
    degrees: "B.P.T. (Vellore), M.Sc. (London)",
    specialty: "Physiotherapy & Rehabilitation",
    experience: "Senior Consultant",
    bio: "Expert in physiotherapy techniques, specializing in rehabilitation, pain management, and mobility restoration.",
    image: "Pamela.jpeg",
    details: (
      <ul className="list-disc pl-5 space-y-2 text-[#0F172A]/80">
        <li>Bachelor in Physiotherapy from Christian Medical College, Vellore.</li>
        <li>M.Sc. in Neuro-physiotherapy from the University of East London (1997).</li>
        <li>Certified in Neurological Rehabilitation by the University of Newcastle, UK</li>
        <li>Specialized experience in treating movement problems and obstetric physiotherapy</li>
        <li>Member of the Physiotherapy Committee, World Federation Haemophilia.</li>
      </ul>
    ),
  },
];
  return (
    <div className="font-sans font-normal text-[14px] leading-[20px] tracking-normal overflow-x-hidden">
      <ScrollToTop />
      <Hero />
      <Stats />
      <Services />
      <Doctors />
      <Contact />
    </div>
  );
};

export default Home;
