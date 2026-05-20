import { useState, useRef, useEffect, type MutableRefObject } from 'react';
import { motion } from 'framer-motion';

const TERMINAL_INTRO = [
  '> Initializing secure connection...',
  '> Connection established ✓',
  '> Welcome to alex.carter/contact',
  '> Type a message or use the quick commands below.',
  '',
];

const QUICK_COMMANDS = [
  { cmd: '--hire', label: 'Open to Work', response: '✓ Great! I\'m currently available for new opportunities. Let\'s schedule a call! 📅' },
  { cmd: '--collab', label: 'Collaborate', response: '✓ Love that! Drop me your project details and we\'ll figure something out 🚀' },
  { cmd: '--freelance', label: 'Freelance', response: '✓ I do take freelance projects! My rate starts at $120/hr. Let\'s talk scope! 💼' },
  { cmd: '--coffee', label: 'Coffee Chat', response: '✓ Always up for a virtual coffee chat! Calendly link: calendly.com/alexcarter ☕' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', handle: '@alexcarter', url: 'https://github.com', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ), color: '#ffffff' },
  { name: 'LinkedIn', handle: 'in/alexcarter-dev', url: 'https://linkedin.com', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ), color: '#0077b5' },
  { name: 'Twitter/X', handle: '@alex_builds', url: 'https://twitter.com', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ), color: '#1da1f2' },
  { name: 'Email', handle: 'alex@carter.dev', url: 'mailto:alex@carter.dev', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ), color: '#00f5ff' },
];

type TerminalLine = { type: 'system' | 'user' | 'response' | 'empty'; text: string };

function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize) || 20;
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -150);
    const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺ";

    let animId: number;
    let frames = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 0, 16, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = yPositions[i];

        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#00ff88';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += fontSize;
        }
      }

      frames++;
      if (frames < 200) {
        animId = requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-20 rounded-b-2xl pointer-events-none bg-[#020010]"
    />
  );
}

export default function ContactSection({ containerRef }: { containerRef?: MutableRefObject<HTMLDivElement | null> }) {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(
    TERMINAL_INTRO.map((t) => ({ type: 'system' as const, text: t }))
  );
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleMatrixComplete = () => {
    setMatrixActive(false);
    addLine({ type: 'system', text: '> OVERRIDE COMPLETE. SYSTEM RECOVERY IN PROCESS...' });
    setTimeout(() => {
      addLine({ type: 'response', text: '✓ Wake up, Neo... The Matrix has you. 🕶️' });
      addLine({ type: 'system', text: '> Secure terminal connection restored.' });
    }, 600);
  };

  const handleCommand = (cmd: string) => {
    const quick = QUICK_COMMANDS.find((q) => q.cmd === cmd);
    if (quick) {
      addLine({ type: 'user', text: `$ ${cmd}` });
      setTimeout(() => addLine({ type: 'response', text: quick.response }), 400);
    } else if (cmd.trim() === '--matrix') {
      addLine({ type: 'user', text: `$ ${cmd}` });
      setTimeout(() => {
        setMatrixActive(true);
      }, 300);
    } else if (cmd.trim()) {
      addLine({ type: 'user', text: `$ ${cmd}` });
      setSending(true);
      setTimeout(() => {
        setSending(false);
        addLine({ type: 'response', text: `✓ Message received! I'll get back to you within 24 hours. Thanks for reaching out! 🎉` });
      }, 1500);
    }
    setInput('');
  };

  const addLine = (line: TerminalLine) => {
    setTerminalLines((prev) => [...prev, line]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handleCommand(input.trim());
  };

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
          <span className="font-mono-jet text-xs uppercase tracking-widest text-[#00f5ff] mb-4 block">// Contact</span>
          <h2
            className="font-orbitron font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Let's <span className="gradient-cyan-purple">Connect</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Have a project in mind? Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl overflow-hidden border border-white/10">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono-jet text-xs text-white/40 ml-2">alex@portfolio:~/contact</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                  <span className="font-mono-jet text-xs text-[#00f5ff]">LIVE</span>
                </div>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="p-4 h-72 overflow-y-auto space-y-1 font-mono-jet text-sm relative"
                onClick={() => inputRef.current?.focus()}
              >
                {matrixActive && <MatrixRain onComplete={handleMatrixComplete} />}

                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${
                      line.type === 'system' ? 'text-white/50' :
                      line.type === 'user' ? 'text-[#00f5ff]' :
                      line.type === 'response' ? 'text-[#00ff88]' : ''
                    }`}
                  >
                    {line.text || '\u00A0'}
                  </motion.div>
                ))}

                {sending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#bf00ff] flex items-center gap-2"
                  >
                    <span>Sending</span>
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                        >.</motion.span>
                      ))}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="border-t border-white/10 p-4 flex items-center gap-3">
                <span className="font-mono-jet text-[#00f5ff] text-sm">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message or command..."
                  className="flex-1 bg-transparent font-mono-jet text-sm text-white placeholder-white/20 outline-none"
                />
                <button
                  type="submit"
                  className="font-mono-jet text-xs px-3 py-1.5 rounded border border-[#00f5ff]/40 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
                >
                  SEND ↵
                </button>
              </form>

              {/* Quick commands */}
              <div className="border-t border-white/10 p-4">
                <div className="font-mono-jet text-xs text-white/30 mb-3 uppercase tracking-widest">Quick Commands</div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_COMMANDS.map((cmd) => (
                    <button
                      key={cmd.cmd}
                      onClick={() => handleCommand(cmd.cmd)}
                      className="font-mono-jet text-xs px-3 py-1.5 rounded border border-[#00f5ff]/20 text-[#00f5ff]/80 hover:border-[#00f5ff]/60 hover:text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all duration-200"
                    >
                      {cmd.cmd}
                      <span className="text-white/30 ml-1">({cmd.label})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social + Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Availability card */}
            <div className="glass rounded-2xl p-6 border border-[#00f5ff]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]" />
                <span className="font-space font-semibold text-white">Available Now</span>
              </div>
              <p className="text-white/60 text-sm mb-4">Open to new opportunities, freelance projects, and exciting collaborations.</p>
              <div className="space-y-2">
                {[
                  { label: 'Response Time', value: '< 24 hours' },
                  { label: 'Timezone', value: 'PST (UTC-8)' },
                  { label: 'Location', value: 'San Francisco, CA' },
                  { label: 'Remote', value: 'Yes, preferred' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-white/40 font-mono-jet text-xs">{item.label}</span>
                    <span className="text-white/80 font-mono-jet text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h4 className="font-orbitron text-white font-semibold text-sm mb-4">Find Me Online</h4>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="text-white/60 group-hover:text-white transition-colors" style={{ color: social.color + 'cc' }}>
                      {social.icon}
                    </div>
                    <div>
                      <div className="font-space text-xs font-semibold text-white">{social.name}</div>
                      <div className="font-mono-jet text-xs text-white/40">{social.handle}</div>
                    </div>
                    <div className="ml-auto text-white/20 group-hover:text-white/60 transition-colors text-xs">→</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-space font-semibold text-black text-sm relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Easter egg hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <p className="font-mono-jet text-xs text-white/20">
            // Psst... try typing{' '}
            <button
              onClick={() => handleCommand('--matrix')}
              className="text-[#00f5ff]/40 hover:text-[#00f5ff] transition-colors"
            >
              --matrix
            </button>
            {' '}in the terminal 🐰
          </p>
        </motion.div>
      </div>
    </div>
  );
}
