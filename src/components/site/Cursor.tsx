import { useEffect, useRef } from "react";

/**
 * Clean, professional pointer cursor: a crisp arrow that tracks the pointer
 * exactly (no lag), sits on a soft aurora glow and grows slightly over
 * interactive elements. rAF + transforms only, so it never flickers.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const outerRing = useRef<HTMLDivElement>(null);
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
      targetScale = el?.closest?.(hoverTargets) ? 1.45 : 1;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.(hoverTargets);
      targetScale = el ? 1.45 : 1;
    };

    const onDown = () => (targetScale = 0.82);
    const onUp = () => evaluate();
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      gx += (x - gx) * 0.18;
      gy += (y - gy) * 0.18;
      scale += (targetScale - scale) * 0.2;

      if (outerRing.current) {
        outerRing.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${1.7 * scale})`;
      }

      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (glow.current) {
        glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${0.9 + scale * 0.6})`;
      }

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
      className="pointer-events-none fixed inset-0 z-[9999] hidden opacity-0 transition-opacity duration-200 md:block"
      aria-hidden
    >
      <div
        ref={glow}
        className="absolute left-0 top-0 rounded-full blur-xl"
        style={{
          width: 28,
          height: 28,
          background: "color-mix(in srgb, var(--primary) 35%, transparent)",
          boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 65%, transparent)",
        }}
      />
      <div
        ref={outerRing}
        className="absolute left-0 top-0 rounded-full border"
        style={{
          width: 26,
          height: 26,
          borderColor: "color-mix(in srgb, var(--primary) 80%, transparent)",
          background: "transparent",
          boxShadow: "0 0 16px color-mix(in srgb, var(--primary) 55%, transparent)",
        }}
      />
      <div
        ref={cursor}
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 12,
          height: 12,
          background: "var(--primary)",
          boxShadow: "0 0 18px color-mix(in srgb, var(--primary) 75%, transparent)",
        }}
      />
    </div>
  );
}
