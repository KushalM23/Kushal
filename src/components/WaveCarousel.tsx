"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsData } from "@/data/mockData";

/* ──────────────────────────────────────────────
   WAVE CAROUSEL
   
   Auto-scrolling infinite marquee.
   Cards ride a uniform sine-wave — same speed,
   staggered phase for a clean ripple effect.
   
   Consistent tokens:
   - ease:  [0.16, 1, 0.3, 1]
   - scale: 0.95 → 1
   ────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
    /* Uniform wave: same amplitude & speed, staggered phase */
    const phase = (index * Math.PI) / 3; /* 60° offset per card */

    return (
        <motion.div
            className="mx-5 w-[280px] md:w-[340px] flex-shrink-0"
            animate={{
                y: [
                    Math.sin(phase) * 24,
                    Math.sin(phase + Math.PI) * 24,
                    Math.sin(phase) * 24,
                ],
            }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <a
                href={project.live || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
            >
                <div className="color-on-hover rounded-2xl overflow-hidden border border-border/40 bg-card shadow-md transition-all duration-500 hover:border-red/30 hover:-translate-y-1.5">
                    {/* Card Header */}
                    <div className="h-[200px] bg-bg-alt relative overflow-hidden">
                        <svg className="absolute bottom-0 left-0 w-full h-12 opacity-10" viewBox="0 0 400 50" preserveAspectRatio="none">
                            <path d="M0,25 Q50,5 100,25 T200,25 T300,25 T400,25 L400,50 L0,50 Z" fill="var(--color-red)" />
                        </svg>
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80px] opacity-[0.04]" viewBox="0 0 500 80" preserveAspectRatio="none">
                            <path d="M0,40 Q62.5,10 125,40 T250,40 T375,40 T500,40" fill="none" stroke="var(--color-fg)" strokeWidth="2" />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-black text-fg/[0.04] group-hover:text-red/10 transition-colors duration-500">
                                {project.title.charAt(0)}
                            </span>
                        </div>

                        <span className="absolute top-4 right-4 text-xs font-bold text-fg-faint tracking-widest">
                            0{(index % projectsData.length) + 1}
                        </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-fg mb-2 group-hover:text-red transition-colors duration-500">
                            {project.title}
                        </h3>
                        <p className="text-xs text-fg-muted leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {project.techStack.map((t) => (
                                <span
                                    key={t}
                                    className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-border rounded-full text-fg-muted"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}

export default function WaveCarousel() {
    const set = [...projectsData, ...projectsData];
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sectionScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

    return (
        <motion.section
            ref={sectionRef}
            id="projects"
            className="relative py-32 overflow-hidden"
            style={{ scale: sectionScale, opacity: sectionOpacity }}
        >
            {/* Background waves */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-[20%] left-0 w-[200%] h-[100px] opacity-[0.025] animate-wave-drift" viewBox="0 0 2880 100" preserveAspectRatio="none">
                    <path d="M0,50 C360,10 720,90 1080,50 C1440,10 1800,90 2160,50 C2520,10 2880,90 2880,50" fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-[15%] left-0 w-[200%] h-[80px] opacity-[0.02] animate-wave-float-rev" viewBox="0 0 2880 80" preserveAspectRatio="none">
                    <path d="M0,40 C480,80 960,0 1440,40 C1920,80 2400,0 2880,40" fill="none" stroke="var(--color-fg)" strokeWidth="1" />
                </svg>
            </div>

            {/* Section heading */}
            <motion.div
                className="text-center mb-20 px-6 relative z-10"
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
                        Projects
                    </h2>
                </motion.div>
            </motion.div>

            {/* Marquee — cards bob on a wave */}
            <div className="w-full overflow-hidden py-8">
                <div className="flex w-max animate-marquee">
                    {set.map((project, i) => (
                        <ProjectCard key={`${project.id}-${i}`} project={project} index={i} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
