import { GraduationCap, MapPin, Languages, Heart, Sparkles } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const CARDS = [
  { icon: GraduationCap, title: "Education", body: "B.E. Computer Science Engineering — St. Joseph's College of Engineering" },
  { icon: MapPin, title: "Location", body: "Chennai, Tamil Nadu, India" },
  { icon: Languages, title: "Languages", body: "English, Tamil, Telugu" },
  { icon: Heart, title: "Interests", body: "UI Design, Animation, Open Source, Cricket" },
  { icon: Sparkles, title: "Soft Skills", body: "Communication, Teamwork, Adaptability, Problem Solving" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About Me" title="Crafting interfaces with intent." />
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I am <span className="text-foreground">Viswapriyan R</span>, an aspiring Front-End Developer currently
              pursuing Computer Science Engineering at St. Joseph&apos;s College of Engineering.
            </p>
            <p>
              I enjoy building modern, responsive and interactive web applications using the latest technologies.
            </p>
            <p>
              I am passionate about creating exceptional user experiences with beautiful interfaces, animations and
              clean code.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl p-5 glass transition-transform duration-300 hover:-translate-y-1">
                  <c.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
