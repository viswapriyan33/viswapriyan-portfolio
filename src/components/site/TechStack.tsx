import { Reveal, SectionTitle } from "./Reveal";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const STACK = [
  { name: "HTML5", src: `${CDN}/html5/html5-original.svg` },
  { name: "CSS3", src: `${CDN}/css3/css3-original.svg` },
  { name: "JavaScript", src: `${CDN}/javascript/javascript-original.svg` },
  { name: "Python", src: `${CDN}/python/python-original.svg` },
  { name: "Java", src: `${CDN}/java/java-original.svg` },
  { name: "C", src: `${CDN}/c/c-original.svg` },
  { name: "MySQL", src: `${CDN}/mysql/mysql-original.svg` },
  { name: "PostgreSQL", src: `${CDN}/postgresql/postgresql-original.svg` },
  { name: "Firebase", src: `${CDN}/firebase/firebase-plain.svg` },
  { name: "Git", src: `${CDN}/git/git-original.svg` },
  { name: "GitHub", src: `${CDN}/github/github-original.svg`, invert: true },
  { name: "VS Code", src: `${CDN}/vscode/vscode-original.svg` },
  { name: "Figma", src: `${CDN}/figma/figma-original.svg` },
];

export function TechStack() {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Tech Stack" title="Tools I build with." />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:gap-5 lg:grid-cols-5">
          {STACK.map((t, i) => (
            <Reveal key={t.name} delay={(i % 5) * 0.05}>
              <div
                data-cursor
                className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3 glass transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <img
                  src={t.src}
                  alt={`${t.name} logo`}
                  loading="lazy"
                  width={40}
                  height={40}
                  className={`h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 md:h-11 md:w-11 ${
                    t.invert ? "invert" : ""
                  }`}
                />
                <span className="text-center text-[11px] leading-tight text-muted-foreground md:text-xs">{t.name}</span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 40px -8px var(--primary)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
