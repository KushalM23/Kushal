"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/mockData";

/* ──────────────────────────────────────────────
   HERO — Bio / Description section.
   
   Consistent animation tokens:
   - ease:  [0.16, 1, 0.3, 1]  (expo out)
   - scale: 0.95 → 1
   - y:     40px
   - duration: 0.8s base
   ────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
    const words = profileData.bio.split(" ");
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    /* Parallax — content drifts upward as you scroll */
    const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    /* Section scale — uniform entrance/exit */
    const sectionScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
            style={{ scale: sectionScale, opacity: sectionOpacity }}
        >
            {/* ── WAVE LAYERS ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-[15%] left-0 w-[200%] h-[180px] opacity-[0.035] animate-wave-drift" viewBox="0 0 2880 180" preserveAspectRatio="none">
                    <path d="M0,90 C320,30 640,150 960,90 C1280,30 1600,150 1920,90 C2240,30 2560,150 2880,90" fill="none" stroke="var(--color-fg)" strokeWidth="2" />
                </svg>
                <svg className="absolute top-[40%] left-0 w-[200%] h-[140px] opacity-[0.025] animate-wave-float" viewBox="0 0 2880 140" preserveAspectRatio="none">
                    <path d="M0,70 C360,120 720,20 1080,70 C1440,120 1800,20 2160,70 C2520,120 2880,20 2880,70" fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-[20%] left-0 w-[200%] h-[120px] opacity-[0.04] animate-wave-float-rev" viewBox="0 0 2880 120" preserveAspectRatio="none">
                    <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60" fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
                </svg>
                <svg className="absolute -bottom-1 left-0 w-full h-[120px] opacity-[0.06]" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,80 C240,30 480,100 720,60 C960,20 1200,90 1440,50 L1440,120 L0,120 Z" fill="var(--color-fg)" />
                </svg>
            </div>

            {/* ── CONTENT with parallax ── */}
            <motion.div
                className="max-w-4xl mx-auto text-center relative z-10"
                style={{ y: contentY }}
            >
                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-fg-muted mb-8"
                >
                    {profileData.tagline}
                </motion.p>

                {/* Bio — word-by-word stagger */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-fg mb-10">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-[0.3em]"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.025,
                                ease: EASE,
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
                >
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-3 text-fg font-semibold text-sm uppercase tracking-widest"
                    >
                        <span>View Work</span>
                        <motion.span
                            animate={{ x: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                            className="text-red"
                        >
                            →
                        </motion.span>
                    </a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
