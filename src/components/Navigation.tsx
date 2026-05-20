import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'projects', label: 'Projects', icon: 'Work' },
  { id: 'mobile', label: 'Mobile', icon: 'Apps' },
  { id: 'skills', label: 'Skills', icon: 'Skills' },
  { id: 'experience', label: 'Journey', icon: 'Path' },
  { id: 'contact', label: 'Contact', icon: 'Talk' },
];

const renderIcon = (id: string) => {
  switch (id) {
    case 'hero':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'projects':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'mobile':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'skills':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'experience':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    case 'contact':
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    default:
      return null;
  }
};

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
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe"
        style={{ background: 'rgba(2,0,16,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex justify-around items-center px-2 py-3.5">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`flex flex-col items-center gap-1 rounded-lg py-1.5 px-2 transition-all duration-300 relative ${
                active === section.id ? 'text-[#00f5ff] scale-110' : 'text-white/45 hover:text-white/70'
              }`}
            >
              {renderIcon(section.id)}
              <span className="font-space text-[9px] tracking-wide mt-0.5">{section.label}</span>
              {active === section.id && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#00f5ff]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
