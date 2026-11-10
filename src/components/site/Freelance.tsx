import { ArrowUpRight, CheckCircle2, Globe, Sparkles } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

type FreelanceProject = {
  client: string;
  subtitle: string;
  role: string;
  liveUrl?: string;
  liveLabel?: string;
  badge: string;
  highlights: string[];
  tags: string[];
};

const FREELANCE_WORK: FreelanceProject[] = [
  {
    client: "Ethyra Consulting Services",
    subtitle: "Official Website",
    role: "Freelance Full Stack Developer",
    liveUrl: "https://ethyra.in",
    liveLabel: "ethyra.in",
    badge: "Live Production",
    highlights: [
      "Developed a responsive multi-page consultancy website featuring service pages, interactive content, and engagement experiences for CSR teams, NGOs, and development organisations.",
      "Engineered an interactive 3D storybook with realistic page-turn animations, optical loupe interactions, and keyboard, touch, and click navigation.",
      "Optimized navigation using speculative link prefetching and configured Cloudflare Pages caching for improved performance and asset delivery.",
    ],
    tags: [
      "Multi-Page Web",
      "Interactive 3D Storybook",
      "Optical Loupe",
      "Speculative Prefetching",
      "Cloudflare Pages",
    ],
  },
  {
    client: "Rajmuni Civil Work Agency",
    subtitle: "Thermal & Seepage Inspection Portal",
    role: "Freelance Full Stack Developer",
    badge: "Client Platform",
    highlights: [
      "Developed a React-based inspection portal with separate Employee and Admin authentication workflows and a guided 7-step civil inspection form.",
      "Implemented employee submission synchronization, inspection management, and persistent browser-based storage for centralized administrative access.",
      "Built an interactive A4 report editor supporting thermal image comparisons, multi-page PDF generation, and editable Word document exports.",
    ],
    tags: [
      "React.js",
      "Employee & Admin Auth",
      "7-Step Inspection Form",
      "A4 Report Editor",
      "PDF & Word Export",
    ],
  },
  {
    client: "ETHYRA Impact",
    subtitle: "NGO Readiness & CSR Due Diligence Platform",
    role: "Freelance Full Stack Developer",
    badge: "Full Stack SaaS",
    highlights: [
      "Developed a full-stack NGO assessment platform evaluating 57 diagnostic criteria across 8 weighted compliance and governance pillars, with dynamic scoring and readiness classification.",
      "Built interactive analytics dashboards and a programmatic 8-page PDF report generator with compliance checklists and visualizations using Recharts and jsPDF.",
      "Implemented UPI payment submission and admin verification workflows with automated email notifications and PDF report delivery using Nodemailer.",
    ],
    tags: [
      "Full Stack",
      "57 Diagnostic Criteria",
      "Recharts",
      "jsPDF (8-Page Report)",
      "UPI Verification",
      "Nodemailer",
    ],
  },
];

export function Freelance() {
  return (
    <section id="freelance" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Freelance Experience"
          title="Client-focused platforms, shipped end to end."
          subtitle="Production web applications, inspection workflows, and automated due diligence systems built for real-world organizations."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {FREELANCE_WORK.map((item, idx) => (
            <Reveal key={item.client} delay={idx * 0.08}>
              <article
                className="group relative flex h-full flex-col rounded-3xl p-6 glass transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 md:p-7"
                style={{ boxShadow: "0 20px 60px -38px oklch(0.72 0.16 230 / 0.65)" }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 60px -20px var(--primary)" }}
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                    <Sparkles className="h-3 w-3" /> {item.badge}
                  </span>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                    >
                      <Globe className="h-3 w-3 text-primary" />
                      {item.liveLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <div className="mt-5">
                  <h3 className="font-display text-xl font-semibold leading-snug text-foreground">
                    {item.client}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">{item.subtitle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
