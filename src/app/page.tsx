"use client";

import React from "react";
import IntroHeader from "@/components/IntroHeader";
import HeroSection from "@/components/HeroSection";
import WaveCarousel from "@/components/WaveCarousel";
import WaveDivider from "@/components/WaveDivider";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      {/* The intro section that shrinks into the header on scroll */}
      <IntroHeader />

      {/* Scroll space — matches the scrollRange (vh * 0.5) */}
      <div style={{ height: "50vh" }} />

      {/* === Rest of the site === */}
      <main className="relative">
        <HeroSection />
        <WaveDivider />
        <WaveCarousel />
        <WaveDivider flip />
        <ExperienceSection />
        <WaveDivider />
        <ContactSection />
      </main>
    </>
  );
}
