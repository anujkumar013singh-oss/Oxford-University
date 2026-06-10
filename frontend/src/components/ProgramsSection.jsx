import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, Briefcase, Clock, BookOpen } from 'lucide-react';
import { PROGRAMS } from '../constants/content';

const CATEGORY_COLORS = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-violet-500 to-violet-600',
  'from-amber-500 to-amber-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
  'from-orange-500 to-orange-600',
  'from-teal-500 to-teal-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
  'from-lime-500 to-lime-600',
  'from-red-500 to-red-600',
  'from-purple-500 to-purple-600',
  'from-sky-500 to-sky-600',
  'from-fuchsia-500 to-fuchsia-600',
];

export default function ProgramsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.program-card');
    if (!els?.length) return;
    gsap.set(els, { y: 40, opacity: 0, scale: 0.95 });
    const anim = gsap.to(els, {
      y: 0, opacity: 1, scale: 1,
      stagger: 0.06,
      duration: 0.7,
      ease: 'power3.out',
      paused: true,
    });
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { anim.play(); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-[#F8FAFC] py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs text-blue-primary uppercase tracking-widest mb-4">Academic Programs</p>
          <h2 className="font-heading font-bold text-[#0F172A] text-4xl lg:text-5xl leading-tight">
            Choose Your Path
          </h2>
          <p className="font-body text-[#64748B] mt-4 leading-relaxed">
            Industry-aligned curricula designed for tomorrow&apos;s careers. Every program includes hands-on projects and internship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROGRAMS.map((p, i) => (
            <div
              key={i}
              className="program-card group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`} />

              <div className="p-5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-blue-primary font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-light">
                    {p.code}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="font-body text-xs font-semibold text-[#0F172A]">{p.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-2 leading-snug group-hover:text-blue-primary transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="font-body text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">
                  {p.desc}
                </p>

                {/* Placement + Duration row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                    <Briefcase size={11} className="text-emerald-500" />
                    <span className="font-body text-[10px] font-semibold">{p.placements}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <Clock size={11} />
                    <span className="font-body text-[10px]">{p.tag}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 border-t border-gray-50 pt-3">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="font-body text-[11px] text-[#475569] flex items-center gap-2">
                      <BookOpen size={10} className="text-blue-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover shine overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(30,64,175,0.03) 0%, transparent 50%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
