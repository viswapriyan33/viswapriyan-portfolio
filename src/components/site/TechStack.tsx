import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Code2,
  Cpu,
  Database,
  Eye,
  Globe,
  KeyRound,
  Layers,
  Server,
  ShieldCheck,
  Terminal,
  Webhook,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type Skill = {
  name: string;
  category: Category;
  src?: string;
  invert?: boolean;
  icon?: LucideIcon;
};

const CATEGORIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "ML & Vision",
  "Tools",
] as const;

type Category = (typeof CATEGORIES)[number];

const SKILLS: Skill[] = [
  // Programming Languages
  { name: "Python", category: "Languages", src: `${CDN}/python/python-original.svg` },
  { name: "Java", category: "Languages", src: `${CDN}/java/java-original.svg` },
  { name: "C (Basics)", category: "Languages", src: `${CDN}/c/c-original.svg` },

  // Frontend Development
  { name: "HTML", category: "Frontend", src: `${CDN}/html5/html5-original.svg` },
  { name: "CSS", category: "Frontend", src: `${CDN}/css3/css3-original.svg` },
  { name: "JavaScript", category: "Frontend", src: `${CDN}/javascript/javascript-original.svg` },
  { name: "React.js", category: "Frontend", src: `${CDN}/react/react-original.svg` },

  // Backend Development
  { name: "Django", category: "Backend", src: `${CDN}/django/django-plain.svg`, invert: true },
  { name: "FastAPI", category: "Backend", src: `${CDN}/fastapi/fastapi-original.svg` },
  { name: "REST APIs", category: "Backend", icon: Webhook },
  { name: "Authentication", category: "Backend", icon: KeyRound },
  { name: "Authorization", category: "Backend", icon: ShieldCheck },

  // Databases
  { name: "PostgreSQL", category: "Databases", src: `${CDN}/postgresql/postgresql-original.svg` },
  { name: "MySQL", category: "Databases", src: `${CDN}/mysql/mysql-original.svg` },

  // Machine Learning & Computer Vision
  { name: "PyTorch", category: "ML & Vision", src: `${CDN}/pytorch/pytorch-original.svg` },
  { name: "YOLO", category: "ML & Vision", icon: Eye },
  { name: "OpenCV", category: "ML & Vision", src: `${CDN}/opencv/opencv-original.svg` },
  { name: "NumPy", category: "ML & Vision", src: `${CDN}/numpy/numpy-original.svg` },
  {
    name: "Scikit-learn",
    category: "ML & Vision",
    src: `${CDN}/scikitlearn/scikitlearn-original.svg`,
  },

  // Tools & Technologies
  { name: "Git", category: "Tools", src: `${CDN}/git/git-original.svg` },
  { name: "GitHub", category: "Tools", src: `${CDN}/github/github-original.svg`, invert: true },
  { name: "VS Code", category: "Tools", src: `${CDN}/vscode/vscode-original.svg` },
  { name: "Postman", category: "Tools", src: `${CDN}/postman/postman-original.svg` },
];

const CATEGORY_GROUPS: { title: Exclude<Category, "All">; icon: LucideIcon }[] = [
  { title: "Languages", icon: Code2 },
  { title: "Frontend", icon: Globe },
  { title: "Backend", icon: Server },
  { title: "Databases", icon: Database },
  { title: "ML & Vision", icon: Cpu },
  { title: "Tools", icon: Wrench },
];

function SkillVisual({ skill }: { skill: Skill }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (skill.src && !imgFailed) {
    return (
      <img
        src={skill.src}
        alt={`${skill.name} logo`}
        loading="lazy"
        decoding="async"
        width={36}
        height={36}
        onError={() => setImgFailed(true)}
        className={`h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9 ${
          skill.invert ? "invert [.light_&]:invert-0" : ""
        }`}
      />
    );
  }

  const IconComponent = skill.icon ?? Terminal;
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
      <IconComponent className="h-5 w-5" />
    </div>
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All" ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Technical Skills"
          title="Languages, frameworks & AI stack."
          subtitle="Core technologies I use across full stack web engineering, API architecture, databases, and computer vision."
        />

        {/* Animated category filter pills */}
        <Reveal className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full border px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  active
                    ? "border-transparent text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skill-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "var(--gradient-aurora)" }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </Reveal>

        {/* Filtered grid */}
        <motion.div
          layout
          className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                data-cursor
                className="group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl p-4 glass transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
              >
                <SkillVisual skill={skill} />
                <span className="text-center text-xs font-medium leading-tight text-foreground">
                  {skill.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {skill.category}
                </span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 36px -10px var(--primary)" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Structured category overview */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GROUPS.map((group, idx) => {
            const items = SKILLS.filter((s) => s.category === group.title);
            const GroupIcon = group.icon;
            return (
              <Reveal key={group.title} delay={idx * 0.04}>
                <div className="h-full rounded-2xl p-5 glass transition-colors hover:border-primary/40">
                  <div className="flex items-center gap-2.5">
                    <GroupIcon className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item.name}
                        className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
