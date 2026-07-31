import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS } from "./Navbar";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              boxShadow: "0 0 10px var(--primary)",
              animation: `float-orb ${8 + (i % 7) * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="font-display text-lg font-bold text-aurora">Viswapriyan R</span>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Building Modern, Beautiful and Interactive Web Experiences.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://github.com/viswapriyan33" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border p-2 transition-colors hover:border-primary/60">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/viswapriyanr33" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-2 transition-colors hover:border-primary/60">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="mailto:viswapriyan10@gmail.com" aria-label="Email" className="rounded-full border border-border p-2 transition-colors hover:border-primary/60">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted-foreground sm:grid-cols-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} — Designed &amp; Developed by Viswapriyan R
      </p>
    </footer>
  );
}
