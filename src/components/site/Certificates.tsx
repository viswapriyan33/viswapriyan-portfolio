import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Eye,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const LINKEDIN = "https://linkedin.com/in/viswapriyanr33";
const RESUME_URL = "/resume.pdf?v=2";
const RESUME_FILENAME = "Viswapriyan_R_Resume.pdf";

type Cert = {
  title: string;
  issuer: string;
  badge: string;
  tier?: string;
};

const CERTIFICATES: Cert[] = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Coursera",
    badge: "Professional Certificate",
  },
  {
    title: "Demystifying Network",
    issuer: "NPTEL",
    badge: "Networking",
    tier: "NPTEL Elite",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    badge: "Data Science",
    tier: "NPTEL Elite",
  },
  {
    title: "Database Management System",
    issuer: "NPTEL",
    badge: "Databases",
  },
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    badge: "AI Foundations",
    tier: "Certified",
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Certifications"
          title="Verified credentials & continuous learning."
          subtitle="Industry-recognized certifications in front-end engineering, Python, databases, networking, and agentic AI."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.06}>
              <article
                className="group relative flex h-full flex-col justify-between rounded-3xl p-6 glass transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
                style={{ boxShadow: "0 20px 60px -38px oklch(0.72 0.16 230 / 0.65)" }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 55px -20px var(--primary)" }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    {cert.tier ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                        <Sparkles className="h-3 w-3" /> {cert.tier}
                      </span>
                    ) : (
                      <BadgeCheck className="h-5 w-5 text-primary/80" />
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-primary">{cert.issuer}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary/70" /> {cert.badge}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-8 flex justify-start">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground glass transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5 text-primary" /> View all credentials on LinkedIn
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [shouldLoadPdf, setShouldLoadPdf] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoadPdf(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadPdf(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePreview = () => {
    setShouldLoadPdf(true);
    setShowPreview((v) => !v);
  };

  return (
    <section ref={sectionRef} id="resume" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Resume"
          title="Everything in one concise page."
          subtitle="View or download the official PDF copy of my academic, internship, freelance, and project profile."
        />
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div
              className="rounded-3xl p-7 glass md:p-8"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/35 bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Viswapriyan R — Full Stack Developer
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    B.E. CSE (CGPA: 7.98/10) · Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Computer Science undergraduate and Full Stack Developer experienced in building
                responsive web applications, REST APIs, authentication systems, automated reporting
                platforms, and machine learning solutions.
              </p>

              <div className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                <p>• Python · Java · C (Basics) · JavaScript · React.js</p>
                <p>• Django · FastAPI · REST APIs · PostgreSQL · MySQL</p>
                <p>• PyTorch · YOLO · OpenCV · NumPy · Scikit-learn</p>
                <p>• Git · GitHub · VS Code · Postman · AWS</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col items-center justify-center gap-3">
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
            >
              <Download className="h-5 w-5" /> Download Resume (PDF)
            </a>

            <div className="flex w-full max-w-xs items-center justify-center gap-2.5">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-foreground glass transition-colors hover:border-primary/60 hover:text-primary"
              >
                <ExternalLink className="h-3.5 w-3.5 text-primary" /> Open PDF
              </a>
              <button
                type="button"
                onClick={togglePreview}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-foreground glass transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Eye className="h-3.5 w-3.5 text-primary" />
                {showPreview ? "Hide Preview" : "Preview PDF"}
                {showPreview ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <span className="text-xs text-muted-foreground">Official One-Page Resume (2026)</span>
          </Reveal>
        </div>

        <AnimatePresence initial={false}>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 overflow-hidden rounded-3xl border border-border/80 glass"
              style={{ boxShadow: "0 20px 60px -36px oklch(0.72 0.16 230 / 0.55)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5 text-xs">
                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  {RESUME_FILENAME}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary transition-opacity hover:opacity-80"
                  >
                    Open Fullscreen <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Save Copy <Download className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {shouldLoadPdf ? (
                <div className="bg-background/40 p-2 sm:p-4">
                  <object
                    data={`${RESUME_URL}#view=FitH`}
                    type="application/pdf"
                    aria-label="Viswapriyan R Resume PDF Preview"
                    className="h-[520px] w-full rounded-2xl border border-border/50 bg-white sm:h-[720px] lg:h-[820px]"
                  >
                    <div className="flex h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-background/60 p-6 text-center">
                      <FileText className="h-8 w-8 text-primary" />
                      <p className="max-w-md text-sm text-muted-foreground">
                        Inline PDF preview isn&apos;t supported in this mobile browser view. Open or
                        download the PDF directly using the buttons below.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2.5">
                        <a
                          href={RESUME_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium text-primary-foreground"
                          style={{ background: "var(--gradient-aurora)" }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Open Resume PDF
                        </a>
                        <a
                          href={RESUME_URL}
                          download={RESUME_FILENAME}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-medium glass"
                        >
                          <Download className="h-3.5 w-3.5" /> Download PDF
                        </a>
                      </div>
                    </div>
                  </object>
                </div>
              ) : (
                <div className="flex h-[240px] items-center justify-center text-xs text-muted-foreground">
                  Preparing resume preview…
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
