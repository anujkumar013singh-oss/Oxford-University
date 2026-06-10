import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MotionMap = {
  div: motion.div,
  span: motion.span,
  a: motion.a,
  figure: motion.figure,
  button: motion.button,
  p: motion.p,
};

export function TimelineContent({ as: Tag = 'div', children, animationNum = 0, timelineRef, customVariants, className, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = customVariants || {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const MotionTag = MotionMap[Tag] || motion.div;

  return (
    <MotionTag
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
