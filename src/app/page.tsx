"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

/* ──────────────────────────────────────────────
   KUSHAL_OS DESKTOP

   Boot intro → shrinks to header.
   Content windows stack below.
   No separate header bar or taskbar.
   ────────────────────────────────────────────── */

export default function Home() {
  return (
    <>

      {/* Intro (name typewriter + cassette rewind) → becomes header */}
      <HeroSection />

      {/* Desktop — content windows */}
      <main className="relative max-w-7xl mx-auto pb-8 pt-12 px-2 md:px-4">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <BlogSection />
        <ContactSection />

        {/* End signature */}
        <div className="text-center py-8 text-[10px] text-fg-faint tracking-[0.3em] uppercase">
          — END OF TAPE —
        </div>
      </main>
    </>
  );
}
