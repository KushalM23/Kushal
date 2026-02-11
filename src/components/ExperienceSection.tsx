"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceData } from "@/data/mockData";

/* ──────────────────────────────────────────────
   EXPERIENCE — Wavy timeline connector
   
   Consistent tokens:
   - ease:  [0.16, 1, 0.3, 1]
   - scale: 0.95 → 1
   - y:     40px
   ────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sectionScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const headingY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);

    return (
        <motion.section
            ref={sectionRef}
            id="experience"
            className="py-32 px-6 relative overflow-hidden"
            style={{ scale: sectionScale, opacity: sectionOpacity }}
        >
            {/* Background wave */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-[10%] right-0 w-[200%] h-[100px] opacity-[0.02] animate-wave-float" viewBox="0 0 2880 100" preserveAspectRatio="none">
                    <path d="M0,50 C360,90 720,10 1080,50 C1440,90 1800,10 2160,50 C2520,90 2880,10 2880,50" fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section heading — matches all other headings */}
                <motion.div
                    className="text-center mb-24"
                    style={{ y: headingY }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <svg viewBox="0 0 120 16" className="w-20 h-4 mx-auto mb-4 opacity-20">
                            <path d="M0,8 Q15,0 30,8 T60,8 T90,8 T120,8" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-fg">
                            Experience
                        </h2>
                    </motion.div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Wavy line (desktop) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[40px] pointer-events-none hidden md:block">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 40 1000">
                            <path
                                d="M20,0 C35,50 5,100 20,150 C35,200 5,250 20,300 C35,350 5,400 20,450 C35,500 5,550 20,600 C35,650 5,700 20,750 C35,800 5,850 20,900 C35,950 20,1000 20,1000"
                                fill="none"
                                stroke="var(--color-border)"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>
                    {/* Simple line (mobile) */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:hidden" />

                    <div className="space-y-20 md:space-y-28">
                        {experienceData.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    x: i % 2 === 0 ? 40 : -40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    x: 0,
                                }}
                                viewport={{ once: false, margin: "-60px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.08,
                                    ease: EASE,
                                }}
                                className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-fg border-4 border-bg -translate-x-1.5 md:-translate-x-1.5 z-10 shadow-sm" />

                                {/* Card */}
                                <div className="w-full md:w-[calc(50%-40px)] ml-12 md:ml-0">
                                    <div className="color-on-hover p-8 bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:border-red/20 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                                        {/* Wave decoration */}
                                        <svg className="absolute -bottom-1 -right-4 w-28 h-14 opacity-[0.04]" viewBox="0 0 120 60">
                                            <path d="M0,30 Q15,10 30,30 T60,30 T90,30 T120,30" fill="none" stroke="var(--color-fg)" strokeWidth="2" />
                                        </svg>

                                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted block mb-3">
                                            {exp.dates}
                                        </span>
                                        <h3 className="text-xl font-bold text-fg mb-1">{exp.title}</h3>
                                        <p className="text-sm font-medium text-fg-muted uppercase tracking-wider mb-5">
                                            {exp.company}
                                        </p>
                                        <ul className="space-y-2.5">
                                            {exp.bullets.map((b, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-fg-muted leading-relaxed flex items-start gap-2.5"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-red mt-2 shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Spacer */}
                                <div className="hidden md:block w-[calc(50%-40px)]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
