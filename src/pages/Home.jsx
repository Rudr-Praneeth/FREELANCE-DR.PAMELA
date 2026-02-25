import React from 'react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Doctors from '../components/Doctors'
import Contact from '../components/Contact'

const Home = () => {
  const doctorData = [
  {
    name: "Dr. Sriram Chandra Damaraju",
    role: "Consultant & Neurosurgeon",
    degrees: "m.ch. (vellore), d.n.b",
    specialty: "Neurosurgery & Neurocritical Care",
    experience: "Neuro Specialist",
    bio: "Specialist in complex neurosurgical procedures and neurocritical care management.",
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
  return (
    <div className='font-sans font-normal text-[14px] leading-[20px] tracking-normal overflow-x-hidden'>
      <Hero />
      <Stats />
      <Services />
      <Doctors data={doctorData}/>
      <Contact />
    </div>
  )
}

export default Home
