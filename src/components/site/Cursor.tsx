import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const style = document.createElement("style");
    style.textContent = `@media (pointer:fine){ body, a, button, [role="button"], input, textarea { cursor: none !important; } }`;
    document.head.appendChild(style);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const el = (e.target as HTMLElement)?.closest("a, button, [data-cursor]");
      setHover(Boolean(el));
    };
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const click = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 600);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      cancelAnimationFrame(raf);
      style.remove();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <div
        ref={ring}
        className="absolute left-0 top-0 rounded-full border border-primary/70 transition-[width,height,opacity,background-color] duration-300"
        style={{
          width: hover ? 56 : 34,
          height: hover ? 56 : 34,
          mixBlendMode: "screen",
          backgroundColor: hover ? "color-mix(in oklab, var(--primary) 18%, transparent)" : "transparent",
          boxShadow: "0 0 24px -4px var(--primary)",
        }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-neon"
        style={{ boxShadow: "0 0 12px var(--neon)" }}
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-primary/60"
          style={{
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            transform: "translate(-50%,-50%)",
            animation: "ripple 600ms ease-out forwards",
          }}
        />
      ))}
      <style>{`@keyframes ripple { to { width: 120px; height: 120px; opacity: 0; } }`}</style>
    </div>
  );
}
