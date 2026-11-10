import { useEffect, useState } from "react";

/**
 * Full-page animated 3D chip/icon backdrop (Spline scene) fixed behind every
 * section from hero to footer. Deferred until after hydration + initial paint
 * so first paint stays instant while the 3D animation fades in smoothly.
 */
export function Background() {
  const [mountScene, setMountScene] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const trigger = () => {
      if (!cancelled) setMountScene(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(trigger, { timeout: 450 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = globalThis.setTimeout(trigger, 250);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden
    >
      {mountScene && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            sceneLoaded ? "opacity-55" : "opacity-0"
          }`}
        >
          <iframe
            src="https://my.spline.design/visualicons-eYWGPEiv7WxwYjQRvsruatQA/"
            title="3D animated chip background"
            loading="lazy"
            onLoad={() => setSceneLoaded(true)}
            className="h-full w-full"
            style={{ border: 0, pointerEvents: "none" }}
          />
          <div className="pointer-events-none absolute bottom-3 right-3 h-10 w-28" aria-hidden />
          {/* Soften the scene so text stays readable across the whole page */}
          <div className="absolute inset-0 bg-background/45" />
        </div>
      )}

      <div
        className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full opacity-20 blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--primary), transparent 65%)",
          animation: "float-orb 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-15%] top-[20%] h-[38rem] w-[38rem] rounded-full opacity-18 blur-[130px] will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--violet), transparent 65%)",
          animation: "float-orb 24s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] h-[34rem] w-[34rem] rounded-full opacity-14 blur-[140px] will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--neon), transparent 65%)",
          animation: "float-orb 30s ease-in-out infinite",
        }}
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
