import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import profileImg from "@/assets/profile.png";

const ROLES = [
  "Aspiring Front-End Developer",
  "React Developer",
  "JavaScript Developer",
  "UI Enthusiast",
  "Problem Solver",
];

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="inline-block"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      style={{ transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);

  const title = "Viswapriyan R";

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:pt-24">
      <div className="absolute inset-0 -z-[5] opacity-60">
        <iframe
          src="https://my.spline.design/visualicons-eYWGPEiv7WxwYjQRvsruatQA/"
          title="3D scene"
          loading="lazy"
          className="h-full w-full"
          style={{ border: 0, pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground glass"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> St. Joseph&apos;s College of Engineering
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8 }}
              className="block text-muted-foreground"
            >
              Hi, I&apos;m
            </motion.span>
            <span className="mt-2 block">
              {title.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.25 + i * 0.035, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-aurora"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="mt-5 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="font-display text-lg text-primary md:text-xl"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-5 max-w-md text-base text-muted-foreground"
          >
            Building Modern, Beautiful and Interactive Web Experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
              >
                <Mail className="h-4 w-4" /> Hire Me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#resume"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium glass transition-colors hover:border-primary/60"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="mt-14 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <ArrowDown className="h-4 w-4" /> Scroll
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)", opacity: 0.4 }}
          />
          <button
            data-cursor
            onClick={() => setModal(true)}
            aria-label="View larger portrait"
            className="group relative block w-full overflow-hidden rounded-[2rem] border border-primary/30"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <img
              src={profileImg}
              alt="Viswapriyan R, front-end developer, in a navy blue suit"
              className="w-full transition-transform duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/85 p-6 backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={profileImg}
              alt="Viswapriyan R portrait enlarged"
              className="max-h-[85vh] rounded-3xl border border-primary/30"
              style={{ boxShadow: "var(--shadow-glow)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
