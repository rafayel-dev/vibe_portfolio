import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_LINES = [
  'Initializing 3D engine...',
  'Loading shader modules...',
  'Calibrating particle systems...',
  'Mounting React components...',
  'Building 3D scene...',
  'Optimizing performance...',
  'System ready.',
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < LOADING_LINES.length) {
        setLines((prev) => [...prev, LOADING_LINES[lineIndex]]);
        setProgress(Math.round(((lineIndex + 1) / LOADING_LINES.length) * 100));
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center"
          style={{ background: '#020010' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #00f5ff, #bf00ff, transparent)' }} />

          <div className="relative z-10 max-w-md w-full px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="font-orbitron font-black text-5xl text-white mb-2">
                AC<span className="text-[#00f5ff]">.</span>
              </div>
              <div className="font-mono-jet text-xs text-white/30 tracking-widest uppercase">
                Portfolio v2.0 · Initializing
              </div>
            </motion.div>

            {/* Hex spinner */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-16 h-16 border-2 border-[#00f5ff]/30 rounded-lg"
                style={{ borderTopColor: '#00f5ff', boxShadow: '0 0 20px rgba(0,245,255,0.3)' }}
              />
            </div>

            {/* Terminal lines */}
            <div className="glass rounded-xl p-4 mb-6 h-32 overflow-hidden font-mono-jet text-xs space-y-1">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === lines.length - 1 ? 'text-[#00f5ff]' : 'text-white/40'}
                >
                  {i === lines.length - 1 ? '▸ ' : '  '}{line}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-3">
              <motion.div
                className="loading-bar h-full rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <div className="flex justify-between font-mono-jet text-xs text-white/30">
              <span>Loading assets...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
