"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/mockData";

/* ──────────────────────────────────────────────
   RETRO BOOT SCREEN → SHRINKING HEADER
   
   - Name types out letter by letter (typewriter)
   - Below: small cassette rewind animation
   - Below: "Scroll to begin" text
   - On scroll: entire intro shrinks into a
     sticky top header bar showing just the name.
   ────────────────────────────────────────────── */

const HEADER_H = 44;

function CassetteRewind() {
    return (
        <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 animate-reel-spin">
                <svg viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="14" fill="none" stroke="var(--color-border-light)" strokeWidth="1.5" />
                    <circle cx="16" cy="16" r="6" fill="none" stroke="var(--color-border)" strokeWidth="1" />
                    <circle cx="16" cy="16" r="2" fill="var(--color-fg-faint)" />
                    {[0, 120, 240].map((a) => (
                        <line
                            key={a}
                            x1="16" y1="16"
                            x2={16 + 12 * Math.cos((a * Math.PI) / 180)}
                            y2={16 + 12 * Math.sin((a * Math.PI) / 180)}
                            stroke="var(--color-border)"
                            strokeWidth="0.8"
                        />
                    ))}
                </svg>
            </div>
            <div className="relative w-20 h-[2px] bg-border overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "repeating-linear-gradient(90deg, var(--color-fg-muted) 0px, var(--color-fg-muted) 4px, transparent 4px, transparent 8px)",
                    }}
                    animate={{ x: [0, 8] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
            <div className="w-10 h-10 animate-reel-slow">
                <svg viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="14" fill="none" stroke="var(--color-border-light)" strokeWidth="1.5" />
                    <circle cx="16" cy="16" r="6" fill="none" stroke="var(--color-border)" strokeWidth="1" />
                    <circle cx="16" cy="16" r="2" fill="var(--color-fg-faint)" />
                    {[0, 120, 240].map((a) => (
                        <line
                            key={a}
                            x1="16" y1="16"
                            x2={16 + 12 * Math.cos((a * Math.PI) / 180)}
                            y2={16 + 12 * Math.sin((a * Math.PI) / 180)}
                            stroke="var(--color-border)"
                            strokeWidth="0.8"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}

export default function RetroBootScreen() {
    const [vh, setVh] = useState(800);

    useEffect(() => {
        setVh(window.innerHeight);
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const scrollEnd = vh * 1.5;
    const { scrollY } = useScroll();

    const sectionHeight = useTransform(scrollY, [0, scrollEnd], [vh, HEADER_H], { clamp: true });
    // Font size stops shrinking at 60% scroll, stays at 24px (sticky)
    const nameFontSize = useTransform(scrollY, [0, scrollEnd * 0.6], [64, 24], { clamp: true });
    const extraContentOpacity = useTransform(scrollY, [0, scrollEnd * 0.4], [1, 0], { clamp: true });

    const nameChars = profileData.name.split("");

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-bg"
                style={{
                    height: sectionHeight,
                    willChange: "height",
                }}
            >
                {/* Name container — always centered and visible */}
                <div className="h-full flex items-center justify-center px-4">
                    <motion.h1
                        className="typewriter-font text-fg font-bold leading-none whitespace-nowrap"
                        style={{
                            fontSize: nameFontSize,
                        }}
                    >
                        {nameChars.map((char, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.3 + i * 0.08,
                                    duration: 0.01,
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                {/* Extra content — positioned below name, fades out */}
                <motion.div
                    className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6"
                    style={{ opacity: extraContentOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.3 }}
                    >
                        <CassetteRewind />
                    </motion.div>

                    <motion.p
                        className="text-xs text-fg-muted tracking-[0.15em] uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.3 }}
                    >
                        ↓ Scroll to begin playback ↓
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Spacer */}
            <div style={{ height: `${scrollEnd}px` }} />
        </>
    );
}
