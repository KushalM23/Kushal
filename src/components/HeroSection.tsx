"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { profileData } from "@/data/mockData";
import TypewriterText from "./TypewriterText";
import { soundManager } from "@/utils/sounds";

/* ──────────────────────────────────────────────
   RETRO BOOT SCREEN → SHRINKING HEADER
   
   - Name types out letter by letter (typewriter)
   - Below: small cassette rewind animation
   - Below: "Scroll to begin" text
   - On scroll: entire intro shrinks into a
     sticky top header bar showing just the name.
   ────────────────────────────────────────────── */

const HEADER_H = 54;

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
                        backgroundImage: "none",
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

export default function HeroSection() {
    const [vh, setVh] = useState(800);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        setVh(window.innerHeight);
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", onResize);

        // Always start at top on fresh mount/reload
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Cassette Rewind Sound on mount (after a delay to let things settle)
        const timer = setTimeout(() => {
            soundManager?.playCassetteWhir(1.5, true);
        }, 1500);

        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(timer);
        };
    }, []);

    const scrollEnd = vh * 0.5;
    const { scrollY, scrollYProgress } = useScroll();

    // Transforms
    const sectionHeight = useTransform(scrollY, [0, scrollEnd], [vh, HEADER_H], { clamp: true });
    // Font size stops shrinking at 60% scroll, stays at 24px (sticky)
    const nameFontSize = useTransform(scrollY, [0, scrollEnd * 0.6], [64, 24], { clamp: true });
    const extraContentOpacity = useTransform(scrollY, [0, scrollEnd * 0.4], [1, 0], { clamp: true });

    // One-Way Scroll Logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!isLocked && latest >= scrollEnd) {
            soundManager?.playToggle(false); // Mechanical stop/lock sound
            setIsLocked(true);
        }
    });

    useEffect(() => {
        if (!isLocked) return;

        const handleScroll = () => {
            if (window.scrollY < scrollEnd - 2) { // Tiny buffer for subpixel issues
                window.scrollTo({
                    top: scrollEnd,
                    behavior: "auto"
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLocked, scrollEnd]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-bg"
                style={{
                    height: isLocked ? HEADER_H : sectionHeight,
                    willChange: "height",
                }}
            >
                {/* Name container — always centered and visible */}
                <div className="h-full flex items-center justify-center px-4">
                    <motion.h1
                        className="typewriter-font text-fg font-bold leading-none whitespace-nowrap"
                        style={{
                            fontSize: isLocked ? 24 : nameFontSize,
                        }}
                    >
                        <TypewriterText text={profileData.name} delay={isLocked ? 0 : 0.3} speed={50} />
                    </motion.h1>
                </div>

                {/* Extra content — positioned below name, fades out */}
                {!isLocked && (
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

                        <motion.div
                            className="text-xs text-fg-muted tracking-[0.15em] uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.3 }}
                        >
                            <TypewriterText text="Scroll to begin playback" delay={2.0} speed={20} showCursor={true} />
                        </motion.div>
                    </motion.div>
                )}

                {/* Scroll Progress Bar - attached to bottom of header */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-red z-50"
                    style={{
                        scaleX: isLocked ? 1 : scrollYProgress,
                        transformOrigin: "0%",
                        width: "100%"
                    }}
                />
            </motion.div>

            {/* Spacer - pushes content down so it reveals exactly under the header */}
            <div style={{ height: `${scrollEnd + HEADER_H}px` }} />
        </>
    );
}
