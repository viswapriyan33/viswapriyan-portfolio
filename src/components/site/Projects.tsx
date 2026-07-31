import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Star } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  updated_at: string;
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

function thumbColors(name: string, language: string | null) {
  const base = LANG_COLORS[language ?? ""] ?? "#5b8def";
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = hash % 360;
  return `linear-gradient(135deg, ${base}, hsl(${hue} 80% 55%))`;
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
  });

  const repos = (data ?? []).filter((r) => !r.fork).slice(0, 9);

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Projects"
          title="Selected work, straight from GitHub."
          subtitle="Live repositories fetched from github.com/viswapriyan33."
        />

        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl glass" />
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={(i % 3) * 0.1} className={i === 0 ? "sm:col-span-2" : ""}>
              <article
                data-cursor
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`relative ${i === 0 ? "h-44" : "h-28"} w-full`}
                  style={{ background: thumbColors(repo.name, repo.language) }}
                >
                  <div className="absolute inset-0 bg-background/35" />
                  <span className="absolute bottom-3 left-4 font-display text-lg font-semibold">{repo.name}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {repo.description ?? "No description provided."}
                  </p>
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
                  <div className="mt-5 flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary/60"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-primary-foreground"
                        style={{ background: "var(--gradient-aurora)" }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
