import { useEffect, useRef } from "react";
import { Briefcase, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { SectionTitle } from "./Reveal";

const PROFESSIONAL_EXPERIENCE = [
  {
    company: "Kaspon Techworks Private Limited",
    location: "Chennai",
    role: "Full Stack Development Intern",
    duration: "Jun – Jul 2026",
    focus: "Python & Full Stack Development",
    highlights: [
      "Completed a one-month internship focused on software development training using Python and Full Stack Development.",
    ],
  },
  {
    company: "Big Bucks Innovation Private Limited",
    location: "Chennai",
    role: "Full Stack Developer Intern",
    duration: "Dec 2025",
    focus: "AWS & Scalable Cloud Applications",
    highlights: [
      "Gained hands-on AWS experience in deploying, managing, and optimizing scalable cloud applications and services.",
    ],
  },
];

export function Internships() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = scope.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    const play = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".exp-line",
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 0.75, ease: "power2.out" },
        );
        gsap.fromTo(
          ".exp-dot",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.14,
            ease: "back.out(1.8)",
            delay: 0.1,
          },
        );
        gsap.fromTo(
          ".exp-card",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.14, ease: "power3.out" },
        );
      }, el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { rootMargin: "-60px 0px -60px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="experience" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Professional Experience"
          title="Industry internships, hands on."
          subtitle="Software engineering internships building full stack applications and scalable cloud deployments."
        />

        <div ref={scope} className="relative ml-3 pl-8 md:pl-10">
          <span
            className="exp-line absolute left-0 top-2 block w-px"
            style={{
              height: "calc(100% - 1rem)",
              background: "linear-gradient(to bottom, var(--primary), var(--violet), transparent)",
              boxShadow: "0 0 16px var(--primary)",
            }}
          />

          {PROFESSIONAL_EXPERIENCE.map((item) => (
            <div key={item.company} className="relative mb-8 last:mb-0">
              <span
                className="exp-dot absolute -left-[38px] top-6 h-3.5 w-3.5 rounded-full md:-left-[46px]"
                style={{
                  background: "var(--gradient-aurora)",
                  boxShadow: "0 0 18px var(--primary)",
                }}
              />
              <article
                className="exp-card group relative rounded-3xl p-6 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 md:p-7"
                style={{ boxShadow: "0 20px 60px -38px oklch(0.72 0.16 230 / 0.65)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
                      {item.company}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-primary">{item.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <CalendarDays className="h-3.5 w-3.5" /> {item.duration}
                  </span>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary/80" /> {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-primary/80" /> {item.focus}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 60px -22px var(--primary)" }}
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
