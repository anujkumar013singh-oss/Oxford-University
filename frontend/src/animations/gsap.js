import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useReveal() {
  const elRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animRef.current?.play();
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return elRef;
}

export function fadeUp(el) {
  if (!el) return null;
  gsap.set(el, { y: 30, opacity: 0 });
  const anim = gsap.to(el, {
    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    stagger: el.length ? 0.1 : 0,
    paused: true,
  });
  return anim;
}

export function staggerUp(els) {
  if (!els || !els.length) return null;
  gsap.set(els, { y: 40, opacity: 0 });
  const anim = gsap.to(els, {
    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    stagger: 0.1, paused: true,
  });
  return anim;
}

export function counterAnim(el, target) {
  if (!el) return null;
  const obj = { val: 0 };
  const anim = gsap.to(obj, {
    val: target, duration: 2, ease: 'power2.out', paused: true,
    onUpdate() { el.textContent = Math.round(obj.val).toLocaleString('en-IN'); },
  });
  return anim;
}
