import { useState, Suspense, lazy, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';

// Lazy load heavy sections
const ThreeScene = lazy(() => import('./components/ThreeScene'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const MobileShowcase = lazy(() => import('./components/MobileShowcase'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

type Section = 'hero' | 'projects' | 'mobile' | 'skills' | 'experience' | 'contact';

const SECTIONS: Section[] = ['hero', 'projects', 'mobile', 'skills', 'experience', 'contact'];

// ─── Particle Background ────────────────────────────────────────────────────

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#00f5ff', '#bf00ff', '#0080ff', '#ff0080'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // O(n²) connection lines — acceptable for 80 particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 100) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
// FIX: Added pointer-events-none when inactive to prevent click-through bugs

interface SectionWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

function SectionWrapper({ children, isActive, scrollRef }: SectionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 overflow-y-auto"
          style={{ paddingBottom: '80px' }}
          // FIX: Attach the shared scroll ref so App.tsx wheel handler can read it
          ref={(el) => {
            if (isActive) {
              (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Section>('hero');
  const [transitioning, setTransitioning] = useState(false);

  // FIX: sectionScrollRef is now properly populated via SectionWrapper's ref callback
  const sectionScrollRef = useRef<HTMLDivElement | null>(null);

  // FIX: Wrapped in useCallback so it's stable across renders and safe in effect deps
  const navigateTo = useCallback(
    (section: string) => {
      if (transitioning || section === active) return;
      setTransitioning(true);
      setTimeout(() => {
        setActive(section as Section);
        setTransitioning(false);
      }, 100);
    },
    [transitioning, active]
  );

  // ── Keyboard navigation ──────────────────────────────────────────────────
  // FIX: navigateTo is now a stable useCallback dep, so this is safe
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const idx = SECTIONS.indexOf(active);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)];
        if (next) navigateTo(next);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = SECTIONS[Math.max(idx - 1, 0)];
        if (prev) navigateTo(prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, navigateTo]); // FIX: navigateTo added to deps

  // ── Wheel & Touch navigation with debounce ───────────────────────────────
  const lastTransitionTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ignore if a modal is open
      const isModalOpen = !!document.querySelector('.project-modal') || !!document.querySelector('[role="dialog"]');
      if (isModalOpen) return;

      const scrollContainer = sectionScrollRef.current;
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 4;
        const canScrollUp = scrollTop > 4;

        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      const now = Date.now();
      if (now - lastTransitionTime.current < 1000) return;

      const idx = SECTIONS.indexOf(active);
      if (e.deltaY > 30) {
        const next = SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)];
        if (next && next !== active) {
          lastTransitionTime.current = now;
          navigateTo(next);
        }
      } else if (e.deltaY < -30) {
        const prev = SECTIONS[Math.max(idx - 1, 0)];
        if (prev && prev !== active) {
          lastTransitionTime.current = now;
          navigateTo(prev);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [active, navigateTo]);

  // ── Touch swipe navigation ───────────────────────────────────────────────
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const isModalOpen = !!document.querySelector('.project-modal') || !!document.querySelector('[role="dialog"]');
      if (isModalOpen) return;

      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const isModalOpen = !!document.querySelector('.project-modal') || !!document.querySelector('[role="dialog"]');
      if (isModalOpen) return;

      const deltaX = touchStart.current.x - e.changedTouches[0].clientX;
      const deltaY = touchStart.current.y - e.changedTouches[0].clientY;

      // Check if it's primarily a vertical swipe and exceeds threshold (50px)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        const scrollContainer = sectionScrollRef.current;
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const canScrollDown = scrollTop + clientHeight < scrollHeight - 10;
          const canScrollUp = scrollTop > 10;

          if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
            return;
          }
        }

        const now = Date.now();
        if (now - lastTransitionTime.current < 1000) return;

        const idx = SECTIONS.indexOf(active);
        if (deltaY > 0) {
          const next = SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)];
          if (next && next !== active) {
            lastTransitionTime.current = now;
            navigateTo(next);
          }
        } else {
          const prev = SECTIONS[Math.max(idx - 1, 0)];
          if (prev && prev !== active) {
            lastTransitionTime.current = now;
            navigateTo(prev);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [active, navigateTo]);


  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#020010' }}>
      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 z-0" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,80,160,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Particle canvas */}
      <ParticleBackground />

      {/* 3D scene — always mounted, fades to subtle when not on hero */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: active === 'hero' ? 1 : 0.15 }}
      >
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      </div>

      {/* Navigation */}
      {!loading && <Navigation active={active} onNavigate={navigateTo} />}

      {/* Section layer */}
      {!loading && (
        <div className="absolute inset-0 z-10">

          {/* Hero section */}
          {/* FIX: Added key prop so AnimatePresence exit animation triggers correctly */}
          <AnimatePresence>
            {active === 'hero' && (
              <HeroSection key="hero" onNavigate={navigateTo} />
            )}
          </AnimatePresence>

          {/* Dark backdrop for non-hero sections */}
          <AnimatePresence mode="wait">
            {active !== 'hero' && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-20"
                style={{
                  background: 'rgba(2,0,16,0.85)',
                  backdropFilter: 'blur(8px)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Content panels */}
          {/* FIX: pointer-events-none wrapper prevents inactive panels from eating clicks */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* FIX: Each SectionWrapper receives the shared scrollRef so the wheel
                handler can detect inner scroll position for any active section */}

            <div className={active === 'projects' ? 'pointer-events-auto absolute inset-0' : 'absolute inset-0'}>
              <SectionWrapper isActive={active === 'projects'} scrollRef={sectionScrollRef}>
                <Suspense fallback={<SectionSkeleton />}>
                  <ProjectsSection containerRef={sectionScrollRef} />
                </Suspense>
              </SectionWrapper>
            </div>

            <div className={active === 'mobile' ? 'pointer-events-auto absolute inset-0' : 'absolute inset-0'}>
              <SectionWrapper isActive={active === 'mobile'} scrollRef={sectionScrollRef}>
                <Suspense fallback={<SectionSkeleton />}>
                  <MobileShowcase containerRef={sectionScrollRef} />
                </Suspense>
              </SectionWrapper>
            </div>

            <div className={active === 'skills' ? 'pointer-events-auto absolute inset-0' : 'absolute inset-0'}>
              <SectionWrapper isActive={active === 'skills'} scrollRef={sectionScrollRef}>
                <Suspense fallback={<SectionSkeleton />}>
                  <SkillsSection containerRef={sectionScrollRef} />
                </Suspense>
              </SectionWrapper>
            </div>

            <div className={active === 'experience' ? 'pointer-events-auto absolute inset-0' : 'absolute inset-0'}>
              <SectionWrapper isActive={active === 'experience'} scrollRef={sectionScrollRef}>
                <Suspense fallback={<SectionSkeleton />}>
                  <ExperienceSection containerRef={sectionScrollRef} />
                </Suspense>
              </SectionWrapper>
            </div>

            <div className={active === 'contact' ? 'pointer-events-auto absolute inset-0' : 'absolute inset-0'}>
              <SectionWrapper isActive={active === 'contact'} scrollRef={sectionScrollRef}>
                <Suspense fallback={<SectionSkeleton />}>
                  <ContactSection containerRef={sectionScrollRef} />
                </Suspense>
              </SectionWrapper>
            </div>
          </div>
        </div>
      )}

      {/* Section transition flash */}
      {/* FIX: z-[9999] uses valid Tailwind arbitrary-value syntax (was z-9999) */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-[9999] pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(191,0,255,0.1))',
            }}
          />
        )}
      </AnimatePresence>

      {/* Section dot indicators */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2"
        >
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => navigateTo(s)}
              aria-label={`Navigate to ${s}`}
              className={`transition-all duration-300 rounded-full ${
                active === s
                  ? 'w-6 h-2 bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Section Skeleton ─────────────────────────────────────────────────────────

function SectionSkeleton() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-2 border-white/20 border-t-[#00f5ff] rounded-full"
        />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
          Loading…
        </span>
      </div>
    </div>
  );
}