"use client";

import React from "react";
import CRTOverlay from "@/components/CRTOverlay";
import RetroBootScreen from "@/components/RetroBootScreen";
import AboutWindow from "@/components/AboutWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import TerminalWindow from "@/components/TerminalWindow";
import NotepadWindow from "@/components/NotepadWindow";

/* ──────────────────────────────────────────────
   KUSHAL_OS DESKTOP

   Boot intro → shrinks to header.
   Content windows stack below.
   No separate header bar or taskbar.
   ────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* CRT scanline overlay */}
      <CRTOverlay />

      {/* Intro (name typewriter + cassette rewind) → becomes header */}
      <RetroBootScreen />

      {/* Desktop — content windows */}
      <main className="relative max-w-5xl mx-auto pb-8 pt-4">
        <AboutWindow />
        <ProjectsWindow />
        <TerminalWindow />
        <NotepadWindow />

        {/* End signature */}
        <div className="text-center py-8 text-[10px] text-fg-faint tracking-[0.3em] uppercase">
          — END OF TAPE —
        </div>
      </main>
    </>
  );
}
