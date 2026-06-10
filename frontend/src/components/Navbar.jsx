import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TABS = ['Home', 'Programs', 'About', 'Admissions', 'Contact'];

const Tab = forwardRef(function Tab({ children, setPosition, onClick }, ref) {
  const handleMouseEnter = (e) => {
    const el = e.currentTarget;
    const { width } = el.getBoundingClientRect();
    setPosition({ left: el.offsetLeft, width, opacity: 1 });
  };
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs uppercase text-white mix-blend-difference font-body font-medium"
    >
      {children}
    </li>
  );
});

const Cursor = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-7 rounded-full bg-blue-primary"
  />
);

function MobileMenu({ onNavClick }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="md:hidden text-[#0F172A] p-1" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 top-16 bg-white z-40 flex flex-col items-center justify-center gap-6 border-t border-blue-border md:hidden">
          {TABS.map((tab, i) => {
            const href = i === 0 ? '#home' : `#${tab.toLowerCase()}`;
            return (
              <a key={tab} href={href} onClick={(e) => { e.preventDefault(); onNavClick(href, i); setOpen(false); }}
                className="font-body text-xl font-medium text-[#0F172A] hover:text-blue-primary"
              >
                {tab}
              </a>
            );
          })}
          <a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('#contact', 4); setOpen(false); }}
            className="mt-4 px-8 py-3 bg-blue-primary text-white font-body font-semibold rounded-full text-lg"
          >
            Apply Now
          </a>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef([]);

  useEffect(() => {
    const el = tabsRef.current[selected];
    if (el) {
      const { width } = el.getBoundingClientRect();
      setPosition({ left: el.offsetLeft, width, opacity: 1 });
    }
  }, [selected]);

  useEffect(() => {
    const ids = ['home', 'programs', 'about', 'admissions', 'contact'];
    const observers = ids.map((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSelected(i); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavClick = (href, i) => {
    setSelected(i);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-blue-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 h-16 flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home', 0); }} className="flex items-center gap-2">
          <img src="https://png.pngtree.com/png-clipart/20230403/original/pngtree-education-and-college-logo-design-template-png-image_9022986.png" alt="Oxford" className="h-10 w-auto" />
          <span className="font-logo text-blue-primary text-lg leading-none">Oxford</span>
        </a>

        <ul
          onMouseLeave={() => {
            const el = tabsRef.current[selected];
            if (el) {
              const { width } = el.getBoundingClientRect();
              setPosition({ left: el.offsetLeft, width, opacity: 1 });
            }
          }}
          className="relative hidden md:flex items-center rounded-full border border-blue-border bg-white p-1"
        >
          {TABS.map((tab, i) => {
            const href = i === 0 ? '#home' : `#${tab.toLowerCase()}`;
            return (
              <Tab
                key={tab}
                ref={(el) => (tabsRef.current[i] = el)}
                setPosition={setPosition}
                onClick={() => handleNavClick(href, i)}
              >
                {tab}
              </Tab>
            );
          })}
          <Cursor position={position} />
        </ul>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact', 4); }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-blue-primary text-white font-body font-semibold rounded-full hover:bg-blue-dark transition-colors text-sm"
        >
          Apply Now <ArrowRight size={14} strokeWidth={1.5} />
        </a>

        <MobileMenu onNavClick={handleNavClick} />
      </div>
    </nav>
  );
}
