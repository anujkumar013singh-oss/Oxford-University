import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ImageSlider from './ImageSlider';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(badgeRef.current, { opacity: 0, y: 15, duration: 0.5 })
        .from(headingRef.current.children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.2')
        .from(paraRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
        .from(sliderRef.current, { x: 80, opacity: 0, duration: 0.9 }, '-=0.5');
    });
    return () => ctx.revert();
  }, []);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={sectionRef} className="min-h-screen bg-white flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-64px)] py-12">
          <div className="lg:col-span-5">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-light border border-blue-border mb-6">
              <span className="font-mono text-xs text-blue-primary">Ranked #1 in India 2024</span>
            </div>

            <h1 ref={headingRef} className="font-heading font-black leading-[1.1]">
              <span className="block text-[#0F172A]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Shape Your</span>
              <span className="block text-blue-primary" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Future With</span>
              <span className="block text-[#0F172A]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Excellence</span>
            </h1>

            <p ref={paraRef} className="font-body text-base text-[#64748B] max-w-[440px] mt-4 leading-relaxed">
              Join 15,000+ students building world-class careers across engineering, medicine, business, and arts.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => handleScroll('#programs')}
                className="px-6 py-3 bg-blue-primary text-white font-body font-semibold rounded-lg hover:bg-blue-dark transition-colors text-sm">
                Apply Now
              </button>
              <button onClick={() => handleScroll('#programs')}
                className="px-6 py-3 border-2 border-blue-primary text-blue-primary font-body font-semibold rounded-lg hover:bg-blue-light transition-colors text-sm">
                Explore Programs
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6 font-body text-xs text-[#64748B]">
              <span>NAAC A++</span>
              <span className="text-blue-border">·</span>
              <span>95% Placement</span>
              <span className="text-blue-border">·</span>
              <span>Est. 1996</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center lg:justify-end" ref={sliderRef}>
            <ImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
