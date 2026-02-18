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
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 
      ${scrolled ? "py-4" : "py-8"}`}
    >
      {/* Scroll Background */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 
        ${scrolled ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4292C7]/40 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <HashLink
          smooth
          to="/#home"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src="/logo.jpeg"
            alt="Lakshmi Hospital Logo"
            className="h-6 md:h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-bold tracking-tighter text-black leading-none">
              LAKSHMI HOSPITAL
            </span>
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#4292C7] group-hover:text-black transition-colors">
              & RESEARCH CENTRE
            </span>
          </div>
        </HashLink>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.to.includes("#") ? (
              <HashLink
                smooth
                key={link.name}
                to={link.to}
                className="group relative text-[13px] font-medium uppercase tracking-widest text-black/70 transition-all duration-300 hover:text-[#4292C7]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#4292C7] transition-all duration-300 group-hover:w-full" />
              </HashLink>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="group relative text-[13px] font-medium uppercase tracking-widest text-black/70 transition-all duration-300 hover:text-[#4292C7]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#4292C7] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <HashLink
            smooth
            to="/#contact"
            className="group relative h-10 w-32 overflow-hidden rounded-full border border-black bg-[#4292C7] text-[11px] uppercase tracking-widest font-bold text-white transition-all duration-500 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[#FFCA08] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:-translate-x-2">
              <span className="group-hover:text-black transition-colors duration-300">
                Contact
              </span>
              <span className="absolute right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-black">
                →
              </span>
            </div>
          </HashLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <div
            className={`h-[2px] w-6 bg-black transition-all duration-500 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <div
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`h-[2px] w-6 bg-black transition-all duration-500 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-white transition-all duration-700 ease-in-out lg:hidden
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {links.map((link) =>
          link.to.includes("#") ? (
            <HashLink
              smooth
              key={link.name}
              to={link.to}
              className="text-3xl font-serif italic text-[#4292C7] hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </HashLink>
          ) : (
            <Link
              key={link.name}
              to={link.to}
              className="text-3xl font-serif italic text-[#4292C7] hover:text-black transition-colors"
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
