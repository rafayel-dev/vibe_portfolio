import { useState, type MutableRefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 'e1',
    role: 'Senior Frontend Engineer',
    company: 'Nebula Tech',
    period: '2023 – Present',
    duration: '2y',
    type: 'Full-time',
    color: '#00f5ff',
    icon: '🚀',
    location: 'San Francisco, CA (Remote)',
    description: 'Lead frontend engineer on a team of 12, architecting the next-generation SaaS platform serving 500k+ enterprise users. Spearheaded migration from CRA to Next.js 14, achieving 60% performance improvement.',
    achievements: [
      'Reduced TTI from 8.2s to 1.9s via code splitting, lazy loading, and edge rendering',
      'Built real-time collaborative editing feature (like Notion) using CRDT and WebSockets',
      'Architected design system with 200+ components serving 8 product teams',
      'Mentored 4 junior engineers, conducting weekly code reviews',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Tailwind', 'Storybook', 'Playwright'],
  },
  {
    id: 'e2',
    role: 'Fullstack Developer',
    company: 'Apex Digital Studio',
    period: '2021 – 2023',
    duration: '2y',
    type: 'Full-time',
    color: '#bf00ff',
    icon: '⚡',
    location: 'New York, NY',
    description: 'Full-stack development across web and mobile for high-growth startups. Delivered 12 products from concept to production within aggressive timelines, while maintaining code quality and test coverage above 85%.',
    achievements: [
      'Delivered 5 React Native apps with 4.7+ App Store ratings combined',
      'Built microservices backend handling 2M+ API calls/day using Node.js',
      'Implemented CI/CD pipeline reducing deploy time by 70%',
      'Led cross-functional team of designers and developers for 3 major product launches',
    ],
    tech: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
  },
  {
    id: 'e3',
    role: 'React Native Developer',
    company: 'MobileCraft Labs',
    period: '2020 – 2021',
    duration: '1y',
    type: 'Full-time',
    color: '#0080ff',
    icon: '📱',
    location: 'Austin, TX (Remote)',
    description: 'Specialized in building performant, native-quality mobile applications for iOS and Android. Developed 8 production apps across fintech, health, and social sectors.',
    achievements: [
      'Built fintech app with 250k+ downloads and 4.8 Play Store rating',
      'Achieved 60fps animations using Reanimated 2 and Worklets',
      'Reduced app bundle size by 40% through optimization and code splitting',
      'Implemented offline-first architecture with MMKV and WatermelonDB',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'Reanimated', 'Redux', 'Firebase'],
  },
  {
    id: 'e4',
    role: 'Frontend Developer',
    company: 'StartupHub Inc.',
    period: '2019 – 2020',
    duration: '1y',
    type: 'Full-time',
    color: '#ff0080',
    icon: '🌱',
    location: 'Remote',
    description: 'Entry-level to mid-level growth journey, building responsive web applications and internal tools. Rapidly expanded skill set from basic React to advanced patterns and full-stack development.',
    achievements: [
      'Built and shipped 15+ web applications using React and Vue.js',
      'Learned and applied TDD principles, achieving 80%+ test coverage',
      'Created internal component library used across all company products',
      'Contributed to open-source projects with 500+ GitHub stars',
    ],
    tech: ['React', 'JavaScript', 'CSS/SCSS', 'REST APIs', 'Git', 'Jest'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Sc. Computer Science',
    school: 'MIT',
    year: '2019',
    color: '#00f5ff',
    icon: '🎓',
  },
  {
    degree: 'AWS Certified Developer',
    school: 'Amazon Web Services',
    year: '2022',
    color: '#bf00ff',
    icon: '☁️',
  },
  {
    degree: 'Google UX Design',
    school: 'Google Career Certificates',
    year: '2021',
    color: '#0080ff',
    icon: '🎨',
  },
];

export default function ExperienceSection({ containerRef }: { containerRef?: MutableRefObject<HTMLDivElement | null> }) {
  const [activeExp, setActiveExp] = useState<string | null>(null);

  return (
    <div ref={containerRef ?? undefined} className="min-h-full py-20 px-6 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono-jet text-xs uppercase tracking-widest text-[#00f5ff] mb-4 block">// Career Path</span>
          <h2
            className="font-orbitron font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            My <span className="gradient-purple-pink">Journey</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            5+ years of building exceptional digital products across startups and enterprises.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full timeline-line opacity-30" />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full timeline-line"
              style={{ boxShadow: '0 0 10px rgba(0,245,255,0.5)' }}
            />
          </div>

          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex items-start gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 text-xs md:text-xl cursor-pointer"
                  style={{
                    borderColor: exp.color,
                    background: `${exp.color}20`,
                    boxShadow: `0 0 20px ${exp.color}40`,
                  }}
                  onClick={() => setActiveExp(activeExp === exp.id ? null : exp.id)}
                >
                  {exp.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`ml-10 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                <div
                  className="glass rounded-2xl p-4.5 md:p-6 border cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    borderColor: activeExp === exp.id ? exp.color + '60' : 'rgba(255,255,255,0.08)',
                    boxShadow: activeExp === exp.id ? `0 0 30px ${exp.color}20` : 'none',
                  }}
                  onClick={() => setActiveExp(activeExp === exp.id ? null : exp.id)}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono-jet text-[10px] px-2 py-0.5 rounded-full" style={{ background: exp.color + '20', color: exp.color }}>
                          {exp.type}
                        </span>
                        <span className="font-mono-jet text-xs text-white/40">{exp.duration}</span>
                      </div>
                      <h3 className="font-orbitron font-bold text-white text-base">{exp.role}</h3>
                      <p className="font-space text-sm" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-mono-jet text-xs text-white/60">{exp.period}</div>
                      <div className="font-mono-jet text-xs text-white/30 mt-1">{exp.location}</div>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">{exp.description}</p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono-jet text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ borderColor: exp.color + '30', color: exp.color + 'cc', background: exp.color + '10' }}
                      >
                        {t}
                      </span>
                    ))}
                    {exp.tech.length > 4 && (
                      <span className="font-mono-jet text-xs text-white/30">+{exp.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Expanded achievements */}
                  <AnimatePresence>
                    {activeExp === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h4 className="font-mono-jet text-xs uppercase tracking-widest text-white/40 mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((a, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.08 }}
                                className="flex items-start gap-2 text-sm text-white/70"
                              >
                                <span style={{ color: exp.color }} className="mt-1 text-xs font-semibold">▸</span>
                                {a}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono-jet text-[10px] px-2 py-0.5 rounded-full border"
                                style={{ borderColor: exp.color + '30', color: exp.color + 'cc', background: exp.color + '10' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="font-orbitron font-bold text-white text-xl text-center mb-8">Education & Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="glass rounded-2xl p-5 border border-white/10 text-center hover:scale-105 transition-transform"
                style={{ borderColor: edu.color + '30' }}
              >
                <div className="text-3xl mb-3">{edu.icon}</div>
                <h4 className="font-space font-semibold text-white text-sm mb-1">{edu.degree}</h4>
                <p className="font-mono-jet text-xs" style={{ color: edu.color }}>{edu.school}</p>
                <p className="font-mono-jet text-xs text-white/40 mt-1">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
