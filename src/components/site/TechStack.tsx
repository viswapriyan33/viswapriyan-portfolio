import { Reveal, SectionTitle } from "./Reveal";

const STACK = [
  { name: "HTML", color: "#e34f26" },
  { name: "CSS", color: "#2965f1" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "GSAP", color: "#88ce02" },
  { name: "Framer Motion", color: "#ff5f57" },
  { name: "Git", color: "#f05032" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Node.js", color: "#68a063" },
  { name: "Express", color: "#cccccc" },
  { name: "Python", color: "#3776ab" },
  { name: "Java", color: "#f89820" },
  { name: "C", color: "#5c6bc0" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "VS Code", color: "#007acc" },
  { name: "Figma", color: "#a259ff" },
];

export function TechStack() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Tech Stack" title="Tools I build with." />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {STACK.map((t, i) => (
            <Reveal key={t.name} delay={(i % 5) * 0.05}>
              <div
                className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl glass transition-all duration-300 hover:-translate-y-2 hover:rotate-3"
                style={{ ["--tw" as string]: t.color }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${t.color}22`, color: t.color, boxShadow: `0 0 0 1px ${t.color}44` }}
                >
                  {t.name.slice(0, 2)}
                </span>
                <span className="px-1 text-center text-[11px] text-muted-foreground">{t.name}</span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `0 0 40px -8px ${t.color}` }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
