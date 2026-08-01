import { useEffect, useState } from "react";

/**
 * Cinematic intro. The reveal is driven purely by CSS animations, so the site
 * is never trapped behind the overlay if JS is slow or blocked.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else onDone?.();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="preloader fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#04060c]">
      <div className="flex flex-col items-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 font-display text-xl font-bold text-aurora"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          VR
        </div>
        <p className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Viswapriyan R</p>
        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">Loading Experience</p>
        <div className="mt-8 h-px w-56 overflow-hidden bg-border md:w-72">
          <div
            className="preloader-bar h-full w-0"
            style={{ background: "var(--gradient-aurora)", boxShadow: "0 0 18px var(--primary)" }}
          />
        </div>
        <span className="mt-3 font-mono text-xs text-muted-foreground">{count}%</span>
      </div>
    </div>
  );
}
