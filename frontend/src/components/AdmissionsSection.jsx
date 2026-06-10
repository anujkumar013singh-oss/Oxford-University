import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UNIVERSITY_NAME } from '../constants/content';

const IMAGES = [
  'https://cdn.prod.website-files.com/66772cfa485b37fe40cd2fb3/6838894d90732728e41f0484_topdesignschool_campus.png',
  'https://2u.com/static/9a1dbfbbc99862a3b5d9223a4ce8aa58/29633/yuma-hall-american-university.max-2880x1800.jpg',
  'https://www.dlrgroup.com/media/2022/09/55_00000_39_N34_weblg.jpg',
  'https://www.american.edu/images/homepage-1920.jpg',
  'https://keystoneacademic-res.cloudinary.com/image/upload/c_fill,w_1920,h_822,g_auto/dpr_1/f_auto/q_auto/v1/element/25/255390_255259_ba518238-e316-4683-9343-ac4ddb9f093e-cover_photo-Fletcher_Keystone-Cover-Photo.jpeg',
  'https://rdgusa.com/assets/03-rdg_dmu_michael-robinson-photography_web.jpg',
  'https://www.nexford.edu/hubfs/AI-Generated%20Media/Images/photographic%20American%20College%20of%20Education%20Alternatives%20no%20words%20just%20an%20image%20of%20school.png',
];

const STYLES = [
  'w-[25vw] h-[25vh]', 'w-[35vw] h-[30vh] -top-[30vh] left-[5vw]',
  'w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]', 'w-[25vw] h-[25vh] left-[27.5vw]',
  'w-[20vw] h-[30vh] top-[30vh] left-[5vw]', 'w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]',
  'w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]',
];

export default function AdmissionsSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
    useTransform(scrollYProgress, [0, 1], [1, 9]),
  ];

  const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacityContent = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.5, 0.75], [0.8, 1]);

  return (
    <section id="admissions" ref={container} className="relative h-[250vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {IMAGES.map((src, i) => (
          <motion.div
            key={i}
            style={{ scale: scales[i], opacity: opacityImage }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`relative ${STYLES[i]}`}>
              <img src={src} alt={`Oxford ${i + 1}`} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </motion.div>
        ))}

        <motion.div
          style={{ opacity: opacityContent, scale: contentScale }}
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <div className="max-w-3xl mx-auto p-8 text-center">
            <span className="font-mono text-xs text-white/80 uppercase tracking-widest mb-4 inline-block">Admissions</span>
            <h2 className="font-heading font-bold text-white text-5xl lg:text-7xl leading-tight mb-6">
              Your Journey<br />Starts Here
            </h2>
            <p className="font-body text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              Join a tradition of excellence spanning nine centuries. At {UNIVERSITY_NAME}, 
              you become part of a community that has shaped world leaders, 
              groundbreaking thinkers, and visionary creators since 1096.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
