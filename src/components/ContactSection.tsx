"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/mockData";

/* ──────────────────────────────────────────────
   CONTACT — Clean layout with consistent scroll transforms.
   
   Consistent tokens:
   - ease:  [0.16, 1, 0.3, 1]
   - scale: 0.95 → 1
   - y:     30-40px
   ────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const sectionScale = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.95, 1, 1, 0.95]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);

    return (
        <motion.section
            ref={sectionRef}
            id="contact"
            className="py-32 px-6 relative overflow-hidden"
            style={{ scale: sectionScale, opacity: sectionOpacity }}
        >
            {/* Background waves */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute bottom-0 left-0 w-full h-[100px] opacity-[0.04]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 C360,90 720,10 1080,50 C1440,90 1440,50 1440,50 L1440,100 L0,100 Z" fill="var(--color-fg)" />
                </svg>
                <svg className="absolute top-[30%] left-0 w-[200%] h-[80px] opacity-[0.02] animate-wave-float" viewBox="0 0 2880 80" preserveAspectRatio="none">
                    <path d="M0,40 C360,10 720,70 1080,40 C1440,10 1800,70 2160,40 C2520,10 2880,70 2880,40" fill="none" stroke="var(--color-fg)" strokeWidth="1" />
                </svg>
            </div>

            <motion.div
                className="max-w-2xl mx-auto text-center relative z-10"
                style={{ y: contentY }}
            >
                {/* Heading — matches all other section headings */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    <svg viewBox="0 0 120 16" className="w-20 h-4 mx-auto mb-4 opacity-20">
                        <path d="M0,8 Q15,0 30,8 T60,8 T90,8 T120,8" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-fg mb-4">
                        Let&apos;s Talk<span className="text-red">.</span>
                    </h2>
                    <p className="text-fg-muted text-lg mb-12">
                        Have a project or just want to say hello? Reach out.
                    </p>
                </motion.div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
                    className="flex justify-center gap-8 mb-16"
                >
                    <a
                        href={`mailto:${profileData.email}`}
                        className="color-on-hover group flex flex-col items-center gap-3"
                    >
                        <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:border-red/30 group-hover:-translate-y-1 transition-all duration-500">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">Email</span>
                    </a>
                    <a
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="color-on-hover group flex flex-col items-center gap-3"
                    >
                        <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:border-red/30 group-hover:-translate-y-1 transition-all duration-500">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">LinkedIn</span>
                    </a>
                    <a
                        href={profileData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="color-on-hover group flex flex-col items-center gap-3"
                    >
                        <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:border-red/30 group-hover:-translate-y-1 transition-all duration-500">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">GitHub</span>
                    </a>
                </motion.div>

                {/* Contact form — single block animation, no per-field stagger */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
                    className="p-8 md:p-10 bg-card rounded-2xl border border-border/40 shadow-lg"
                >
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-left">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-fg mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-red transition-colors duration-300"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-fg mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-red transition-colors duration-300"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-fg mb-2">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-red transition-colors duration-300 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <button className="w-full py-4 bg-fg text-bg font-semibold uppercase tracking-widest text-sm rounded-xl hover:bg-red transition-colors duration-500">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
