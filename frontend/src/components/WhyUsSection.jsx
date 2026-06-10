import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TimelineContent } from './ui/timeline-animation';
import { VerticalCutReveal } from './ui/vertical-cut-reveal';
import { UNIVERSITY_NAME } from '../constants/content';

export default function WhyUsSection() {
  const heroRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({ y: 0, opacity: 1, filter: 'blur(0px)', transition: { delay: i * 0.4, duration: 0.5 } }),
    hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
  };

  const scaleVariants = {
    visible: (i) => ({ opacity: 1, filter: 'blur(0px)', transition: { delay: i * 0.4, duration: 0.5 } }),
    hidden: { filter: 'blur(10px)', opacity: 0 },
  };

  return (
    <section id="about" className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2 text-xl">
              <span className="text-blue-primary animate-spin">✱</span>
              <TimelineContent as="span" animationNum={0} timelineRef={heroRef} customVariants={revealVariants}
                className="text-sm font-medium text-gray-600 font-mono"
              >
                ABOUT OXFORD
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin', 'youtube'].map((s, i) => (
                <TimelineContent key={s} as="a" animationNum={i} timelineRef={heroRef} customVariants={revealVariants}
                  href={`https://www.${s}.com/`} target="_blank" rel="noopener noreferrer"
                  className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <img src={`https://pro-section.ui-layouts.com/${s}.svg`} alt={s} width={24} height={24} />
                </TimelineContent>
              ))}
            </div>
          </div>

          <TimelineContent as="figure" animationNum={4} timelineRef={heroRef} customVariants={scaleVariants} className="relative group">
            <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" fill="#D9D9D9" />
                </clipPath>
              </defs>
              <image clipPath="url(#clip-inverted)" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"
                xlinkHref="https://rdgusa.com/assets/03-rdg_dmu_michael-robinson-photography_web.jpg" />
            </svg>
          </TimelineContent>

          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <TimelineContent as="div" animationNum={5} timelineRef={heroRef} customVariants={revealVariants} className="flex gap-4">
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-blue-primary font-bold">928</span>
                <span className="text-gray-600">years of history</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-blue-primary font-bold">24k+</span>
                <span className="text-gray-600">students</span>
              </div>
            </TimelineContent>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8">
              <VerticalCutReveal splitBy="words" staggerDuration={0.1} staggerFrom="first" reverse={true}
                transition={{ type: 'spring', stiffness: 250, damping: 30, delay: 3 }}
              >
                Where Tradition Meets Innovation.
              </VerticalCutReveal>
            </h1>

            <TimelineContent as="div" animationNum={9} timelineRef={heroRef} customVariants={revealVariants}
              className="text-gray-600 sm:text-base text-xs"
            >
              <p className="leading-relaxed text-justify font-body">
                For over 900 years, {UNIVERSITY_NAME} has been a beacon of academic excellence, fostering critical thinking and groundbreaking research that shapes our world. Every student at Oxford becomes part of a legacy of inquiry and discovery, guided by world-leading faculty in an environment built for intellectual growth.
              </p>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent as="div" animationNum={12} timelineRef={heroRef} customVariants={revealVariants}
                className="text-blue-primary text-2xl font-bold mb-2 font-heading"
              >
                OXFORD
              </TimelineContent>
              <TimelineContent as="div" animationNum={13} timelineRef={heroRef} customVariants={revealVariants}
                className="text-gray-600 text-sm mb-8 font-body"
              >
                University of Oxford | Est. 1096
              </TimelineContent>

              <TimelineContent as="div" animationNum={14} timelineRef={heroRef} customVariants={revealVariants} className="mb-6">
                <p className="text-gray-900 font-medium mb-4 font-body">
                  Ready to be part of history?
                </p>
              </TimelineContent>

              <TimelineContent as="button" animationNum={15} timelineRef={heroRef} customVariants={revealVariants}
                className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold font-body text-sm"
                onClick={() => document.querySelector('#admissions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                APPLY NOW <ArrowRight size={16} />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
