"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { soundManager } from "@/utils/sounds";

/* ──────────────────────────────────────────────
   CASSETTE BOOT ANIMATION — retro style

   One cassette. One deck with a slit.
   Drag cassette near slit → slides into deck → hero.
   ────────────────────────────────────────────── */

type BootPhase = "waiting" | "snapping" | "sliding" | "done";

/* ── Reel SVG ── */
function Reel({ size = 36 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="14" fill="none" stroke="var(--color-border-light)" strokeWidth="0.8" />
            <circle cx="22" cy="22" r="8" fill="none" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="22" cy="22" r="16" fill="var(--color-fg-faint)" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
                <line
                    key={a}
                    x1="22" y1="22"
                    x2={22 + 18 * Math.cos((a * Math.PI) / 180)}
                    y2={22 + 18 * Math.sin((a * Math.PI) / 180)}
                    stroke="var(--color-border-light)" strokeWidth="0.6"
                />
            ))}
        </svg>
    );
}

/* ── Cassette body ── */
function CassetteBody() {
    return (
        <div
            className="bg-bg-alt border-2 border-border-light rounded-md relative"
            style={{ padding: "12px 16px 8px" }}
        >
            {/* Label */}
            <div className="border border-border bg-bg rounded-sm px-3 py-1 mb-2 text-center">
                <span className="text-[9px] font-mono text-fg-muted tracking-[0.2em] uppercase">
                    PORTFOLIO MIX
                </span>
            </div>

            {/* Tape window */}
            <div className="border border-border bg-bg rounded-sm p-2 mx-auto">
                    <div className="flex items-center justify-center gap-3 md:gap-6">
                    <Reel size={28} />
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="w-6 md:w-8 h-px bg-border-light" />
                        <div className="w-8 md:w-10 h-px bg-border" />
                        <div className="w-6 md:w-8 h-px bg-border-light" />
                    </div>
                    <Reel size={28} />
                </div>
            </div>

            {/* Bottom screws + label */}
            <div className="flex justify-between items-center mt-1.5 px-1">
                <span className="text-[7px] text-fg-faint font-mono">A</span>
                <div className="flex gap-8">
                    <div className="w-1.5 h-1.5 rounded-full border border-border-light" />
                    <div className="w-1.5 h-1.5 rounded-full border border-border-light" />
                </div>
                <span className="text-[7px] text-fg-faint font-mono">60</span>
            </div>
        </div>
    );
}

