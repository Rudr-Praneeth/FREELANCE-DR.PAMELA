import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", to: "/#home" },
    { name: "Services", to: "/#services" },
    { name: "Doctors", to: "/#doctors" },
    { name: "About", to: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 
      ${scrolled ? "py-4" : "py-8"}`}
    >
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 
        ${scrolled ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/90 backdrop-blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E40AF]/20 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <HashLink smooth to="/#home" className="flex items-center gap-2 cursor-pointer group">
          <img
            src="/logo.jpeg"
            alt="Lakshmi Hospital Logo"
            className="h-6 md:h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-bold tracking-tighter text-[#1E40AF] leading-none">
              LAKSHMI HOSPITAL
            </span>
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#0F172A]/60 group-hover:text-[#0EA5A4] transition-colors">
              & RESEARCH CENTRE
            </span>
          </div>
        </HashLink>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.to.includes("#") ? (
              <HashLink
                smooth
                key={link.name}
                to={link.to}
                className="group relative text-[13px] font-medium uppercase tracking-widest text-[#0F172A]/60 transition-all duration-300 hover:text-[#0EA5A4]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
              </HashLink>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="group relative text-[13px] font-medium uppercase tracking-widest text-[#0F172A]/60 transition-all duration-300 hover:text-[#0EA5A4]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <HashLink
            smooth
            to="/#contact"
            className="group relative h-10 w-32 overflow-hidden rounded-full border border-[#1E40AF]/20 bg-transparent text-[11px] uppercase tracking-widest font-bold text-[#1E40AF] transition-all duration-500 hover:border-[#0EA5A4] hover:shadow-[0_0_20px_rgba(14,165,164,0.2)] flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:-translate-x-2">
              <span>Contact</span>
              <span className="absolute right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </div>
          </HashLink>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <div
            className={`h-[1px] w-6 bg-[#1E40AF] transition-all duration-500 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <div
            className={`h-[1px] w-6 bg-[#1E40AF] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <div
            className={`h-[1px] w-6 bg-[#1E40AF] transition-all duration-500 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#F8FAFC] transition-all duration-700 ease-in-out lg:hidden
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {links.map((link) =>
          link.to.includes("#") ? (
            <HashLink
              smooth
              key={link.name}
              to={link.to}
              className="text-3xl font-serif italic text-[#0F172A]/60 hover:text-[#0EA5A4] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </HashLink>
          ) : (
            <Link
              key={link.name}
              to={link.to}
              className="text-3xl font-serif italic text-[#0F172A]/60 hover:text-[#0EA5A4] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;
