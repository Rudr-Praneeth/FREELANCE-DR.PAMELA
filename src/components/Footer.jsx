import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Gutters from "../layouts/Gutters";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    specialties: [
      "Neurology & Neurosurgery",
      "Rehabilitation",
      "Obstetrics & Gynaecology",
    ],
    patientCare: [
      "Satisfied Patients",
      "4.7 Google Ratings",
      "Qualified Staff",
      "Award Achieved",
    ],
  };

  return (
    <footer className="bg-white pt-24 pb-12 text-black border-t border-black/10 font-sans">
      <Gutters>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xl md:text-2xl font-bold tracking-tight leading-tight max-w-xs">
              LAKSHMI HOSPITAL <br />
              <span className="text-black/50 font-medium italic">
                & RESEARCH CENTRE
              </span>
            </div>

            <p className="text-black/60 text-sm leading-relaxed max-w-sm">
              Lakshmi Hospital & Research Centre’s mission is to provide
              personalized, high-quality care on an as-needed or preventative
              basis. We have created a practice that we believe in and choose
              for our own family members.
            </p>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-black/60 transition-all duration-300 hover:border-[#4292C7] hover:text-[#4292C7] hover:bg-[#4292C7]/5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="lg:col-span-2">
            <h4 className="text-black text-sm uppercase tracking-[0.25em] font-bold mb-6">
              Specialties
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.specialties.map((link) => (
                <li key={link}>
                  <span className="text-black/60 text-sm">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-black text-sm uppercase tracking-[0.25em] font-bold mb-6">
              Resources
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/biomedical-waste"
                  className="group flex items-center text-black/60 text-sm transition-all duration-300 hover:text-[#4292C7]"
                >
                  <span className="relative">
                    Biomedical Waste Management
                    <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#FFCA08] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>

              {footerLinks.patientCare.map((link) => (
                <li key={link}>
                  <span className="text-black/60 text-sm">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div className="lg:col-span-3 lg:text-right flex flex-col lg:items-end">
            <h4 className="text-black text-sm uppercase tracking-[0.25em] font-bold mb-6">
              Emergency
            </h4>

            <div className="space-y-1 mb-6">
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-semibold">
                24/7 Trauma Care
              </p>

              <a
                href="tel:9390716980"
                className="text-2xl font-bold text-[#4292C7] hover:text-[#FFCA08] transition-all duration-300 block"
              >
                +91-9390716980
              </a>
            </div>

            <div className="text-sm text-black/60 space-y-1 font-medium">
              3-6-191/1/1, Urdu Hall Gulley, AP State Housing Board,
              Himayatnagar, Hyderabad, Telangana 500029
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black/50 text-[10px] tracking-[0.4em] font-medium uppercase">
            © {currentYear} Lakshmi Hospital & Research Centre
          </p>
        </div>
      </Gutters>
    </footer>
  );
};

export default Footer;
