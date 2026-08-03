import { useEffect, useRef } from "react";

/**
 * Clean, professional pointer cursor: a crisp arrow that tracks the pointer
 * exactly (no lag), sits on a soft aurora glow and grows slightly over
 * interactive elements. rAF + transforms only, so it never flickers.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const style = document.createElement("style");
    style.textContent = `@media (pointer:fine){ html, body, a, button, [role="button"], input, textarea, select, label, summary { cursor: none !important; } }`;
    document.head.appendChild(style);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const hoverTargets = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const setVisible = (v: boolean) => {
      visible = v;
      if (root.current) root.current.style.opacity = v ? "1" : "0";
    };

    const evaluate = () => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      targetScale = el?.closest?.(hoverTargets) ? 1.35 : 1;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.(hoverTargets);
      targetScale = el ? 1.35 : 1;
    };

    const onDown = () => (targetScale = 0.85);
    const onUp = () => evaluate();
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      gx += (x - gx) * 0.16;
      gy += (y - gy) * 0.16;
      scale += (targetScale - scale) * 0.2;

      if (pointer.current)
        pointer.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      if (glow.current)
        glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${0.85 + scale * 0.3})`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      style.remove();
    };
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[9999] hidden opacity-0 transition-opacity duration-300 md:block"
      aria-hidden
    >
      <div
        ref={glow}
        className="absolute left-0 top-0 h-16 w-16 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)",
          opacity: 0.45,
        }}
      />
      <div
        ref={pointer}
        className="absolute left-0 top-0 origin-top-left"
        style={{ transition: "none" }}
      >
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" style={{ display: "block" }}>
          <path
            d="M2 1.6 L2 21.4 L7.3 16.4 L10.6 24 L14 22.4 L10.8 15.1 L18 15.1 Z"
            fill="var(--foreground)"
            stroke="var(--primary)"
            strokeWidth="1.4"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px var(--primary))" }}
          />
        </svg>
      </div>
    </div>
  );
}
