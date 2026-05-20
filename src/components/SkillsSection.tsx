import { useState, type MutableRefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⚡',
    color: '#00f5ff',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Crafting pixel-perfect, performant UIs',
    skills: [
      { name: 'React', level: 98, years: 5, icon: '⚛️' },
      { name: 'Next.js', level: 95, years: 4, icon: '▲' },
      { name: 'TypeScript', level: 93, years: 4, icon: '𝚃𝚂' },
      { name: 'Tailwind CSS', level: 97, years: 3, icon: '🎨' },
      { name: 'Framer Motion', level: 90, years: 3, icon: '🎭' },
      { name: 'Three.js / R3F', level: 82, years: 2, icon: '🌐' },
      { name: 'GraphQL', level: 88, years: 3, icon: '◈' },
      { name: 'CSS / SASS', level: 95, years: 5, icon: '🎨' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    color: '#bf00ff',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Native-quality mobile experiences',
    skills: [
      { name: 'React Native', level: 96, years: 4, icon: '📱' },
      { name: 'Expo', level: 94, years: 4, icon: '🚀' },
      { name: 'Reanimated 3', level: 92, years: 3, icon: '✨' },
      { name: 'Gesture Handler', level: 90, years: 3, icon: '👆' },
      { name: 'Navigation', level: 95, years: 4, icon: '🗺️' },
      { name: 'Native Modules', level: 80, years: 2, icon: '🔧' },
      { name: 'App Store Deploy', level: 92, years: 4, icon: '🍎' },
      { name: 'Offline First', level: 85, years: 3, icon: '📶' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    color: '#0080ff',
    gradient: 'from-blue-500 to-indigo-500',
    description: 'Scalable server-side architectures',
    skills: [
      { name: 'Node.js', level: 90, years: 4, icon: '🟢' },
      { name: 'PostgreSQL', level: 87, years: 4, icon: '🐘' },
      { name: 'MongoDB', level: 85, years: 3, icon: '🍃' },
      { name: 'Redis', level: 80, years: 2, icon: '⚡' },
      { name: 'Docker', level: 82, years: 3, icon: '🐳' },
      { name: 'AWS / GCP', level: 78, years: 3, icon: '☁️' },
      { name: 'REST / APIs', level: 95, years: 5, icon: '🔌' },
      { name: 'Supabase', level: 88, years: 2, icon: '⚡' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Ops',
    icon: '🛠️',
    color: '#ff0080',
    gradient: 'from-pink-500 to-orange-500',
    description: 'DevOps, tooling & workflow mastery',
    skills: [
      { name: 'Git / GitHub', level: 97, years: 5, icon: '🐙' },
      { name: 'CI/CD', level: 85, years: 3, icon: '🔄' },
      { name: 'Figma', level: 88, years: 4, icon: '🎨' },
      { name: 'Testing (Jest)', level: 88, years: 4, icon: '✅' },
      { name: 'Playwright', level: 80, years: 2, icon: '🎭' },
      { name: 'Storybook', level: 85, years: 3, icon: '📖' },
      { name: 'Performance', level: 92, years: 4, icon: '⚡' },
      { name: 'SEO/a11y', level: 90, years: 4, icon: '♿' },
    ],
  },
];

function SkillBar({ skill, color, delay }: { skill: { name: string; level: number; years: number; icon: string }; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{skill.icon}</span>
          <span className="font-space text-sm text-white/80">{skill.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-jet text-xs text-white/40">{skill.years}y</span>
          <span className="font-mono-jet text-xs" style={{ color }}>{skill.level}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Orbital visualization
function OrbitalSkills({ category }: { category: typeof SKILL_CATEGORIES[0] }) {
  const [hovered, setHovered] = useState<number | null>(null);


  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Center */}
      <div
        className="absolute w-16 h-16 rounded-full flex items-center justify-center border z-10"
        style={{
          background: `radial-gradient(circle, ${category.color}30, transparent)`,
          borderColor: category.color + '60',
          boxShadow: `0 0 30px ${category.color}40`,
        }}
      >
        <span className="text-2xl">{category.icon}</span>
      </div>

      {/* Orbiting skills */}
      {category.skills.map((skill, i) => {
        const angle = (i / category.skills.length) * 360;
        const radius = 110 + (i % 3) * 25;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
            className="absolute cursor-pointer"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              animate={{ scale: hovered === i ? 1.3 : 1 }}
              className="relative"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border text-base transition-all duration-300"
                style={{
                  background: hovered === i ? category.color + '30' : 'rgba(255,255,255,0.05)',
                  borderColor: hovered === i ? category.color : 'rgba(255,255,255,0.15)',
                  boxShadow: hovered === i ? `0 0 15px ${category.color}60` : 'none',
                }}
              >
                {skill.icon}
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-3 py-2 whitespace-nowrap z-20 border"
                    style={{ borderColor: category.color + '40' }}
                  >
                    <div className="font-space text-xs font-semibold text-white">{skill.name}</div>
                    <div className="font-mono-jet text-xs" style={{ color: category.color }}>{skill.level}%</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Orbit circles */}
      {[80, 110, 130, 150].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/5"
          style={{ width: r * 2, height: r * 2, left: `calc(50% - ${r}px)`, top: `calc(50% - ${r}px)` }}
        />
      ))}
    </div>
  );
}

export default function SkillsSection({ containerRef }: { containerRef?: MutableRefObject<HTMLDivElement | null> }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = SKILL_CATEGORIES[activeCategory];

  return (
    <div ref={containerRef ?? undefined} className="min-h-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono-jet text-xs uppercase tracking-widest text-[#00f5ff] mb-4 block">// Capabilities</span>
          <h2
            className="font-orbitron font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Skills & <span className="gradient-blue-cyan">Expertise</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A full-spectrum developer with deep expertise across the entire product lifecycle.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-space font-medium text-sm border transition-all duration-300 ${
                activeCategory === i
                  ? 'text-black'
                  : 'text-white/60 border-white/10 hover:text-white hover:border-white/30'
              }`}
              style={activeCategory === i ? {
                background: cat.color,
                borderColor: cat.color,
                boxShadow: `0 0 20px ${cat.color}60`,
              } : {}}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Skill bars */}
            <div className="glass rounded-3xl p-8 border" style={{ borderColor: cat.color + '30' }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: cat.color + '20', border: `1px solid ${cat.color}40` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-lg">{cat.label}</h3>
                  <p className="text-white/40 text-sm">{cat.description}</p>
                </div>
              </div>

              <div>
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} color={cat.color} delay={i * 0.06} />
                ))}
              </div>
            </div>

            {/* Right: Orbital visualization */}
            <div className="glass rounded-3xl p-8 border flex flex-col items-center" style={{ borderColor: cat.color + '30' }}>
              <h4 className="font-orbitron text-white font-semibold mb-2 text-center">Skill Constellation</h4>
              <p className="text-white/40 text-sm text-center mb-4">Hover nodes to explore</p>
              <OrbitalSkills category={cat} />

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-4 w-full mt-4">
                {[
                  { label: 'Proficiency', value: `${Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%` },
                  { label: 'Avg XP', value: `${Math.round(cat.skills.reduce((a, s) => a + s.years, 0) / cat.skills.length)}y` },
                  { label: 'Skills', value: cat.skills.length.toString() },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl border border-white/10 bg-white/5">
                    <div className="font-orbitron font-bold text-lg" style={{ color: cat.color }}>{stat.value}</div>
                    <div className="font-mono-jet text-xs text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tech logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 overflow-hidden"
        >
          <div className="flex gap-8 items-center justify-center flex-wrap opacity-40">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'Figma', 'Git'].map((tech) => (
              <span key={tech} className="font-mono-jet text-sm text-white/60 whitespace-nowrap">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
