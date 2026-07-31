import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => {
          setVisible(false);
          doneRef.current();
        }, 300);
      }
    }, 40);
    return () => clearInterval(id);
  }, []);


  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#04060c]"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 font-display text-xl font-bold text-aurora"
              style={{ boxShadow: "var(--shadow-glow)", animation: "pulse 2s ease-in-out infinite" }}
            >
              VR
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Viswapriyan R
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">Loading Experience</p>
            <div className="mt-8 h-px w-56 overflow-hidden bg-border md:w-72">
              <div
                className="h-full"
                style={{ width: `${progress}%`, background: "var(--gradient-aurora)", boxShadow: "0 0 18px var(--primary)" }}
              />
            </div>
            <span className="mt-3 font-mono text-xs text-muted-foreground">{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
