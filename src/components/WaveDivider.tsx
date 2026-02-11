"use client";

import React from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────
   WAVE DIVIDER — between sections
   Multi-layer SVG waves with scroll entrance.
   ────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WaveDivider({ flip = false }: { flip?: boolean }) {
    return (
        <motion.div
            className={`w-full overflow-hidden leading-[0] pointer-events-none ${flip ? "rotate-180" : ""}`}
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false, margin: "-20px" }}
            transition={{ duration: 0.8, ease: EASE }}
        >
            <svg
                className="relative block w-full h-[60px] md:h-[80px] lg:h-[100px]"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                {/* Fill wave */}
                <path
                    d="M0,60 C240,100 480,20 720,50 C960,80 1200,10 1440,40 L1440,100 L0,100 Z"
                    fill="var(--color-bg-alt)"
                    opacity="0.5"
                />
                {/* Stroke wave */}
                <path
                    d="M0,55 Q180,90 360,55 Q540,20 720,55 Q900,90 1080,55 Q1260,20 1440,55"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="1"
                    opacity="0.3"
                />
                {/* Red accent wave */}
                <path
                    d="M0,50 Q180,85 360,50 Q540,15 720,50 Q900,85 1080,50 Q1260,15 1440,50"
                    fill="none"
                    stroke="var(--color-red)"
                    strokeWidth="0.5"
                    opacity="0.15"
                />
            </svg>
        </motion.div>
    );
}
