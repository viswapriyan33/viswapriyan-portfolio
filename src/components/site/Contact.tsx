import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionTitle } from "./Reveal";

const DETAILS = [
  {
    icon: Mail,
    title: "Email",
    label: "viswapriyan10@gmail.com",
    href: "mailto:viswapriyan10@gmail.com",
  },
  { icon: Phone, title: "Phone", label: "+91 8610904242", href: "tel:+918610904242" },
  {
    icon: Linkedin,
    title: "LinkedIn",
    label: "linkedin.com/in/viswapriyanr33",
    href: "https://linkedin.com/in/viswapriyanr33",
  },
  {
    icon: Github,
    title: "GitHub",
    label: "github.com/viswapriyan33",
    href: "https://github.com/viswapriyan33",
  },
  { icon: MapPin, title: "Location", label: "Chennai, Tamil Nadu, India" },
];

const ENDPOINT = "https://formsubmit.co/ajax/viswapriyan10@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      toast.error("Please fill in every field before sending.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio enquiry from ${name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("sent");
      form.reset();
      toast.success("Message sent — I will get back to you soon.");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      toast.error("Couldn't send that right now. Please email viswapriyan10@gmail.com directly.");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Contact"
          title="Let's build something together."
          subtitle="Available for freelance full stack projects, internships, and software engineering collaborations."
        />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form className="space-y-5 rounded-3xl p-6 glass md:p-8" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/70"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  maxLength={255}
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/70"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  maxLength={2000}
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/70"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
                  style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
                >
                  <Send className={`h-4 w-4 ${sending ? "animate-pulse" : ""}`} />
                  {sending ? "Sending…" : "Send Message"}
                </button>
                {status === "sent" && (
                  <span className="inline-flex items-center gap-2 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" /> Message delivered
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" /> Something went wrong
                  </span>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="space-y-3">
            {DETAILS.map((d) => {
              const content = (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <d.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {d.title}
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                  </div>
                </>
              );

              if (!d.href) {
                return (
                  <div key={d.title} className="flex items-center gap-4 rounded-2xl p-4 glass">
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={d.title}
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl p-4 glass transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                >
                  {content}
                </a>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
