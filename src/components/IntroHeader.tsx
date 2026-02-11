"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────
   INTRO HEADER
   
   You land → full-screen section, photo + name stacked.
   You scroll → section SHRINKS into the header.
   Name stays centered, photo collapses out.
   
   100% scroll-driven. No timers. No fades.
   Pure transform-based (GPU accelerated).
   ────────────────────────────────────────────── */

function clamp(v: number, min: number, max: number) {
    return Math.min(Math.max(v, min), max);
}

export default function IntroHeader() {
    const [vh, setVh] = useState(800);

    useEffect(() => {
        setVh(window.innerHeight);
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const { scrollY } = useScroll();

    /* Section height: 100vh → 64px (completes in half a viewport of scroll) */
    const scrollRange = vh * 0.7;

    const sectionHeight = useTransform(scrollY, (v) => {
        const p = clamp(v / scrollRange, 0, 1);
        return vh - p * (vh - 64);
    });

    /* Photo scale: 1 → 0 (first 60% of animation) */
    const photoScale = useTransform(scrollY, (v) => {
        return 1 - clamp(v / (scrollRange * 0.6), 0, 1);
    });

    /* Photo wrapper height + gap: full → 0 */
    const photoWrapperHeight = useTransform(scrollY, (v) => {
        const size = 224 + 32;
        return size * (1 - clamp(v / (scrollRange * 0.6), 0, 1));
    });

    /* Wave background opacity */
    const waveOpacity = useTransform(scrollY, (v) => {
        return 1 - clamp(v / (scrollRange * 0.7), 0, 1);
    });

    /* Name: scale 3.2 → 1 */
    const nameScale = useTransform(scrollY, (v) => {
        const p = clamp(v / scrollRange, 0, 1);
        return 3.2 - p * 2.2;
    });

    /* Border: transparent → visible */
    const borderOpacity = useTransform(scrollY, (v) => {
        return clamp((v / scrollRange - 0.7) / 0.3, 0, 1);
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-bg overflow-hidden"
            style={{ height: sectionHeight }}
        >
            {/* Bottom border */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-border"
                style={{ opacity: borderOpacity }}
            />

            {/* ── WAVE BACKGROUND ──
                Fades away on scroll */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: waveOpacity }}
            >
                {/* Concentric wave rings - centered on photo, extends beyond it */}
                <svg className="absolute top-[calc(50%-2rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.08]" viewBox="0 0 800 800">
                    <circle cx="400" cy="400" r="160" fill="none" stroke="var(--color-fg)" strokeWidth="1" />
                    <circle cx="400" cy="400" r="210" fill="none" stroke="var(--color-fg)" strokeWidth="0.9" />
                    <circle cx="400" cy="400" r="260" fill="none" stroke="var(--color-fg)" strokeWidth="0.8" />
                    <circle cx="400" cy="400" r="310" fill="none" stroke="var(--color-fg)" strokeWidth="0.7" />
                    <circle cx="400" cy="400" r="360" fill="none" stroke="var(--color-fg)" strokeWidth="0.6" />
                    <circle cx="400" cy="400" r="410" fill="none" stroke="var(--color-fg)" strokeWidth="0.5" />
                    <circle cx="400" cy="400" r="440" fill="none" stroke="var(--color-fg)" strokeWidth="0.4" />
                    <circle cx="400" cy="400" r="490" fill="none" stroke="var(--color-fg)" strokeWidth="0.3" />
                </svg>
            </motion.div>

            {/* ── PHOTO ──
          In the flex flow, directly above the name.
          Wrapper height collapses to 0 so name moves to center.
          Photo itself scales to 0. */}
            <motion.div
                className="flex items-center justify-center pb-8 relative z-10"
                style={{ height: photoWrapperHeight }}
            >
                <motion.div style={{ scale: photoScale }}>
                    <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border border-1 border-fg/8 color-on-hover cursor-pointer">
                        <Image
                            src="/profile pic wo bg.png"
                            alt="Kushal M"
                            width={224}
                            height={224}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* ── NAME ──
          Scaled up 3.2x at top, shrinks to 1x.
          Stays centered the entire time. */}
            <motion.span
                className="text-lg font-bold tracking-tight text-fg whitespace-nowrap select-none"
                style={{ scale: nameScale }}
            >
                Kushal<span className="text-red">.</span>
            </motion.span>
        </motion.div>
    );
}
