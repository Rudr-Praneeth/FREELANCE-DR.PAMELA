import React from 'react';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import Gutters from '../layouts/Gutters';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    specialties: [
      "Cardiology & Cardiac Surgery",
      "Urology & Nephrology",
      "Obstetrics & Gynaecology",
      "Pediatrics & Neonatology",
      "Critical Care & Pulmonology"
    ],
    patientCare: [
      "Insurance & TPA Partners",
      "Dr. YSR Aarogyasri Scheme",
      "Health Check-up Packages",
      "24/7 Pharmacy & Ambulance",
      "NABH Quality Standards"
    ]
  };

  return (
    <footer className="bg-[#0D0D0D] pt-24 pb-12 text-[#F5F5F6] border-t border-white/5 font-sans">
      <Gutters>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-20">
          
          {/* Brand Block - 5 Cols for the long name */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xl md:text-2xl font-bold tracking-tighter font-sans leading-tight max-w-xs">
              LAKSHMI HOSPITAL <br /> 
              <span className="text-[#F5F5F6]/50 font-medium italic">& RESEARCH CENTRE</span>
            </div>
            <p className="text-[#7E878E] text-sm leading-relaxed max-w-sm">
              A premiere multi-specialty tertiary care hospital in East Godavari, 
              dedicated to integrating clinical excellence with the latest technology since 1982.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: <Facebook size={16} />, link: "#" },
                { icon: <Instagram size={16} />, link: "#" },
                { icon: <Linkedin size={16} />, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#7E878E] transition-all duration-300 hover:border-[#F5F5F6] hover:text-[#F5F5F6] hover:shadow-[0_0_10px_rgba(245,245,246,0.1)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Specialties - 2.5 Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-[#F5F5F6] text-sm uppercase tracking-[0.25em] font-bold mb-6">Specialties</h4>
            <ul className="space-y-1.5">
              {footerLinks.specialties.map((link) => (
                <li key={link}>
                  <a href="#" className="group flex items-center text-[#7E878E] text-sm transition-all duration-300 hover:text-[#F5F5F6]">
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#F5F5F6] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Care - 2.5 Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-[#F5F5F6] text-sm uppercase tracking-[0.25em] font-bold mb-6">Patient Care</h4>
            <ul className="space-y-1.5">
              {footerLinks.patientCare.map((link) => (
                <li key={link}>
                  <a href="#" className="group flex items-center text-[#7E878E] text-sm transition-all duration-300 hover:text-[#F5F5F6]">
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#F5F5F6] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - 2.5 Cols */}
          <div className="lg:col-span-3 lg:text-right flex flex-col lg:items-end">
            <h4 className="text-[#F5F5F6] text-sm uppercase tracking-[0.25em] font-bold mb-6">Emergency</h4>
            <div className="space-y-1 mb-6">
              <p className="text-[#7E878E] text-[10px] uppercase tracking-[0.3em] font-semibold">24/7 Trauma Care</p>
              <a href="tel:08842376666" className="text-2xl font-sans font-bold text-[#F5F5F6] hover:tracking-wider transition-all duration-500 block">
                0884-2376666
              </a>
            </div>
            <div className="text-sm text-[#7E878E] space-y-1 font-medium">
              <p>Srinagar, Kakinada</p>
              <p>Andhra Pradesh, 533003</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#7E878E] text-[10px] tracking-[0.4em] font-medium uppercase">
            © {currentYear} Lakshmi Hospital & Research Centre
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.4em] font-medium uppercase text-[#7E878E]">
            <a href="#" className="hover:text-[#F5F5F6] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F5F5F6] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F5F5F6] transition-colors flex items-center gap-1.5 group">
              NABH ACCREDITED <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </Gutters>
    </footer>
  );
};

export default Footer;