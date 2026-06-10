import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { STATS } from '../constants/content';

export default function StatsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.stat-item');
    if (!items?.length) return;
    gsap.set(items, { y: 20, opacity: 0 });
    const anim = gsap.to(items, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out', paused: true });

    const numEls = sectionRef.current.querySelectorAll('.stat-num');
    const counters = [];
    numEls.forEach((el) => {
      const target = Number(el.dataset.value);
      const obj = { val: 0 };
      const c = gsap.to(obj, { val: target, duration: 2, ease: 'power2.out', paused: true, onUpdate() { el.textContent = Math.round(obj.val).toLocaleString('en-IN'); } });
      counters.push(c);
    });

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { anim.play(); counters.forEach((c) => c.play()); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0F172A] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item text-center">
              <div className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                <span
                  className="stat-num"
                  data-value={s.value}
                >
                  0
                </span>
                {s.suffix}
              </div>
              <p className="font-body text-sm text-white/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
