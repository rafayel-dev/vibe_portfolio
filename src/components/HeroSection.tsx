import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TYPING_TEXTS = [
  'Frontend Developer',
  'Fullstack Engineer',
  'React Native Specialist',
  'UI/UX Craftsman',
  'Performance Architect',
];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1400);
      return () => clearTimeout(t);
    }

    const current = TYPING_TEXTS[index];
    const speed = deleting ? 50 : 80;

    const t = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setPaused(true);
          setDeleting(true);
        }
      } else if (displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % TYPING_TEXTS.length);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, index, paused]);

  return (
    <span className="font-mono-jet text-[#00f5ff] font-light">
      {displayed}
      <span className="terminal-cursor ml-1" />
    </span>
  );
}

export default function HeroSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-y-auto pointer-events-none">
      <div className="min-h-full flex items-center justify-center px-6 py-24 md:py-28">
        <div className="relative z-10 text-center max-w-5xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-[rgba(0,245,255,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_8px_#00f5ff]" />
            <span className="font-mono-jet text-xs text-[#00f5ff] tracking-widest uppercase">
              Available for hire | Open to opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-2"
          >
            <h1
              className="font-orbitron font-black text-white tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8.5vw, 8.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textShadow: '0 0 50px rgba(0, 245, 255, 0.12)'
              }}
            >
              ALEX <span className="gradient-cyan-purple block">CARTER</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4 min-h-[2rem] flex-wrap"
          >
            <span className="font-mono-jet text-white/40 text-sm tracking-widest">{'>'}</span>
            <TypewriterText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="font-space text-white/50 text-base md:text-lg mb-10 tracking-wide"
          >
            React | Next.js | React Native | Node.js | TypeScript
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10"
          >
            {[
              { value: '5+', label: 'Years XP' },
              { value: '40+', label: 'Projects' },
              { value: '15+', label: 'Mobile Apps' },
              { value: '99%', label: 'Client Sat.' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron font-bold text-2xl md:text-3xl gradient-cyan-purple">{stat.value}</div>
                <div className="font-mono-jet text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('projects')}
              className="btn-primary px-8 py-3 rounded-full font-space font-semibold text-white text-sm tracking-wide"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Work</span>
                <span>{'->'}</span>
              </span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 rounded-full font-space font-semibold text-sm tracking-wide border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              Get In Touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="mt-10 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-mono-jet text-xs text-white/30 tracking-widest uppercase">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#00f5ff] to-transparent" />
          </motion.div>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[rgba(0,245,255,0.3)] rounded-tl-lg hidden md:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[rgba(0,245,255,0.3)] rounded-tr-lg hidden md:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[rgba(0,245,255,0.3)] rounded-bl-lg hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[rgba(0,245,255,0.3)] rounded-br-lg hidden md:block" />
    </div>
  );
}
