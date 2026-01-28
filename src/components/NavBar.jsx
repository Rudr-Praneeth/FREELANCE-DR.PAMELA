import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', hash: '#home' },
    { name: 'Services', hash: '#services' },
    { name: 'Doctors', hash: '#doctors' },
    { name: 'Contact Us', hash: '#contact-us' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 
      ${scrolled ? 'py-4' : 'py-8'}`}>
      
      <div className={`absolute inset-0 -z-10 transition-opacity duration-500 
        ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex flex-col cursor-pointer group">
          <span className="text-sm md:text-lg font-bold tracking-tighter text-white leading-none">
            LAKSHMI HOSPITAL
          </span>
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#7E878E] group-hover:text-[#F5F5F6] transition-colors">
            & RESEARCH CENTRE
          </span>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              className="group relative text-[13px] font-medium uppercase tracking-widest text-[#7E878E] transition-all duration-300 hover:text-[#F5F5F6]"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#F5F5F6] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <button className="group relative h-10 w-32 overflow-hidden rounded-full border border-white/10 bg-transparent text-[11px] uppercase tracking-widest font-bold text-white transition-all duration-500 hover:border-[#F5F5F6] hover:shadow-[0_0_20px_rgba(245,245,246,0.2)]">
            <div className="relative flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:-translate-x-2">
              <span>Connect</span>
              <span className="absolute right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </div>
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <div className={`h-[1px] w-6 bg-white transition-all duration-500 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`h-[1px] w-6 bg-white transition-all duration-500 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#0D0D0D] transition-all duration-700 ease-in-out lg:hidden
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.hash}
            className="text-3xl font-serif italic text-[#7E878E] hover:text-[#F5F5F6] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;