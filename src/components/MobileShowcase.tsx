import { useState, useRef, type MutableRefObject } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const APP_SCREENS = [
  {
    id: 's1',
    name: 'FitSync Pro',
    category: 'Health & Fitness',
    color: '#00f5ff',
    bg: 'from-cyan-900 to-slate-900',
    screen: (
      <div className="w-full h-full p-4 flex flex-col" style={{ background: 'linear-gradient(135deg, #0a1628, #041219)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/50 text-xs font-mono">GOOD MORNING</div>
            <div className="text-white font-bold text-lg leading-tight">Alex 👋</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <span className="text-sm">🔥</span>
          </div>
        </div>

        {/* Ring progress */}
        <div className="flex justify-center mb-4">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,245,255,0.1)" strokeWidth="8" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="#00f5ff" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 34 * 0.72} ${2 * Math.PI * 34}`}
              strokeLinecap="round" transform="rotate(-90 40 40)" />
            <text x="40" y="44" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">72%</text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Steps', value: '7,842', icon: '👟', color: '#00f5ff' },
            { label: 'Calories', value: '482', icon: '🔥', color: '#ff6b6b' },
            { label: 'Active Min', value: '38', icon: '⚡', color: '#bf00ff' },
            { label: 'Heart BPM', value: '72', icon: '❤️', color: '#ff0080' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-2.5" style={{ background: stat.color + '15', border: `1px solid ${stat.color}30` }}>
              <div className="text-xs mb-1">{stat.icon} <span className="text-white/40 text-xs">{stat.label}</span></div>
              <div className="text-white font-bold text-base" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 bg-cyan-500 rounded-xl py-2 text-black text-xs font-bold text-center">Start Workout</div>
          <div className="flex-1 bg-white/10 rounded-xl py-2 text-white text-xs font-semibold text-center">Nutrition</div>
        </div>
      </div>
    ),
  },
  {
    id: 's2',
    name: 'Pocketwise',
    category: 'Finance',
    color: '#bf00ff',
    bg: 'from-purple-900 to-slate-900',
    screen: (
      <div className="w-full h-full p-4 flex flex-col" style={{ background: 'linear-gradient(135deg, #12052a, #1a0533)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-sm">My Wallet</span>
          <span className="text-xs text-white/40">May 2025</span>
        </div>

        <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #bf00ff40, #8000ff30)' }}>
          <div className="text-white/50 text-xs mb-1">Total Balance</div>
          <div className="text-white font-bold text-2xl">$24,891.40</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-green-400 text-xs">↑ +12.4%</span>
            <span className="text-white/30 text-xs">this month</span>
          </div>
        </div>

        <div className="text-white/40 text-xs mb-2 uppercase tracking-wider">Recent</div>
        {[
          { name: 'Netflix', amount: '-$15.99', icon: '📺', type: 'expense' },
          { name: 'Salary', amount: '+$5,400', icon: '💼', type: 'income' },
          { name: 'Amazon', amount: '-$89.99', icon: '📦', type: 'expense' },
          { name: 'Freelance', amount: '+$1,200', icon: '💻', type: 'income' },
        ].map((tx) => (
          <div key={tx.name} className="flex items-center gap-3 py-2 border-b border-white/5">
            <span className="text-base">{tx.icon}</span>
            <span className="flex-1 text-xs text-white/80">{tx.name}</span>
            <span className={`font-mono text-xs font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 's3',
    name: 'Luminary',
    category: 'Social',
    color: '#0080ff',
    bg: 'from-blue-900 to-slate-900',
    screen: (
      <div className="w-full h-full p-4 flex flex-col" style={{ background: 'linear-gradient(135deg, #010a1a, #041228)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-bold text-sm">luminary</span>
          <div className="flex gap-2">
            <span className="text-lg">🔍</span>
            <span className="text-lg">💬</span>
          </div>
        </div>

        {/* Stories row */}
        <div className="flex gap-2 mb-4 overflow-hidden">
          {['You', 'Sarah', 'Jake', 'Emma'].map((name, i) => (
            <div key={name} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 ${i === 0 ? 'border-white/30' : 'border-blue-400'}`}
                style={{ background: `hsl(${i * 60 + 200}, 70%, 30%)` }}>
                {i === 0 ? '+' : '😊'}
              </div>
              <span className="text-white/50 text-xs">{name}</span>
            </div>
          ))}
        </div>

        {/* Posts */}
        {[
          { user: 'sarah_dev', content: 'Just shipped a new feature! 🚀', likes: 142, img: '#0080ff20' },
          { user: 'jake_ui', content: 'CSS never fails to surprise me 😅', likes: 89, img: '#bf00ff20' },
        ].map((post) => (
          <div key={post.user} className="mb-3 rounded-xl overflow-hidden border border-white/5">
            <div className="flex items-center gap-2 p-2">
              <div className="w-6 h-6 rounded-full" style={{ background: post.img }} />
              <span className="text-white/80 text-xs font-semibold">{post.user}</span>
            </div>
            <div className="h-12 w-full" style={{ background: post.img }} />
            <div className="p-2">
              <div className="text-white/70 text-xs mb-1">{post.content}</div>
              <div className="flex gap-3 text-white/40 text-xs">
                <span>❤️ {post.likes}</span>
                <span>💬 32</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function MobileShowcase({ containerRef }: { containerRef?: MutableRefObject<HTMLDivElement | null> }) {
  const [activeApp, setActiveApp] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const app = APP_SCREENS[activeApp];

  return (
    <div ref={containerRef ?? undefined} className="min-h-full py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono-jet text-xs uppercase tracking-widest text-[#00f5ff] mb-4 block">// React Native</span>
          <h2
            className="font-orbitron font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Mobile <span className="gradient-cyan-purple">Showcase</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Cross-platform mobile apps with native performance and stunning UX.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone mockup */}
          <div className="flex-1 flex justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative"
            >
              {/* Phone frame */}
              <motion.div
                className="relative"
                style={{ width: 220, height: 440, transformStyle: 'preserve-3d' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-[40px] blur-2xl opacity-40 -z-10 scale-95"
                  style={{ background: `radial-gradient(ellipse, ${app.color}, transparent)` }}
                />

                {/* Phone shell */}
                <div
                  className="w-full h-full rounded-[36px] overflow-hidden relative border-4"
                  style={{
                    borderColor: 'rgba(255,255,255,0.15)',
                    background: '#0a0a0f',
                    boxShadow: `0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)`,
                  }}
                >
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 py-2 bg-black/40">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="w-24 h-5 rounded-full bg-black absolute top-2 left-1/2 -translate-x-1/2" />
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[3, 4, 5].map((h) => (
                          <div key={h} className="w-1 rounded-sm bg-white" style={{ height: h }} />
                        ))}
                      </div>
                      <div className="text-white text-xs">100%</div>
                    </div>
                  </div>

                  {/* App screen */}
                  <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 36px - 20px)' }}>
                    <motion.div
                      key={activeApp}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      {app.screen}
                    </motion.div>
                  </div>

                  {/* Home bar */}
                  <div className="flex justify-center pb-2 pt-1 bg-black/20">
                    <div className="w-24 h-1 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Side buttons */}
                <div className="absolute -right-1 top-20 w-1 h-8 rounded-r bg-white/20" />
                <div className="absolute -left-1 top-16 w-1 h-6 rounded-l bg-white/20" />
                <div className="absolute -left-1 top-24 w-1 h-6 rounded-l bg-white/20" />
              </motion.div>
            </motion.div>
          </div>

          {/* App list */}
          <div className="flex-1 space-y-4">
            <div className="mb-6">
              <h3 className="font-orbitron text-white font-bold text-xl mb-2">Featured Apps</h3>
              <p className="text-white/50 text-sm">Tap to preview · Rotate to interact</p>
            </div>

            {APP_SCREENS.map((screen, i) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                onClick={() => setActiveApp(i)}
                className={`cursor-pointer glass rounded-2xl p-5 border transition-all duration-300 ${
                  activeApp === i ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
                style={{
                  borderColor: activeApp === i ? screen.color + '60' : 'rgba(255,255,255,0.08)',
                  boxShadow: activeApp === i ? `0 0 30px ${screen.color}20` : 'none',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl border"
                    style={{ background: screen.color + '20', borderColor: screen.color + '40' }}
                  >
                    {i === 0 ? '💪' : i === 1 ? '💰' : '✨'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-orbitron font-bold text-white text-sm">{screen.name}</h4>
                      {activeApp === i && (
                        <span
                          className="font-mono-jet text-xs px-2 py-0.5 rounded-full"
                          style={{ background: screen.color + '20', color: screen.color }}
                        >
                          Preview ▶
                        </span>
                      )}
                    </div>
                    <p className="font-mono-jet text-xs text-white/40">{screen.category}</p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: activeApp === i ? screen.color : 'rgba(255,255,255,0.2)' }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Mobile stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { value: '15+', label: 'Apps Shipped', color: '#00f5ff' },
                { value: '4.8★', label: 'Avg Rating', color: '#bf00ff' },
                { value: '850k+', label: 'Total DLs', color: '#0080ff' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-3 text-center border border-white/10">
                  <div className="font-orbitron font-bold text-lg" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="font-mono-jet text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
