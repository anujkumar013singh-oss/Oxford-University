import { Mail, ArrowUp } from 'lucide-react';
import { UNIVERSITY_NAME } from '../constants/content';

function handleScrollTop() {
  window.scroll({ top: 0, behavior: 'smooth' });
}

const LINK_SECTIONS = [
  {
    name: 'Programs',
    items: [
      { name: 'B.Tech', href: '#programs' },
      { name: 'MBBS', href: '#programs' },
      { name: 'MBA', href: '#programs' },
      { name: 'B.Sc', href: '#programs' },
      { name: 'LLB', href: '#programs' },
    ],
  },
  {
    name: 'Quick Links',
    items: [
      { name: 'About', href: '#about' },
      { name: 'Admissions', href: '#admissions' },
      { name: 'Faculty', href: '#faculty' },
      { name: 'Campus', href: '#campus' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    name: 'Resources',
    items: [
      { name: 'Placements', href: '#' },
      { name: 'Scholarships', href: '#' },
      { name: 'Hostel', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'NIRF', href: '#' },
    ],
  },
  {
    name: 'Company',
    items: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Sitemap', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-blue-border bg-white">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-20">
        {/* Top section with brand */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-10 md:py-14">
          <a href="#home" className="flex items-center gap-2">
            <img src="https://png.pngtree.com/png-clipart/20230403/original/pngtree-education-and-college-logo-design-template-png-image_9022986.png" alt="Oxford" className="h-12 w-auto" />
            <span className="font-logo text-blue-primary text-2xl leading-none">{UNIVERSITY_NAME}</span>
          </a>
          <p className="font-body text-xs text-[#64748B] leading-relaxed md:max-w-md text-center md:text-left">
            Empowering the next generation of leaders through world-class education since 1974.
          </p>
        </div>

        <div className="h-px bg-blue-border" />

        {/* Links grid */}
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LINK_SECTIONS.map((section) => (
              <div key={section.name}>
                <h4 className="font-body font-semibold text-sm text-[#0F172A] mb-4">{section.name}</h4>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="font-body text-sm text-[#64748B] hover:text-blue-primary transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-blue-border" />

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6">
          <div className="flex items-center gap-4">
            <a href="mailto:admissions@university.edu" className="p-2.5 rounded-xl border border-blue-border text-blue-primary hover:bg-blue-light transition-colors">
              <Mail size={16} strokeWidth={1.5} />
            </a>
          </div>

          {/* Scroll to top */}
          <div className="flex items-center rounded-full border border-blue-border">
            <button onClick={handleScrollTop} className="p-2.5 text-blue-primary hover:bg-blue-light rounded-full transition-colors">
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>

          <button className="p-2.5 rounded-full bg-blue-primary text-white hover:bg-blue-dark transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
        </div>

        {/* Copyright */}
        <div className="pb-6 text-center">
          <p className="font-body text-xs text-[#64748B]">
            &copy; {new Date().getFullYear()} {UNIVERSITY_NAME}. Made with <span className="text-red-500 inline-block animate-pulse">&#9829;</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
