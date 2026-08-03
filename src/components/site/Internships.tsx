import { useEffect, useRef } from "react";
import { Briefcase, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "./Reveal";

const INTERNSHIPS = [
  {
    company: "Big-Si-Bucks Innovation Private Limited",
    role: "Full Stack Development Intern",
    duration: "02 December 2025 – 31 December 2025",
    mode: "Offline",
    status: "Completed",
    description:
      "Successfully completed a Full Stack Development internship. Worked on real-world projects involving frontend and backend development, collaborated with the development team, strengthened problem-solving skills, and gained practical industry experience.",
  },
  {
    company: "Kaspon Techworks Private Limited",
    role: "Full Stack Development Intern",
    duration: "05 June 2026 – 04 July 2026",
    mode: null as string | null,
    status: "Completed",
    description:
      "Worked on Full Stack Development projects, developed responsive web applications, collaborated with mentors, improved backend and frontend development skills, and gained practical software development experience.",
  },
];

export function Internships() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".internship-card", {
        opacity: 0,
        y: 48,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
      gsap.from(".internship-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });
      gsap.from(".internship-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.18,
        ease: "back.out(2)",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="internships" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Internships"
          title="Industry experience, hands on."
          subtitle="Full stack internships where I shipped real features alongside working development teams."
        />

        <div ref={scope} className="relative ml-3 pl-8 md:pl-10">
          <span
            className="internship-line absolute left-0 top-2 block w-px"
            style={{
              height: "calc(100% - 1rem)",
              background: "linear-gradient(to bottom, var(--primary), var(--violet), transparent)",
              boxShadow: "0 0 18px var(--primary)",
            }}
          />
          {INTERNSHIPS.map((item) => (
            <div key={item.company} className="relative mb-8 last:mb-0">
              <span
                className="internship-dot absolute -left-[38px] top-6 h-3.5 w-3.5 rounded-full md:-left-[46px]"
                style={{ background: "var(--gradient-aurora)", boxShadow: "0 0 20px var(--primary)" }}
              />
              <article
                className="internship-card group rounded-3xl p-6 glass transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 md:p-7"
                style={{ boxShadow: "0 24px 70px -40px oklch(0.72 0.16 230 / 0.7)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight">{item.company}</h3>
                    <p className="mt-1.5 text-sm text-primary">{item.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {item.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> {item.duration}
                  </span>
                  {item.mode && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {item.mode}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" /> Full Stack Development
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 70px -22px var(--primary)" }}
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
