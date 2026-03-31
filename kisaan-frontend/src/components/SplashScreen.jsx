import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

// Floating particle component
function Particle({ delay, x, y, size, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(134,239,172,0.6) 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [-20, -80, -140],
        scale: [0, 1, 0],
        x: [0, (Math.random() - 0.5) * 40],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: 'easeOut',
      }}
    />
  );
}

// Animated grain overlay using SVG filter
function GrainOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// Animated ring component
function PulseRing({ delay, scale }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-[2.8rem] border border-green-400/20"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: [0, 0.6, 0], scale: [1, scale] }}
      transition={{
        delay,
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 20 + Math.random() * 60,
  y: 30 + Math.random() * 40,
  size: 3 + Math.random() * 6,
  delay: i * 0.3,
  duration: 2.5 + Math.random() * 2,
}));

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | done

  useEffect(() => {
    const duration = 3000;
    const interval = 25;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setPhase('done');
          setTimeout(onFinish, 800);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase !== 'exited' && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          animate={phase === 'done' ? { opacity: 0, filter: 'blur(12px)' } : {}}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#060a06' }}
        >
          <GrainOverlay />

          {/* Deep background mesh */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 40%, rgba(21,128,61,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(20,83,45,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 30% 30% at 80% 20%, rgba(134,239,172,0.06) 0%, transparent 40%)
              `,
            }}
          />

          {/* Horizontal scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
            }}
          />

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map(p => (
              <Particle key={p.id} {...p} />
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-20 flex flex-col items-center">

            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative mb-10"
            >
              {/* Pulse rings */}
              <div className="relative">
                <PulseRing delay={1.2} scale={1.4} />
                <PulseRing delay={1.8} scale={1.7} />
                <PulseRing delay={2.4} scale={2.0} />

                {/* Logo box */}
                <div
                  className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21,128,61,0.2) 0%, rgba(134,239,172,0.08) 100%)',
                    borderRadius: '2.2rem',
                    border: '1px solid rgba(134,239,172,0.2)',
                    boxShadow: '0 0 40px rgba(21,128,61,0.3), 0 0 80px rgba(21,128,61,0.1), inset 0 1px 0 rgba(134,239,172,0.1)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 rounded-[2.2rem]"
                    style={{
                      background: 'radial-gradient(circle at 40% 30%, rgba(134,239,172,0.15) 0%, transparent 60%)',
                    }}
                  />

                  {/* Logo placeholder — replace with <img src="/logo.png" /> */}
                  <div className="relative z-10 flex items-center justify-center">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <motion.path
                        d="M26 8 C26 8, 14 16, 14 28 C14 36, 19 42, 26 44 C33 42, 38 36, 38 28 C38 16, 26 8, 26 8Z"
                        stroke="url(#leafGrad)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                      />
                      <motion.path
                        d="M26 44 L26 24 M26 30 L20 24 M26 34 L32 28"
                        stroke="url(#stemGrad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
                      />
                      <defs>
                        <linearGradient id="leafGrad" x1="14" y1="8" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#86efac" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                        <linearGradient id="stemGrad" x1="20" y1="44" x2="32" y2="24" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#4ade80" />
                          <stop offset="100%" stopColor="#86efac" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-2"
            >
              <h1
                className="text-5xl md:text-6xl font-black tracking-[-0.03em] text-white leading-none"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
              >
                Kisaan{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #86efac 0%, #4ade80 40%, #16a34a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Konnect
                </span>
              </h1>
            </motion.div>

            {/* Tagline with letter spacing animation */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ delay: 1.0, duration: 1.2, ease: 'easeOut' }}
              className="text-[10px] font-semibold uppercase text-green-600/70 mb-14"
              style={{ fontFamily: 'monospace' }}
            >
              Smart Agriculture · Better Future
            </motion.p>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="w-56 flex flex-col items-center gap-3"
            >
              {/* Track */}
              <div
                className="w-full h-[2px] relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}
              >
                {/* Fill */}
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #15803d, #4ade80, #86efac)',
                    boxShadow: '0 0 8px rgba(74,222,128,0.8)',
                    borderRadius: 2,
                  }}
                  transition={{ ease: 'linear' }}
                />
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-y-0 w-12"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    left: `${Math.max(0, progress - 8)}%`,
                  }}
                />
              </div>

              {/* Percentage */}
              <motion.span
                className="text-[10px] font-mono tabular-nums"
                style={{ color: 'rgba(134,239,172,0.4)' }}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          </div>

          {/* Bottom footer */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-8 flex flex-col items-center gap-1"
          >
            <div
              className="w-8 h-[1px] mb-3"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(134,239,172,0.3), transparent)' }}
            />
            <span
              className="text-[9px] uppercase tracking-[0.3em] font-medium"
              style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'monospace' }}
            >
              © 2026 Kisaan Konnect
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}