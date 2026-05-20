import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'projects', label: 'Projects', icon: 'Work' },
  { id: 'mobile', label: 'Mobile', icon: 'Apps' },
  { id: 'skills', label: 'Skills', icon: 'Skills' },
  { id: 'experience', label: 'Journey', icon: 'Path' },
  { id: 'contact', label: 'Contact', icon: 'Talk' },
];

export default function Navigation({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (s: string) => void;
}) {
  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-8"
        style={{ background: 'linear-gradient(180deg, rgba(2,0,16,0.8) 0%, transparent 100%)' }}
      >
        <button
          onClick={() => onNavigate('hero')}
          className="font-orbitron font-black text-xl tracking-wider group"
        >
          <span className="text-white group-hover:text-[#00f5ff] transition-colors">AC</span>
          <span className="text-[#00f5ff] group-hover:text-white transition-colors">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {SECTIONS.slice(1).map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`relative px-4 py-2 rounded-lg font-space text-sm font-medium transition-all duration-300 ${
                active === section.id ? 'text-[#00f5ff]' : 'text-white/50 hover:text-white'
              }`}
            >
              {active === section.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)' }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNavigate('contact')}
          className="btn-primary px-4 py-2 rounded-lg font-space font-semibold text-white text-sm hidden md:block"
        >
          Hire Me
        </button>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"
      >
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="group relative flex items-center justify-end gap-3"
          >
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="font-mono-jet text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
              >
                {section.label}
              </motion.span>
            </AnimatePresence>

            <div
              className={`nav-dot rounded-full border transition-all duration-300 ${
                active === section.id
                  ? 'w-3 h-3 bg-[#00f5ff] border-[#00f5ff] shadow-[0_0_8px_#00f5ff]'
                  : 'w-2 h-2 bg-transparent border-white/30 group-hover:border-white/60'
              }`}
            />
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ background: 'rgba(2,0,16,0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="grid grid-cols-3 gap-y-3 px-3 py-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`flex flex-col items-center gap-1 rounded-lg py-1 transition-all ${
                active === section.id ? 'text-[#00f5ff]' : 'text-white/40'
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{section.icon}</span>
              <span className="font-mono-jet text-[10px]">{section.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
