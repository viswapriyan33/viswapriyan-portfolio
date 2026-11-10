import {
  Award,
  BadgeCheck,
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const LINKEDIN = "https://linkedin.com/in/viswapriyanr33";

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
    badge: "Course Certification",
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
    tier: "NPTEL Elite",
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
  return (
    <section id="resume" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Resume"
          title="Everything in one concise page."
          subtitle="Download a clean PDF copy of my complete academic, freelance, internship, and project profile."
        />
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
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
                    B.E. CSE (CGPA: 7.98) · Chennai, India
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Computer Science undergraduate and Freelance Full Stack Developer experienced in
                client-focused web applications, REST APIs, authentication workflows, automated
                reporting, and ML/computer vision pipelines.
              </p>

              <div className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                <p>• Python · Java · C · JavaScript · React.js</p>
                <p>• Django · FastAPI · REST APIs · PostgreSQL · MySQL</p>
                <p>• PyTorch · YOLO · OpenCV · NumPy · Scikit-learn</p>
                <p>• Git · GitHub · VS Code · Postman · AWS</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col items-center justify-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
            >
              <Download className="h-5 w-5" /> Download Resume (PDF)
            </a>
            <span className="text-xs text-muted-foreground">Updated for 2026</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
