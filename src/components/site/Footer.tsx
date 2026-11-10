import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { NAV_LINKS } from "./Navbar";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="font-display text-lg font-bold text-aurora">Viswapriyan R</span>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Computer Science Undergraduate &amp; Freelance Full Stack Developer building scalable
            web applications and AI-driven solutions.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/viswapriyan33"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/60"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/viswapriyanr33"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/60"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:viswapriyan10@gmail.com"
              aria-label="Email"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/60"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="tel:+918610904242"
              aria-label="Phone"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/60"
            >
              <Phone className="h-4 w-4" />
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
        © {new Date().getFullYear()} Viswapriyan R · Chennai, India
      </p>
    </footer>
  );
}
