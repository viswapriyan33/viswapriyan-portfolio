import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Globe2,
  Search,
  Sparkles,
  Star,
  X,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  gradient: string;
  metrics: string[];
  stack: string[];
  summary: string;
  highlights: string[];
  githubUrl: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "football-analytics",
    title: "AI Football Detection & Match Analytics System",
    category: "Computer Vision & Deep Learning",
    icon: Activity,
    gradient:
      "linear-gradient(135deg, rgba(14,165,233,0.28), rgba(99,102,241,0.26) 55%, rgba(16,185,129,0.22))",
    metrics: ["97.6% mAP@50", "97.3% Precision", "IoU Tracking"],
    stack: ["Python", "PyTorch", "YOLO", "OpenCV", "NumPy"],
    summary:
      "End-to-end broadcast match video analytics pipeline for multi-class detection, team assignment, ball possession, and sprint speed estimation.",
    highlights: [
      "Built a computer vision pipeline using a custom-trained YOLO model (97.6% mAP@50, 97.3% precision) to detect players, referees, goalkeepers, and footballs in broadcast match videos.",
      "Implemented team classification using HSV masking and K-Means, ball possession tracking, IoU-based player tracking, and camera-motion-compensated sprint speed estimation.",
    ],
    githubUrl: "https://github.com/viswapriyan33",
  },
  {
    id: "marketing-intelligence",
    title: "AI-Powered Multi-Platform Marketing Intelligence & Campaign Optimization Platform",
    category: "Full Stack AI & Analytics",
    icon: BarChart3,
    gradient:
      "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.25) 55%, rgba(236,72,153,0.22))",
    metrics: ["RFM + K-Means", "Response Prediction", "Campaign Analytics"],
    stack: ["React.js", "Python", "FastAPI", "PostgreSQL", "Scikit-learn", "Pandas", "NumPy"],
    summary:
      "Full-stack marketing intelligence suite combining customer clustering, campaign response prediction, content workflows, and multi-channel analytics.",
    highlights: [
      "Developed a marketing platform for customer segmentation, campaign management, content generation, and performance analytics.",
      "Integrated machine learning models for bank campaign response prediction and RFM-based customer segmentation using K-Means clustering.",
      "Built campaign calendars and analytics dashboards to track social media performance, compare campaigns, and generate data-driven recommendations.",
    ],
    githubUrl: "https://github.com/viswapriyan33",
  },
  {
    id: "citizen-science",
    title: "Citizen Science Data Aggregation Platform",
    category: "GraphRAG, Voice AI & Geospatial",
    icon: Globe2,
    gradient:
      "linear-gradient(135deg, rgba(6,182,212,0.28), rgba(124,58,237,0.26) 55%, rgba(56,189,248,0.22))",
    metrics: ["GraphRAG + Gemini", "LiveKit Voice AI", "AQICN Cross-Validation"],
    stack: [
      "Python",
      "FastAPI",
      "Scikit-learn",
      "Google Gemini",
      "LiveKit",
      "SQLite",
      "Scrapy",
      "Next.js",
    ],
    summary:
      "Environmental data aggregation and validation platform powered by ML anomaly detection, GraphRAG intelligence, voice reporting, and geospatial maps.",
    highlights: [
      "Developed a citizen science platform integrating machine learning-based anomaly detection using Scikit-learn and Great Expectations to validate environmental data.",
      "Implemented GraphRAG-powered contextual intelligence using LlamaIndex and Google Gemini, alongside LiveKit voice agents for interactive data reporting.",
      "Built geospatial dashboards and integrated Scrapy-based AQICN data scraping for cross-validation against official environmental data.",
    ],
    githubUrl: "https://github.com/viswapriyan33",
  },
];

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  created_at: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  fork: boolean;
};

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML: "#e34f26",
  CSS: "#2965f1",
  Python: "#3776ab",
  Java: "#f89820",
  C: "#5c6bc0",
};

