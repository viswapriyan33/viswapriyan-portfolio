import { useEffect, useRef } from "react";

/**
 * Premium custom cursor: a soft aurora glow, a lerped outline ring and a
 * crisp dot. Runs entirely on rAF + transforms so it never lags or flickers,
 * and stays glued to the pointer while scrolling.
 */
export function Cursor() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const style = document.createElement("style");
    style.textContent = `@media (pointer:fine){ html, body, a, button, [role="button"], input, textarea, select, label, summary { cursor: none !important; } }`;
    document.head.appendChild(style);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let gx = x;
    let gy = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const setVisible = (v: boolean) => {
      visible = v;
      if (root.current) root.current.style.opacity = v ? "1" : "0";
    };

    const hoverTargets = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.(hoverTargets);
      targetScale = el ? 2.1 : 1;
    };

    // Pointer coordinates are viewport-based, so they stay valid on scroll —
    // but the hovered element under the pointer can change, so re-evaluate.
    const onScroll = () => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      targetScale = el?.closest?.(hoverTargets) ? 2.1 : 1;
    };

    const onDown = () => (targetScale = targetScale * 0.7);
    const onUp = () => onScroll();
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      gx += (x - gx) * 0.08;
      gy += (y - gy) * 0.08;
      scale += (targetScale - scale) * 0.18;

      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      if (glow.current)
        glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${0.8 + scale * 0.35})`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
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
        className="absolute left-0 top-0 h-24 w-24 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
          opacity: 0.5,
        }}
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-primary/60"
        style={{ mixBlendMode: "screen", boxShadow: "0 0 18px -2px var(--primary)" }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-neon"
        style={{ boxShadow: "0 0 12px var(--neon)" }}
      />
    </div>
  );
}
