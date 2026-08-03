import { useState } from "react";
import { Award, BadgeCheck, Download, ExternalLink, FileText } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const LINKEDIN = "https://www.linkedin.com/in/viswapriyanr33";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  url: string;
  logo: string;
  credential?: string;
};

/**
 * Certifications sourced from the LinkedIn profile / issued certificates.
 * Add a new object here to publish another card — nothing else to change.
 */
const CERTIFICATES: Cert[] = [
  {
    title: "Front End Web Developer Certification",
    issuer: "Infosys Springboard",
    date: "September 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "JavaScript",
    issuer: "Infosys Springboard",
    date: "September 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "Networking and Web Technology",
    issuer: "Infosys Springboard",
    date: "September 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "CSS3",
    issuer: "Infosys Springboard",
    date: "August 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "HTML5 — The Language",
    issuer: "Infosys Springboard",
    date: "August 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "Object Oriented Programming using Python",
    issuer: "Infosys Springboard",
    date: "July 2025",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "Programming Fundamentals using Python — Part 1",
    issuer: "Infosys Springboard",
    date: "November 2024",
    url: "https://verify.onwingspan.com",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    title: "Python for Data Science (Elite)",
    issuer: "NPTEL · IIT Madras",
    date: "2025",
    url: "https://nptel.ac.in/noc/E_Certificate",
    logo: "https://logo.clearbit.com/nptel.ac.in",
    credential: "NPTEL25CS60S243307971",
  },
  {
    title: "Demystifying Networking",
    issuer: "NPTEL · IIT Bombay",
    date: "Jul – Aug 2025",
    url: "https://nptel.ac.in/noc/E_Certificate",
    logo: "https://logo.clearbit.com/nptel.ac.in",
    credential: "NPTEL25CS125S633209215",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "July 2025",
    url: "https://www.netacad.com",
    logo: "https://logo.clearbit.com/cisco.com",
  },
  {
    title: "MongoDB Basics for Students",
    issuer: "MongoDB, Inc.",
    date: "October 2025",
    url: "https://learn.mongodb.com",
    logo: "https://logo.clearbit.com/mongodb.com",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE · HP Foundation",
    date: "June 2025",
    url: "https://www.life-global.org",
    logo: "https://logo.clearbit.com/hp.com",
    credential: "565805d7523b495f64db6307f61b5f70",
  },
];

const EVENTS = [
  "MECHOVATE 1.0 — National Level Hackathon",
  "Agentic Hackathon 2025 — CloudElu × iQmath",
  "HACK SYNC — ACM Coding Event, SJCE",
  "GDG on Campus Solution Challenge",
  "GLITCH-HUNT — Debugging & Design Event",
  "CODE-A-THON — Hackerz, CIT",
];

function Logo({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Award className="h-6 w-6 text-primary" />;
  return (
    <img
      src={src}
      alt={`${alt} logo`}
      loading="lazy"
      width={28}
      height={28}
      onError={() => setFailed(true)}
      className="h-7 w-7 rounded-md bg-white/90 object-contain p-0.5"
    />
  );
}

export function Certificates() {
  return (
    <section id="certificates" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Certifications"
          title="Learning, certified."
          subtitle="Courses and credentials listed on my LinkedIn profile — each one verifiable at the issuing organisation."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <article
                className="group relative flex h-full flex-col rounded-3xl p-6 glass transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
                style={{ boxShadow: "0 24px 70px -40px oklch(0.72 0.16 230 / 0.7)" }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 65px -20px var(--primary)" }}
                />
                <div className="flex items-center gap-3">
                  <Logo src={c.logo} alt={c.issuer} />
                  <BadgeCheck className="ml-auto h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.issuer}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.date}</p>
                {c.credential && (
                  <p className="mt-2 truncate text-[11px] text-muted-foreground/80">ID: {c.credential}</p>
                )}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Verify Certificate
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-3xl p-6 glass md:p-7">
            <h3 className="font-display text-lg font-semibold">Hackathons &amp; Technical Events</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {EVENTS.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {e}
                </span>
              ))}
            </div>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs text-primary transition-opacity hover:opacity-80"
            >
              <ExternalLink className="h-3.5 w-3.5" /> See everything on LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Resume() {
  return (
    <section id="resume" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Resume" title="One page, everything that matters." />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl p-8 glass" style={{ boxShadow: "var(--shadow-glow)" }}>
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl font-semibold">Viswapriyan R — Full Stack Developer</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Computer Science Engineering student building full stack web applications with clean, responsive
                interfaces and reliable back ends.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li>• HTML5 · CSS3 · JavaScript · React</li>
                <li>• Python · Java · C · MySQL · PostgreSQL</li>
                <li>• Git · GitHub · Firebase · Figma</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium text-primary-foreground transition-transform hover:scale-[1.04]"
              style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
            >
              <Download className="h-5 w-5" /> Download Resume
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
