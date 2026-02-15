"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/mockData";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";

/* ──────────────────────────────────────────────
   TERMINAL WINDOW → TYPEWRITER DOCUMENT
   
   Experience rendered as a typed document,
   NOT a cmd terminal. Uses typewriter paper
   styling with mechanical key-strike animations.
   ────────────────────────────────────────────── */

export default function ExperienceSection() {
    return (
        <section id="experience" className="px-1 md:px-2 mb-6">
            <RetroWindow title="EXPERIENCE.doc" variant="normal" delay={0.2}>
                {/* Document header */}
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <span className="tape-label">▶ SIDE B — CAREER LOG</span>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 animate-reel-slow opacity-50">
                            <svg viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="7" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.8" />
                                <circle cx="8" cy="8" r="3" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
                                <circle cx="8" cy="8" r="1" fill="var(--color-fg-faint)" />
                            </svg>
                        </div>
                        <span className="text-[10px] text-fg-faint">{experienceData.length} entry</span>
                    </div>
                </div>

                {/* Typewriter paper body */}
                <div className="paper-insert paper-lines p-4 pl-4 md:p-8 md:pl-16">
                    {experienceData.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            className="mb-8 last:mb-2"
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                delay: 0.1 + i * 0.1,
                                duration: 0.15,
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                        >
                            {/* Role + Company */}
                            <h3
                                className="typewriter-font text-lg md:text-xl mb-0.5"
                                style={{ color: "var(--color-ink)" }}
                            >
                                <TypewriterText className="text-xl font-bold" text={exp.title} delay={0.2} showCursor={true} />
                            </h3>
                            <p className="text-sm typewriter-font font-semibold mb-1" style={{ color: "var(--color-red)" }}>
                                @ <TypewriterText text={exp.company} delay={0.4} showCursor={true} />
                            </p>
                            <p
                                className="text-[11px] mb-3 tracking-wider uppercase"
                                style={{ color: "var(--color-fg-faint)" }}
                            >
                                <TypewriterText text={exp.dates} delay={0.6} speed={10} showCursor={true} />
                            </p>

                            {/* Bullets — typed on the paper */}
                            <div className="space-y-2">
                                {exp.bullets.map((b, idx) => (
                                    <div
                                        key={idx}
                                        className="typewriter-font text-md leading-7"
                                        style={{ color: "var(--color-ink)" }}
                                    >
                                        <span style={{ color: "var(--color-red)" }}>—</span> <TypewriterText text={b} delay={0.8 + idx * 0.1} speed={5} wrapperClassName="inline" showCursor={true} />
                                    </div>
                                ))}
                            </div>

                            {/* Separator between entries */}
                            {i < experienceData.length - 1 && (
                                <div className="mt-5 flex items-center gap-2">
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "rgba(44,36,22,0.15)" }} />
                                    <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(44,36,22,0.3)" }}>
                                        EXP-{String(i + 1).padStart(3, "0")}
                                    </span>
                                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "rgba(44,36,22,0.15)" }} />
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* End of document */}
                    <div className="pt-4 text-center">
                        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(44,36,22,0.3)" }}>
                            — END OF CAREER LOG —
                        </span>
                    </div>
                </div>
            </RetroWindow>
        </section>
    );
}
