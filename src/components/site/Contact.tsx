import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionTitle } from "./Reveal";

const DETAILS = [
  { icon: Mail, label: "viswapriyan10@gmail.com", href: "mailto:viswapriyan10@gmail.com" },
  { icon: Phone, label: "8610904242", href: "tel:8610904242" },
  { icon: Linkedin, label: "linkedin.com/in/viswapriyanr33", href: "https://www.linkedin.com/in/viswapriyanr33" },
  { icon: Github, label: "github.com/viswapriyan33", href: "https://github.com/viswapriyan33" },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Contact" title="Let's build something together." />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form
              className="space-y-4 rounded-3xl p-6 glass md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                setSending(true);
                setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Thanks! Opening your mail app to send the message.");
                  window.location.href = `mailto:viswapriyan10@gmail.com?subject=Portfolio enquiry from ${data.get("name")}&body=${encodeURIComponent(String(data.get("message")))}`;
                }, 700);
              }}
            >
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                <input id="name" name="name" required className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary/70" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary/70" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea id="message" name="message" rows={5} required className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary/70" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
                style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
              >
                <Send className={`h-4 w-4 ${sending ? "animate-pulse" : ""}`} /> {sending ? "Sending" : "Send Message"}
              </button>
            </form>
          </Reveal>
          <Reveal delay={0.1} className="space-y-3">
            {DETAILS.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl p-5 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <d.icon className="h-5 w-5 text-primary" />
                <span className="truncate text-sm">{d.label}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
