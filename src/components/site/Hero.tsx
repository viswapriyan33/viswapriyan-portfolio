import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import profileImg from "@/assets/viswa-cutout.png";

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
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    const s = setTimeout(() => setShowScene(true), 1200);
    return () => {
      clearInterval(t);
      clearTimeout(s);
    };
  }, []);

  const title = "Viswapriyan R";

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:pt-24">
      <div className="absolute inset-0 -z-[5] opacity-60">
        {showScene && (
          <iframe
            src="https://my.spline.design/visualicons-eYWGPEiv7WxwYjQRvsruatQA/"
            title="3D scene"
            loading="lazy"
            className="h-full w-full"
            style={{ border: 0, pointerEvents: "none" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
      </div>


      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <div className="text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground glass"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> St. Joseph&apos;s College of Engineering
          </motion.span>

          <h1 className="mt-6 font-display font-semibold leading-[1.05] tracking-[-0.03em]">
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8 }}
              className="block text-[clamp(1.15rem,3.4vw,1.75rem)] font-medium text-muted-foreground"
            >
              Hi, I&apos;m
            </motion.span>
            <span className="mt-2 block whitespace-nowrap text-[clamp(2.1rem,8.6vw,4.75rem)]">
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
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:mx-0"
          >
            Building Modern, Beautiful and Interactive Web Experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start"
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
            className="mt-14 hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex"
          >
            <ArrowDown className="h-4 w-4" /> Scroll
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mx-auto w-full max-w-[22rem] md:max-w-none"
        >
          {/* ambient light behind the subject so the cut-out sits inside the scene */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[8%] -z-10 mx-auto aspect-square w-[85%] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--primary), transparent 68%)", opacity: 0.35 }}
          />
          <div
            className="pointer-events-none absolute inset-x-8 bottom-[6%] -z-10 h-24 rounded-full blur-2xl"
            style={{ background: "radial-gradient(ellipse, var(--violet), transparent 70%)", opacity: 0.35 }}
          />
          <motion.img
            src={profileImg}
            alt="Viswapriyan R, front-end developer, in a navy blue suit"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="relative w-full select-none object-contain"
            style={{
              filter: "drop-shadow(0 30px 60px oklch(0.16 0.03 265 / 0.85)) drop-shadow(0 0 45px oklch(0.72 0.16 230 / 0.28))",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 74%, transparent 98%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 74%, transparent 98%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
