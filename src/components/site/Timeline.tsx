import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const EDUCATION = [
  {
    degree: "B.E. Computer Science and Engineering",
    institution: "St. Joseph's College of Engineering, Chennai",
    score: "CGPA: 7.98/10",
    period: "Graduating May 2028",
  },
  {
    degree: "HSSC (State Board)",
    institution: "Nellai Nadar Matriculation Higher Secondary School, Chennai",
    score: "88.16%",
    period: "Graduated March 2024",
  },
];

export function Education() {
  return (
    <section id="education" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Education"
          title="Academic foundation."
          subtitle="Computer Science Engineering studies paired with strong academic fundamentals."
        />

        <div className="relative ml-3 border-l border-border pl-8 md:pl-10">
          {EDUCATION.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.08}>
              <div className="relative mb-8 last:mb-0">
                <span
                  className="absolute -left-[39px] top-6 h-3.5 w-3.5 rounded-full md:-left-[47px]"
                  style={{
                    background: "var(--gradient-aurora)",
                    boxShadow: "0 0 16px var(--primary)",
                  }}
                />
                <article className="rounded-3xl p-6 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-primary">
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Degree</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                        {item.degree}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/80" />
                        {item.institution}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Award className="h-3.5 w-3.5" /> {item.score}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {item.period}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
