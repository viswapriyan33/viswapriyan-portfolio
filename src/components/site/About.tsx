import { GraduationCap, MapPin, Languages, Layers, Cpu } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Education",
    body: "B.E. Computer Science & Engineering · St. Joseph's College of Engineering, Chennai (CGPA: 7.98 · May 2028)",
  },
  {
    icon: Layers,
    title: "Full Stack Engineering",
    body: "Client-focused web platforms, REST APIs, authentication workflows, performance optimization & automated reporting",
  },
  {
    icon: Cpu,
    title: "ML & Computer Vision",
    body: "Custom YOLO detection models, GraphRAG contextual intelligence & data-driven analytics pipelines",
  },
  {
    icon: MapPin,
    title: "Location",
    body: "Chennai, Tamil Nadu, India",
  },
  {
    icon: Languages,
    title: "Languages",
    body: "English, Tamil, Telugu",
  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About Me" title="Building scalable, user-oriented software." />
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <Reveal className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            <p>
              I am <span className="font-medium text-foreground">Viswapriyan R</span>, a Computer
              Science undergraduate and Freelance Full Stack Developer with experience developing
              client-focused web applications, interactive platforms, and data-driven solutions.
            </p>
            <p>
              Skilled in{" "}
              <span className="text-foreground">Python, Java, React.js, Django, FastAPI,</span> and{" "}
              <span className="text-foreground">PostgreSQL</span>, I have hands-on experience
              designing REST APIs, role-based authentication, multi-step application workflows,
              performance optimization, and automated PDF and Word reporting systems.
            </p>
            <p>
              Alongside full stack engineering, I work with machine learning and computer vision
              pipelines using <span className="text-foreground">PyTorch, YOLO, OpenCV,</span> and{" "}
              <span className="text-foreground">Scikit-learn</span> to solve real-world analytical
              problems.
            </p>
          </Reveal>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className={i === 0 ? "sm:col-span-2" : ""}>
                <div className="h-full rounded-2xl p-5 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
