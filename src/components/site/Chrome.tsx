import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { NAV_LINKS } from "./Navbar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent">
      <div className="h-full" style={{ width: `${p}%`, background: "var(--gradient-aurora)" }} />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[80] rounded-full p-3 text-primary-foreground"
          style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow)" }}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_LINKS.map((l) => (
            <CommandItem
              key={l.href}
              onSelect={() => {
                setOpen(false);
                document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {l.label}
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => {
              setOpen(false);
              document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Resume
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => window.open("https://github.com/viswapriyan33", "_blank")}>
            GitHub
          </CommandItem>
          <CommandItem
            onSelect={() => window.open("https://linkedin.com/in/viswapriyanr33", "_blank")}
          >
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://ethyra.in", "_blank")}>
            Ethyra Consulting (Live)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
