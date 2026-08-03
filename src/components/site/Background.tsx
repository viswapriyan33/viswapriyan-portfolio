import { useEffect, useState } from "react";

/**
 * Full-page animated backdrop. The Spline scene is fixed behind every
 * section (hero → footer) so it never disappears while content scrolls
 * over it. Mounted after hydration so it never blocks first paint.
 */
export function Background() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowScene(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden>
      {showScene && (
        <div className="absolute inset-0 opacity-55">
          <iframe
            src="https://my.spline.design/visualicons-eYWGPEiv7WxwYjQRvsruatQA/"
            title="3D animated background"
            loading="lazy"
            className="h-full w-full"
            style={{ border: 0, pointerEvents: "none" }}
          />
          {/* soften the scene so text stays readable across the whole page */}
          <div className="absolute inset-0 bg-background/45" />
        </div>
      )}

      <div
        className="absolute -left-40 top-[-10%] h-[46rem] w-[46rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)", animation: "float-orb 18s ease-in-out infinite" }}
      />
      <div
        className="absolute right-[-15%] top-[20%] h-[40rem] w-[40rem] rounded-full opacity-35 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--violet), transparent 65%)", animation: "float-orb 24s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] h-[36rem] w-[36rem] rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--neon), transparent 65%)", animation: "float-orb 30s ease-in-out infinite" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
