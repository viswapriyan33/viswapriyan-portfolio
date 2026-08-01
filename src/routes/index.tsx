import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Cursor } from "@/components/site/Cursor";
import { Preloader } from "@/components/site/Preloader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { TechStack } from "@/components/site/TechStack";
import { Projects } from "@/components/site/Projects";
import { Experience, Education } from "@/components/site/Timeline";
import { Certificates, Resume } from "@/components/site/Certificates";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { BackToTop, CommandPalette, ScrollProgress } from "@/components/site/Chrome";

const TITLE = "Viswapriyan R — Front-End Developer Portfolio";
const DESC =
  "Portfolio of Viswapriyan R, aspiring front-end developer at St. Joseph's College of Engineering, building modern, beautiful and interactive web experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <Preloader onDone={() => undefined} />
      <Background />
      <Cursor />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <BackToTop />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