const SORTS = ["Recently Updated", "Newest", "Most Stars", "A → Z"] as const;
type Sort = (typeof SORTS)[number];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [showGithub, setShowGithub] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<Sort>("Recently Updated");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: async (): Promise<Repo[]> => {
      const res = await fetch(
        "https://api.github.com/users/viswapriyan33/repos?sort=updated&per_page=100",
      );
      if (!res.ok) throw new Error("GitHub request failed");
      return res.json();
    },
    enabled: showGithub,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const repos = useMemo(() => (data ?? []).filter((r) => !r.fork), [data]);

  const languages = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean) as string[]);
    return ["All", ...[...set].sort()];
  }, [repos]);

  const visibleRepos = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = repos.filter((r) => {
      const matchesLang = filter === "All" || r.language === filter;
      const haystack =
        `${r.name} ${r.description ?? ""} ${r.language ?? ""} ${(r.topics ?? []).join(" ")}`.toLowerCase();
      return matchesLang && (!q || haystack.includes(q));
    });
    return [...list].sort((a, b) => {
      switch (sort) {
        case "Newest":
          return +new Date(b.created_at) - +new Date(a.created_at);
        case "Most Stars":
          return b.stargazers_count - a.stargazers_count;
        case "A → Z":
          return a.name.localeCompare(b.name);
        default:
          return +new Date(b.updated_at) - +new Date(a.updated_at);
      }
    });
  }, [repos, query, filter, sort]);

  return (
    <section id="projects" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Featured Projects"
          title="AI, computer vision & full stack systems."
          subtitle="Key engineering projects spanning real-time computer vision, ML-driven marketing analytics, and environmental intelligence."
        />

        {/* Featured Resume Projects */}
        <div className="grid gap-6 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((proj, i) => {
            const Icon = proj.icon;
            return (
              <Reveal key={proj.id} delay={i * 0.08}>
                <article
                  onClick={() => setSelectedProject(proj)}
                  data-cursor
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl glass transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
                  style={{ boxShadow: "0 20px 60px -36px oklch(0.72 0.16 230 / 0.65)" }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: "0 0 60px -18px var(--primary)" }}
                  />

                  {/* Visual banner header */}
                  <div
                    className="relative flex flex-col justify-between p-6"
                    style={{ background: proj.gradient }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5 text-primary" /> {proj.category}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
                      {proj.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.metrics.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded-full bg-background/75 px-2.5 py-0.5 text-[11px] font-medium text-primary backdrop-blur-md"
                        >
                          <Sparkles className="h-2.5 w-2.5" /> {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <ul className="flex-1 space-y-2.5 text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                      {proj.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/85" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-primary/60 hover:text-primary"
                      >
                        Project Details
                      </button>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Collapsible Open Source GitHub Repositories Explorer */}
        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-3xl p-6 glass md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Open Source &amp; GitHub Repositories
                </h3>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  Explore additional public repositories and experiments on
                  github.com/viswapriyan33.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/viswapriyan33"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub Profile
                </a>
                <button
                  type="button"
                  onClick={() => setShowGithub((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                  style={{ background: "var(--gradient-aurora)" }}
                >
                  {showGithub ? (
                    <>
                      Hide Repositories <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Browse Live Repos <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showGithub && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 border-t border-border/60 pt-6">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="relative flex-1">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search repositories, languages, topics…"
                          aria-label="Search repositories"
                          className="h-10 w-full rounded-full border border-border bg-transparent pl-10 pr-4 text-xs outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 md:text-sm"
                        />
                      </label>
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as Sort)}
                        aria-label="Sort repositories"
                        className="h-10 rounded-full border border-border bg-transparent px-4 text-xs outline-none transition-colors focus:border-primary/60 md:text-sm"
                      >
                        {SORTS.map((s) => (
                          <option key={s} value={s} className="bg-card">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {languages.length > 1 && (
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {languages.map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setFilter(l)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                              filter === l
                                ? "border-transparent text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                            style={
                              filter === l ? { background: "var(--gradient-aurora)" } : undefined
                            }
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    )}

                    {isLoading && (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-40 animate-pulse rounded-2xl border border-border/60 bg-card/40"
                          />
                        ))}
                      </div>
                    )}

                    {isError && (
                      <p className="text-sm text-muted-foreground">
                        Unable to fetch repositories right now.{" "}
                        <a
                          href="https://github.com/viswapriyan33"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          Open GitHub directly
                        </a>
                        .
                      </p>
                    )}

                    {!isLoading && !isError && visibleRepos.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No repositories match your search.
                      </p>
                    )}

                    {!isLoading && !isError && visibleRepos.length > 0 && (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleRepos.map((repo) => (
                          <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-background/40 p-4 transition-all hover:-translate-y-1 hover:border-primary/50"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
                                  {repo.name}
                                </h4>
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              </div>
                              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                {repo.description ?? "Public repository on GitHub."}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                              {repo.language && (
                                <span className="inline-flex items-center gap-1.5">
                                  <span
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor:
                                        LANG_COLORS[repo.language] ?? "var(--primary)",
                                    }}
                                  />
                                  {repo.language}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1">
                                <Star className="h-3 w-3" /> {repo.stargazers_count}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Featured Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-background/85 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full border border-border p-2 glass transition-colors hover:border-primary/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 md:p-8" style={{ background: selectedProject.gradient }}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/75 px-3 py-1 text-xs font-medium text-primary">
                  {selectedProject.category}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-foreground">
                  {selectedProject.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-background/75 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedProject.summary}
                </p>

                <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-foreground">
                  Key Engineering Contributions
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {selectedProject.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground"
                    style={{ background: "var(--gradient-aurora)" }}
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm glass transition-colors hover:border-primary/60"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
