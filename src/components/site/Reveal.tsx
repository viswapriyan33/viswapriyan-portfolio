import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="inline-flex items-center gap-2.5">
        <span className="h-px w-6 bg-primary/70" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-3.5 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
