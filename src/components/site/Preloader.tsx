import { useEffect, useState } from "react";

/**
 * Fast, lightweight entrance reveal driven by CSS animations so first paint
 * is never blocked and the hero becomes interactive within ~750ms.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("vr_intro_seen")) {
      setHidden(true);
      onDone?.();
      return;
    }

    const start = performance.now();
    const duration = 520;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("vr_intro_seen", "1");
        onDone?.();
      }
    };

    raf = requestAnimationFrame(tick);
    const hideTimer = window.setTimeout(() => setHidden(true), 800);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#04060c]">
      <div className="flex flex-col items-center">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 font-display text-lg font-bold text-aurora"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          VR
        </div>
        <p className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Viswapriyan R
        </p>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          Full Stack Developer
        </p>
        <div className="mt-6 h-px w-48 overflow-hidden bg-border md:w-60">
          <div
            className="preloader-bar h-full w-0"
            style={{ background: "var(--gradient-aurora)", boxShadow: "0 0 18px var(--primary)" }}
          />
        </div>
        <span className="mt-2.5 font-mono text-[11px] text-muted-foreground">{count}%</span>
      </div>
    </div>
  );
}
