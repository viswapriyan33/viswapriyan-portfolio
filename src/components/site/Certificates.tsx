import { Award, FileText, Download } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const CERTIFICATES = [
  { title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2025" },
  { title: "JavaScript Essentials", issuer: "Online Course", year: "2025" },
  { title: "React Fundamentals", issuer: "Online Course", year: "2026" },
];

export function Certificates() {
  return (
    <section id="certificates" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certifications" title="Learning, certified." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl p-6 glass transition-all duration-300 hover:-translate-y-2">
                <Award className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{c.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Resume() {
  return (
    <section id="resume" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Resume" title="One page, everything that matters." />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl p-8 glass" style={{ boxShadow: "var(--shadow-glow)" }}>
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl font-semibold">Viswapriyan R — Front-End Developer</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Computer Science Engineering student focused on React, TypeScript and motion-rich interfaces.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li>• React · Next.js · TypeScript · Tailwind CSS</li>
                <li>• GSAP · Framer Motion · Responsive UI</li>
                <li>• Git · GitHub · Firebase · Node.js</li>
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
