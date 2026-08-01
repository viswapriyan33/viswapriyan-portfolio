import { Reveal, SectionTitle } from "./Reveal";

const EXPERIENCE = [
  { title: "Currently Learning", body: "Advanced React patterns, performance and accessibility." },
  { title: "React & Next.js", body: "Component architecture, routing, data fetching and SSR." },
  { title: "Animations", body: "GSAP timelines, ScrollTrigger and Framer Motion micro-interactions." },
  { title: "Frontend Development", body: "Responsive layouts, design systems and clean, typed code." },
  { title: "Open Source", body: "Contributing to community projects and shipping in public." },
  { title: "Future Internship", body: "Open to front-end internship opportunities in 2026." },
];

const EDUCATION = [
  {
    title: "St. Joseph's College of Engineering",
    subtitle: "Bachelor of Engineering — Computer Science Engineering",
    meta: "Chennai, India",
  },
  {
    title: "Nellai Nadar Matric Higher Secondary School",
    subtitle: "Higher Secondary Education — Computer Science stream",
    meta: "Tamil Nadu, India",
  },
];

function Line({ items }: { items: { title: string; body?: string; subtitle?: string; meta?: string }[] }) {
  return (
    <div className="relative ml-3 border-l border-border pl-8">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.08}>
          <div className="relative mb-8">
            <span
              className="absolute -left-[41px] top-2 h-3 w-3 rounded-full"
              style={{ background: "var(--gradient-aurora)", boxShadow: "0 0 16px var(--primary)" }}
            />
            <div className="rounded-2xl p-5 glass transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              {item.subtitle && <p className="mt-1 text-sm text-primary">{item.subtitle}</p>}
              {item.body && <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>}
              {item.meta && <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{item.meta}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Experience" title="Where I am on the journey." />
        <Line items={EXPERIENCE} />
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Education" title="Academic background." />
        <Line items={EDUCATION} />
      </div>
    </section>
  );
}
