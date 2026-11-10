import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/viswa-cutout.webp";

const ROLES = [
  "Freelance Full Stack Developer",
  "Python & React.js Developer",
  "AI & Computer Vision Engineer",
  "Backend & REST API Architect",
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
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      style={{ transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const title = "Viswapriyan R";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6 pb-14 pt-28 md:pb-16 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <div className="text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground glass"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
            St. Joseph&apos;s College of Engineering · Chennai
          </motion.span>

          <h1 className="mt-6 font-display font-semibold leading-[1.06] tracking-[-0.03em]">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.02 }}
              className="block text-[clamp(1rem,2.6vw,1.45rem)] font-medium text-muted-foreground"
            >
              Hi, I&apos;m
            </motion.span>
            <span className="mt-2 block whitespace-nowrap text-[clamp(2.1rem,7.2vw,4.35rem)]">
              {title.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.012, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-aurora"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="mt-4 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="font-display text-lg font-medium tracking-tight text-primary md:text-xl"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.26 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:mx-0 md:text-base"
          >
            Computer Science undergraduate and Freelance Full Stack Developer building scalable web
            applications, interactive platforms, and data-driven AI solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.26 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start"
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
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium glass transition-colors hover:border-primary/60"
              >
                View Work <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf?v=2"
                download="Viswapriyan_R_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium glass transition-colors hover:border-primary/60"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.25 }}
            className="mt-7 flex items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="https://github.com/viswapriyan33"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border p-2.5 text-muted-foreground glass transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/viswapriyanr33"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2.5 text-muted-foreground glass transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:viswapriyan10@gmail.com"
              aria-label="Email"
              className="rounded-full border border-border p-2.5 text-muted-foreground glass transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="mt-10 hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex"
          >
            <ArrowDown className="h-3.5 w-3.5" /> Scroll
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="relative mx-auto w-full max-w-[14.5rem] sm:max-w-[16.5rem] md:max-w-[18.5rem] lg:max-w-[20rem]"
        >
          <motion.img
            src={profileImg}
            alt="Viswapriyan R — Full Stack Developer"
            width={682}
            height={1091}
            fetchPriority="high"
            decoding="async"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
            className="relative block h-auto w-full select-none object-contain"
            style={{
              maskImage:
                "radial-gradient(ellipse 94% 94% at 49% 40%, #000 64%, rgba(0, 0, 0, 0.55) 82%, transparent 98%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 94% 94% at 49% 40%, #000 64%, rgba(0, 0, 0, 0.55) 82%, transparent 98%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
