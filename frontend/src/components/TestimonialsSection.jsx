import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants/content';
import { useEffect, useRef } from 'react';

function TestimonialsColumn({ testimonials, className, duration }) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration: duration || 10, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx}>
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-blue-border bg-white shadow-sm max-w-xs w-full mb-6">
                <p className="font-body text-sm text-[#64748B] leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-4">
                  <img width={40} height={40} src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div className="flex flex-col">
                    <span className="font-body font-medium text-sm text-[#0F172A]">{t.name}</span>
                    <span className="font-body text-xs text-blue-primary">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);

  const firstColumn = TESTIMONIALS.slice(0, 3);
  const secondColumn = TESTIMONIALS.slice(3, 6);
  const thirdColumn = TESTIMONIALS.slice(6, 9);

  return (
    <section ref={sectionRef} className="bg-blue-light/30 py-16 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="font-mono text-xs text-blue-primary px-3 py-1 rounded-full border border-blue-border bg-white inline-block mb-4">Testimonials</span>
          <h2 className="font-heading font-bold text-[#0F172A] text-4xl lg:text-5xl leading-tight">
            What Our Students Say
          </h2>
          <p className="font-body text-[#64748B] mt-4 leading-relaxed">
            See what our alumni and students have to say about their journey.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
