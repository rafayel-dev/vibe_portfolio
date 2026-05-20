import { useState, type MutableRefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEB_PROJECTS = [
  {
    id: 'w1',
    title: 'NexaCommerce',
    description: 'A full-stack e-commerce platform with real-time inventory management, AI-powered recommendations, and seamless payment integration. Built with Next.js App Router and a Node.js microservices backend.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Tailwind'],
    category: 'Fullstack',
    color: '#00f5ff',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/30',
    live: 'https://example.com',
    github: 'https://github.com',
    metrics: { stars: '1.2k', forks: '240', users: '50k+' },
  },
  {
    id: 'w2',
    title: 'AstraUI Dashboard',
    description: 'Enterprise-grade analytics dashboard with 3D data visualizations, real-time WebSocket data streams, and drag-and-drop widget customization. Processing 1M+ events per day.',
    tech: ['React', 'D3.js', 'WebSockets', 'Express', 'MongoDB', 'Docker'],
    category: 'Frontend',
    color: '#bf00ff',
    gradient: 'from-purple-500/20 to-pink-600/20',
    border: 'border-purple-500/30',
    live: 'https://example.com',
    github: 'https://github.com',
    metrics: { stars: '890', forks: '125', users: '10k+' },
  },
  {
    id: 'w3',
    title: 'FlowAI Platform',
    description: 'AI-powered workflow automation SaaS with visual pipeline builder, LLM integration, and collaborative editing. Reduced operational overhead by 60% for enterprise clients.',
    tech: ['Next.js', 'Python', 'FastAPI', 'OpenAI', 'Supabase', 'Framer Motion'],
    category: 'Fullstack',
    color: '#0080ff',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    live: 'https://example.com',
    github: 'https://github.com',
    metrics: { stars: '2.1k', forks: '380', users: '25k+' },
  },
  {
    id: 'w4',
    title: 'CryptoVerse',
    description: 'Real-time crypto portfolio tracker with advanced charting, DeFi protocol integration, and cross-chain portfolio aggregation. Beautiful glassmorphic UI with live WebSocket price feeds.',
    tech: ['React', 'Recharts', 'ethers.js', 'Web3', 'GraphQL', 'Hasura'],
    category: 'Frontend',
    color: '#ff0080',
    gradient: 'from-pink-500/20 to-purple-600/20',
    border: 'border-pink-500/30',
    live: 'https://example.com',
    github: 'https://github.com',
    metrics: { stars: '650', forks: '98', users: '8k+' },
  },
];

const MOBILE_PROJECTS = [
  {
    id: 'm1',
    title: 'FitSync Pro',
    description: 'AI-powered fitness tracker with custom workout generation, real-time motion tracking via device sensors, social challenges, and Apple Health/Google Fit integration.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Reanimated 3', 'AI/ML', 'Firebase'],
    category: 'Mobile',
    color: '#00f5ff',
    gradient: 'from-cyan-500/20 to-teal-600/20',
    border: 'border-cyan-500/30',
    live: 'https://apps.apple.com',
    github: 'https://github.com',
    metrics: { downloads: '100k+', rating: '4.9', reviews: '2.4k' },
  },
  {
    id: 'm2',
    title: 'Pocketwise Finance',
    description: 'Smart personal finance app with ML-based spending categorization, budget forecasting, bill scanning via camera OCR, and beautiful animated charts.',
    tech: ['React Native', 'Redux Toolkit', 'Plaid API', 'TensorFlow Lite', 'Reanimated'],
    category: 'Mobile',
    color: '#bf00ff',
    gradient: 'from-purple-500/20 to-indigo-600/20',
    border: 'border-purple-500/30',
    live: 'https://play.google.com',
    github: 'https://github.com',
    metrics: { downloads: '250k+', rating: '4.8', reviews: '5.1k' },
  },
  {
    id: 'm3',
    title: 'Luminary Social',
    description: 'Next-gen social platform with AR filters, real-time Stories, encrypted DMs, and an AI content moderation system. Cross-platform with shared 90% codebase.',
    tech: ['React Native', 'Expo', 'WebRTC', 'Socket.io', 'AWS', 'VisionCamera'],
    category: 'Mobile',
    color: '#0080ff',
    gradient: 'from-blue-500/20 to-purple-600/20',
    border: 'border-blue-500/30',
    live: 'https://apps.apple.com',
    github: 'https://github.com',
    metrics: { downloads: '500k+', rating: '4.7', reviews: '12k' },
  },
];

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  color: string;
  gradient: string;
  border: string;
  live: string;
  github: string;
  metrics: Record<string, string>;
};

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onSelect(project)}
      className={`project-card cursor-pointer glass rounded-2xl p-6 border ${project.border} hover:border-opacity-80 relative overflow-hidden group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: project.color }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <span
              className="font-mono-jet text-xs uppercase tracking-widest mb-2 block"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
            <h3 className="font-orbitron font-bold text-white text-xl">{project.title}</h3>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0"
            style={{ borderColor: project.color + '50', color: project.color }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono-jet text-xs px-2 py-1 rounded-full border text-white/60"
              style={{ borderColor: project.color + '30', background: project.color + '10' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono-jet text-xs px-2 py-1 rounded-full border border-white/10 text-white/40">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 pt-3 border-t border-white/10">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k}>
              <div className="font-orbitron text-sm font-bold" style={{ color: project.color }}>{v}</div>
              <div className="font-mono-jet text-xs text-white/30 capitalize">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto project-modal"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`glass-strong rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto border ${project.border} relative overflow-x-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
            style={{ background: project.color }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <span className="font-mono-jet text-xs uppercase tracking-widest mb-1 block" style={{ color: project.color }}>
                  {project.category} Project
                </span>
                <h2 className="font-orbitron font-bold text-3xl text-white">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all shrink-0"
              >
                X
              </button>
            </div>

            <p className="text-white/70 text-base leading-relaxed mb-6">{project.description}</p>

            <div className="mb-6">
              <h4 className="font-mono-jet text-xs uppercase tracking-widest text-white/40 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono-jet text-xs px-3 py-1.5 rounded-full border text-white/80"
                    style={{ borderColor: project.color + '50', background: project.color + '15' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-2xl border border-white/10 bg-white/5">
              {Object.entries(project.metrics).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div className="font-orbitron font-bold text-2xl" style={{ color: project.color }}>{v}</div>
                  <div className="font-mono-jet text-xs text-white/40 capitalize mt-1">{k}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 py-3 rounded-xl font-space font-semibold text-white text-sm text-center"
                style={{ borderColor: project.color + '80' }}
              >
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl font-space font-semibold text-sm text-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsSection({ containerRef }: { containerRef?: MutableRefObject<HTMLDivElement | null> }) {
  const [tab, setTab] = useState<'web' | 'mobile'>('web');
  const [selected, setSelected] = useState<Project | null>(null);
  const projects = tab === 'web' ? WEB_PROJECTS : MOBILE_PROJECTS;

  return (
    <div ref={containerRef ?? undefined} className="min-h-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono-jet text-xs uppercase tracking-widest text-[#00f5ff] mb-4 block">// Portfolio</span>
          <h2
            className="font-orbitron font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Featured <span className="gradient-cyan-purple">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Handcrafted digital experiences that push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="glass rounded-full p-1 border border-white/10 flex flex-wrap justify-center gap-1">
            {(['web', 'mobile'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full font-space font-medium text-sm transition-all duration-300 ${
                  tab === t ? 'bg-[#00f5ff] text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]' : 'text-white/50 hover:text-white'
                }`}
              >
                {t === 'web' ? 'Web & Fullstack' : 'React Native'}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onSelect={setSelected} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
