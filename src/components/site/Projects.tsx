import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, Search, Star, X } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  created_at: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  default_branch: string;
  fork: boolean;
};

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const LANG_ICON: Record<string, string> = {
  JavaScript: `${CDN}/javascript/javascript-original.svg`,
  TypeScript: `${CDN}/typescript/typescript-original.svg`,
  HTML: `${CDN}/html5/html5-original.svg`,
  CSS: `${CDN}/css3/css3-original.svg`,
  Python: `${CDN}/python/python-original.svg`,
  Java: `${CDN}/java/java-original.svg`,
  C: `${CDN}/c/c-original.svg`,
  "C++": `${CDN}/cplusplus/cplusplus-original.svg`,
  PHP: `${CDN}/php/php-original.svg`,
  Dart: `${CDN}/dart/dart-original.svg`,
  Shell: `${CDN}/bash/bash-original.svg`,
  "Jupyter Notebook": `${CDN}/jupyter/jupyter-original.svg`,
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

const SORTS = ["Recently Updated", "Newest", "Oldest", "Most Stars", "A → Z"] as const;
type Sort = (typeof SORTS)[number];

function gradientFor(name: string, language: string | null) {
  const base = LANG_COLORS[language ?? ""] ?? "#5b8def";
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return `linear-gradient(135deg, ${base}55, hsl(${hash % 360} 85% 55% / 0.55) 55%, #7c3aed55)`;
}

/** Repo preview image with graceful fallbacks, ending in a generated cover. */
function Thumb({ repo, tall }: { repo: Repo; tall?: boolean }) {
  const branch = repo.default_branch || "main";
  const raw = `https://raw.githubusercontent.com/${repo.full_name}/${branch}`;
  const candidates = [
    `${raw}/preview.png`,
    `${raw}/banner.png`,
    `${raw}/thumbnail.png`,
    `${raw}/assets/preview.png`,
    `${raw}/public/preview.png`,
    `${raw}/screenshot.png`,
  ];

  const [idx, setIdx] = useState(0);
  const failed = idx >= candidates.length;
  const icon = LANG_ICON[repo.language ?? ""];

  return (
    <div
      className={`relative w-full overflow-hidden ${tall ? "h-52" : "h-40"}`}
      style={{ background: gradientFor(repo.name, repo.language) }}
    >
      <div className="pointer-events-none absolute -left-10 top-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-0 h-28 w-28 rounded-3xl bg-violet/25 blur-2xl" />
      {!failed && (
        <img
          src={candidates[idx]}
          alt={`${repo.name} preview`}
          loading="lazy"
          decoding="async"
          onError={() => setIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
      <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
        <span className="font-display text-lg font-semibold leading-tight">{repo.name}</span>
        {icon && <img src={icon} alt="" loading="lazy" className="h-6 w-6 shrink-0 opacity-90" />}
      </div>
    </div>
  );
}

export function Projects() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: async (): Promise<Repo[]> => {
      const res = await fetch("https://api.github.com/users/viswapriyan33/repos?sort=updated&per_page=100");
      if (!res.ok) throw new Error("GitHub request failed");
      return res.json();
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<Sort>("Recently Updated");
  const [active, setActive] = useState<Repo | null>(null);

  const repos = useMemo(() => (data ?? []).filter((r) => !r.fork), [data]);

  const languages = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean) as string[]);
    return ["All", ...[...set].sort()];
  }, [repos]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = repos.filter((r) => {
      const matchesLang = filter === "All" || r.language === filter;
      const haystack = `${r.name} ${r.description ?? ""} ${r.language ?? ""} ${(r.topics ?? []).join(" ")}`.toLowerCase();
      return matchesLang && (!q || haystack.includes(q));
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "Newest":
          return +new Date(b.created_at) - +new Date(a.created_at);
        case "Oldest":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "Most Stars":
          return b.stargazers_count - a.stargazers_count;
        case "A → Z":
          return a.name.localeCompare(b.name);
        default:
          return +new Date(b.updated_at) - +new Date(a.updated_at);
      }
    });
    return list;
  }, [repos, query, filter, sort]);

  return (
    <section id="projects" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Projects"
          title="Selected work, straight from GitHub."
          subtitle="Every public repository on github.com/viswapriyan33, fetched live — new repos appear automatically."
        />

        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, languages, topics…"
                aria-label="Search projects"
                className="h-11 w-full rounded-full border border-border bg-transparent pl-11 pr-4 text-sm glass outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort projects"
              className="h-11 rounded-full border border-border bg-transparent px-4 text-sm glass outline-none transition-colors focus:border-primary/60"
            >
              {SORTS.map((s) => (
                <option key={s} value={s} className="bg-card">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                  filter === l
                    ? "border-transparent text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                style={filter === l ? { background: "var(--gradient-aurora)" } : undefined}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl glass" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">
            Couldn&apos;t load repositories right now.{" "}
            <a href="https://github.com/viswapriyan33" className="text-primary underline">
              Browse them on GitHub
            </a>
            .
          </p>
        )}

        {!isLoading && !isError && visible.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects match that search.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((repo, i) => (
              <motion.article
                key={repo.id}
                layout
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                data-cursor
                onClick={() => window.open(repo.html_url, "_blank", "noopener")}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
                style={{ boxShadow: "0 20px 60px -30px oklch(0.72 0.16 230 / 0.6)" }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 60px -18px var(--primary)" }}
                />
                <Thumb repo={repo} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-2 min-h-[2.5rem] flex-1 text-sm leading-relaxed text-muted-foreground">
                    {repo.description ?? "No description provided."}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] ?? "var(--primary)" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary/60"
                    >
                      <Github className="h-3.5 w-3.5" /> Repository
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-primary-foreground"
                        style={{ background: "var(--gradient-aurora)" }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(repo);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary/60"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-background/85 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full border border-border p-2 glass transition-colors hover:border-primary/60"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="group">
                <Thumb repo={active} tall />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold">{active.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {active.description ?? "No description provided."}
                </p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">Language</dt>
                    <dd>{active.language ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">Stars</dt>
                    <dd>{active.stargazers_count}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">Latest commit</dt>
                    <dd>{new Date(active.pushed_at ?? active.updated_at).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">Created</dt>
                    <dd>{new Date(active.created_at).toLocaleDateString()}</dd>
                  </div>
                </dl>
                {active.topics && active.topics.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.topics.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={active.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-primary-foreground"
                    style={{ background: "var(--gradient-aurora)" }}
                  >
                    <Github className="h-4 w-4" /> Open Repository
                  </a>
                  {active.homepage && (
                    <a
                      href={active.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm glass transition-colors hover:border-primary/60"
                    >
                      <ExternalLink className="h-4 w-4" /> Visit Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary/60"
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