/* ── Main Component ── */
export default function CassetteBootAnimation({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<BootPhase>("waiting");
    const hasStartedRef = useRef(false);
    const slitRef = useRef<HTMLDivElement>(null);
    const deckRef = useRef<HTMLDivElement>(null);
    const cassetteRef = useRef<HTMLDivElement>(null);

    // Motion values give us precise control over cassette position
    // during the snap + slide sequence
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);

    useEffect(() => {
        soundManager?.warmUp();
    }, []);

    const insertCassette = useCallback(() => {
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;

        if (!slitRef.current || !cassetteRef.current || !deckRef.current) return;

        // Disable drag immediately
        setPhase("snapping");
        soundManager?.playClick();

        const slitRect = slitRef.current.getBoundingClientRect();
        const cassRect = cassetteRef.current.getBoundingClientRect();
        const deckRect = deckRef.current.getBoundingClientRect();

        // Current drag offset
        const currentDragX = dragX.get();
        const currentDragY = dragY.get();

        // Cassette's natural position (layout pos without any drag offset)
        const cassetteNaturalCenterX = (cassRect.left - currentDragX) + cassRect.width / 2;
        const cassetteNaturalTop = cassRect.top - currentDragY;

        // ── Phase 1: Snap ── center on slit, top edge at slit bottom
        const slitCenterX = slitRect.left + slitRect.width / 2;
        const snapX = slitCenterX - cassetteNaturalCenterX;
        const snapY = slitRect.bottom - cassetteNaturalTop;

        Promise.all([
            animate(dragX, snapX, { duration: 0.2, ease: "easeOut" }),
            animate(dragY, snapY, { duration: 0.2, ease: "easeOut" }),
        ]).then(() => {
            // ── Phase 2: Slide under deck ──
            setPhase("sliding");
            soundManager?.playInsertCassette();
            // Move cassette top to just inside the deck's top edge
            // so it's fully hidden behind the deck body
            const slideUpTarget = (deckRect.top + 2) - cassetteNaturalTop;
            return animate(dragY, slideUpTarget, {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
            });
        }).then(() => {
            setPhase("done");
            onComplete();
        });
    }, [onComplete, dragX, dragY]);

    const handleDrag = useCallback(() => {
        if (!slitRef.current || !cassetteRef.current || hasStartedRef.current) return;

        const slitRect = slitRef.current.getBoundingClientRect();
        const cassetteRect = cassetteRef.current.getBoundingClientRect();

        const slitCX = slitRect.left + slitRect.width / 2;
        const slitCY = slitRect.top + slitRect.height / 2;
        const cassCX = cassetteRect.left + cassetteRect.width / 2;
        const cassCY = cassetteRect.top + cassetteRect.height / 2;

        const dist = Math.sqrt((cassCX - slitCX) ** 2 + (cassCY - slitCY) ** 2);

        if (dist < 100) {
            insertCassette();
        }
    }, [insertCassette]);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    className="fixed inset-0 z-200 bg-bg flex flex-col items-center justify-center select-none overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {/* Scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
                        }}
                    />

                    <div className="relative z-20 flex flex-col items-center">

                        {/* ─── DECK ─── (z-10 so cassette slides behind it) */}
                        <motion.div
                            className="w-60 md:w-88 relative z-10"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div
                                ref={deckRef}
                                className="bg-bg-alt border-2 border-border rounded-lg relative"
                                style={{ padding: "20px 20px 28px" }}
                            >
                                {/* Deck top ridge */}
                                <div
                                    className="absolute top-0 inset-x-0 h-1 rounded-t-lg"
                                    style={{ background: "var(--color-border-light)" }}
                                />

                                {/* Deck label */}
                                <div className="flex items-center justify-between mb-4 px-1 pt-1">
                                    <span className="text-[8px] font-mono text-fg-faint tracking-[0.25em] uppercase">
                                        DECK
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-border-light" />
                                        <span className="text-[7px] font-mono text-fg-faint tracking-wider opacity-50">
                                            STEREO
                                        </span>
                                    </div>
                                </div>

                                {/* ─── THE SLIT ─── */}
                                <div
                                    ref={slitRef}
                                    className="mx-auto rounded-sm"
                                    style={{
                                        width: "80%",
                                        height: 5,
                                        background: "var(--color-border)",
                                        borderTop: "1px solid var(--color-fg-faint)",
                                        borderBottom: "1px solid var(--color-bg-alt)",
                                    }}
                                />

                                {/* Deck surface — reel openings */}
                                <div className="mt-5 flex items-center justify-center gap-10">
                                    <div
                                        className="w-9 h-9 rounded-full border border-border-light"
                                        style={{ background: "var(--color-bg)" }}
                                    />
                                    <div
                                        className="w-9 h-9 rounded-full border border-border-light"
                                        style={{ background: "var(--color-bg)" }}
                                    />
                                </div>

                                {/* Bottom ridge */}
                                <div className="mt-4 flex justify-center gap-3">
                                    <div className="w-6 h-px bg-border-light" />
                                    <div className="w-2 h-px bg-border-light" />
                                    <div className="w-6 h-px bg-border-light" />
                                </div>
                            </div>
                        </motion.div>

                        {/* ─── CASSETTE (draggable → snap → slide under deck) ─── */}
                        <motion.div
                            className="mt-14 relative z-0"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
                        >
                            <motion.div
                                ref={cassetteRef}
                                className="w-52 md:w-72 cursor-pointer"
                                style={{ touchAction: "none", x: dragX, y: dragY }}
                                drag={phase === "waiting"}
                                dragMomentum={false}
                                onDrag={handleDrag}
                                whileDrag={{ scale: 1.02 }}
                            >
                                <CassetteBody />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Prompt */}
                    {phase === "waiting" && (
                        <div className="mt-6 md:mt-10 z-1">
                            <TypewriterText
                                text="insert tape into the deck"
                                className="text-[10px] font-mono text-fg-faint tracking-[0.15em] uppercase"
                                speed={40}
                                delay={0.5}
                                showCursor={true}
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
