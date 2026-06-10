import { useState, useEffect, useRef } from 'react';

const SLIDES = [
  'https://www.nexford.edu/hubfs/AI-Generated%20Media/Images/photographic%20American%20College%20of%20Education%20Alternatives%20no%20words%20just%20an%20image%20of%20school.png',
  'https://rdg-openasset.s3.amazonaws.com/openasset-v2/R3003.283.01/r3003.283.01-des-moines-university-medical-_98898.jpg',
  'https://www.american.edu/images/homepage-1920.jpg',
  'https://i.pinimg.com/originals/a6/26/41/a62641b101b6e2d4d0aeaa4234e7eafb.jpg',
  'https://static.dezeen.com/uploads/2018/12/medical-center-university-of-kansas-co-architects-architecture-kansas-city-usa_dezeen_2364_col_0.jpg',
  'https://www.dlrgroup.com/media/83_24103_00_N25_weblg-2140x1203.jpg',
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const borderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setPrev(current);
      setCurrent((c) => (c + 1) % SLIDES.length);
      setTimeout(() => setAnimating(false), 700);
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    if (!borderRef.current) return;
    const tl = borderRef.current.animate(
      [
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)' },
      ],
      { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );
    return () => tl.cancel();
  }, [current]);

  return (
    <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto">
      {/* Animated border */}
      <div className="absolute -inset-3 overflow-hidden">
        <div
          key={current}
          ref={borderRef}
          className="w-full h-full rounded-2xl"
          style={{
            border: '2px solid #1E40AF',
            borderRadius: '16px',
            clipPath: 'inset(0 0% 0 0)',
          }}
        />
      </div>

      {/* Corner accents */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-8 h-8 z-10`}
          style={{
            borderColor: '#1E40AF',
            borderStyle: 'solid',
            borderWidth:
              i === 0 ? '2px 0 0 2px' :
              i === 1 ? '2px 2px 0 0' :
              i === 2 ? '0 0 2px 2px' :
              '0 2px 2px 0',
          }}
        />
      ))}

      {/* Image container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={SLIDES[prev]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: animating ? 'fadeOut 0.7s ease-in-out forwards' : 'none',
            }}
          />
        )}
        <img
          key={`curr-${current}`}
          src={SLIDES[current]}
          alt="University campus"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            animation: animating ? 'fadeIn 0.7s ease-in-out forwards' : 'none',
            zIndex: prev !== null ? 1 : 0,
          }}
        />
      </div>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimating(true); setPrev(current); setCurrent(i); setTimeout(() => setAnimating(false), 700); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-blue-primary w-6' : 'bg-blue-border'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
      `}</style>
    </div>
  );
}
