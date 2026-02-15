"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { profileData } from "@/data/mockData";
import TypewriterText from "./TypewriterText";
import { soundManager } from "@/utils/sounds";
import CassetteBootAnimation from "./CassetteBootAnimation";

/* ──────────────────────────────────────────────
   RETRO BOOT SCREEN → SHRINKING HEADER
   
   - Boot overlay: "Press any key" (warms AudioContext)
   - Name types out letter by letter (typewriter)
   - Below: small cassette rewind animation
   - Below: "Scroll to begin" text
   - On scroll: entire intro shrinks into a
     sticky top header bar showing just the name.
   ────────────────────────────────────────────── */

const HEADER_H = 54;
const PRESERVE_HOME_SCROLL_KEY = "home:preserve-scroll";
const HOME_SCROLL_POS_KEY = "home:scroll-pos";

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
            <div className="relative w-20 h-0.5 bg-border overflow-hidden">
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
    const [hasBooted, setHasBooted] = useState(false);
    const [pageProgress, setPageProgress] = useState(0);
    const justLockedRef = useRef(false);

    useEffect(() => {
        setVh(window.innerHeight);
        const onResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", onResize);

        // Prevent browser from auto-restoring scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Check if returning from a project/blog page via back-nav
        const shouldPreserveScroll = sessionStorage.getItem(PRESERVE_HOME_SCROLL_KEY) === "1";
        sessionStorage.removeItem(PRESERVE_HOME_SCROLL_KEY);

        if (shouldPreserveScroll) {
            // Skip intro & boot screen — go straight to locked header state
            setHasBooted(true);
            setIsLocked(true);
            // Restore saved scroll position
            const savedPos = sessionStorage.getItem(HOME_SCROLL_POS_KEY);
            sessionStorage.removeItem(HOME_SCROLL_POS_KEY);
            if (savedPos) {
                const pos = parseInt(savedPos, 10);
                // Use rAF to ensure DOM has settled before restoring scroll
                requestAnimationFrame(() => {
                    window.scrollTo(0, pos);
                });
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            // Fresh load or reload: always start at top
            window.scrollTo(0, 0);
        }

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Boot screen — body overflow locked while cassette animation plays
    useEffect(() => {
        if (hasBooted) {
            document.body.style.overflow = '';
            return;
        }

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [hasBooted]);

    const scrollEnd = vh * 0.5;
    const { scrollY } = useScroll();

    // Transforms
    const sectionHeight = useTransform(scrollY, [0, scrollEnd], [vh, HEADER_H], { clamp: true });
    // Font size stops shrinking at 60% scroll, stays at 24px (sticky)
    const nameFontSize = useTransform(scrollY, [0, scrollEnd * 0.6], [64, 28], { clamp: true });
    const extraContentOpacity = useTransform(scrollY, [0, scrollEnd * 0.4], [1, 0], { clamp: true });

    // One-Way Scroll Logic — lock when scrolled past intro
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!isLocked && latest >= scrollEnd) {
            justLockedRef.current = true;
            setIsLocked(true);
        }
    });

    // When locking, spacer shrinks — adjust scroll to keep content in place
    useLayoutEffect(() => {
        if (justLockedRef.current) {
            justLockedRef.current = false;
            const adjusted = Math.max(0, window.scrollY - scrollEnd);
            window.scrollTo(0, adjusted);
        }
    }, [isLocked, scrollEnd]);

    // Page scroll progress (only after header locks)
    useEffect(() => {
        if (!isLocked) return;

        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
                setPageProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLocked]);

    return (
        <>
            {/* Boot overlay — cassette insertion animation */}
            {!hasBooted && (
                <CassetteBootAnimation onComplete={() => {
                    soundManager?.warmUp();
                    setHasBooted(true);
                }} />
            )}


            <motion.div
                className="fixed top-0 left-0 right-0 z-100 border-b border-border bg-bg"
                style={{
                    height: isLocked ? HEADER_H : sectionHeight,
                    willChange: "height",
                }}
            >
                
            {/* Scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
                        }}
                    />
                {/* Name container — always centered and visible */}
                <div className="h-full flex items-center justify-center px-4">
                    <motion.h1
                        className="typewriter-font text-fg font-bold leading-none whitespace-nowrap"
                        style={{
                            fontSize: isLocked ? 28 : nameFontSize,
                        }}
                    >
                        {hasBooted ? (
                            isLocked ? (
                                <>{profileData.name}<span className="text-red inline-block ml-0.5 font-bold animate-cursor-blink">_</span></>
                            ) : (
                                <TypewriterText
                                    key="hero-name"
                                    text={profileData.name}
                                    delay={0.3}
                                    speed={50}
                                    mute={false}
                                    showCursor={true}
                                />
                            )
                        ) : null}
                    </motion.h1>
                </div>

                {/* Extra content — positioned below name, fades out */}
                {!isLocked && hasBooted && (
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

                {/* Scroll Progress Bar — only after header locks, tracks page content scroll */}
                {isLocked && (
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-red z-50"
                        style={{ width: `${pageProgress * 100}%`, transition: 'width 100ms linear' }}
                    />
                )}
            </motion.div>

            {/* Spacer — shrinks to header height when locked (prevents upward scroll overshoot) */}
            <div style={{ height: isLocked ? `${HEADER_H}px` : `${scrollEnd + HEADER_H}px`, overflowAnchor: 'none' as const }} />
        </>
    );
}
