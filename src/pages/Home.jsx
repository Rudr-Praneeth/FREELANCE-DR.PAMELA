import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import Contact from "../components/Contact";
import ScrollToTop from "../utils/ScrollToTop"



const Home = () => {
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
        "M.Sc. Neurophysiotherapy, University of East London",
        "Certificate in Neurological Rehabilitation, University of Newcastle, UK",
      ],
      narrative: `Pamela Narayan holds a Bachelor in Physiotherapy from Christian Medical College, Vellore  one of India's foremost medical institutions. She went on to complete her M.Sc. in Neurophysiotherapy from the University of East London in 1997, bringing international rigour to her practice.`,
      extended: `She completed a Certificate Course in Neurological Rehabilitation awarded by the University of Newcastle, UK  a testament to her commitment to staying at the forefront of her field.\n\nBeyond neurological disorders, Pamela brings specialised experience in physiotherapy, supporting women through the physical demands of pregnancy and recovery.\n\nShe is also a leading international resource person for Musculoskeletal issues in Persons with Bleeding Disorders, where she remains an active and valued contributor bridging the worlds of physiotherapy and haematological care with both expertise and dedication.`,
    },
  ];
  return (
    <div className="font-sans font-normal text-[14px] leading-[20px] tracking-normal overflow-x-hidden">
      {/* <ScrollToTop /> */}
      <Hero />
      <Stats />
      <Services />
      <Doctors data={doctorData}/>
      <Contact />
    </div>
  );
};

export default Home;
