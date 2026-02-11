"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profileData } from "@/data/mockData";
import RetroWindow from "./RetroWindow";
import CassetteWidget from "./CassetteWidget";

/* ──────────────────────────────────────────────
   ABOUT WINDOW
   
   Bio on typewriter paper (cream background with
   ruled lines and red margin). Photo in a
   retro viewfinder frame. CassetteWidget below.
   ────────────────────────────────────────────── */

export default function AboutWindow() {
    const bioChars = profileData.bio.split("");

    return (
        <section id="about" className="px-4 md:px-8 mb-6">
            <RetroWindow title="ABOUT.exe" delay={0.1}>
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile photo — retro viewfinder */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                            <div className="relative">
                                <div className="w-36 h-36 md:w-44 md:h-44 border-2 border-border-light overflow-hidden bg-bg">
                                    <Image
                                        src="/profile pic wo bg.png"
                                        alt="Kushal"
                                        width={176}
                                        height={176}
                                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                        priority
                                    />
                                    {/* Scanlines on photo */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)",
                                        }}
                                    />
                                </div>
                                {/* Corner brackets */}
                                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-red" />
                                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-red" />
                                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-red" />
                                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-red" />
                            </div>
                            <span className="tape-label">PHOTO REEL</span>
                        </div>

                        {/* Bio — typewriter paper insert */}
                        <div className="flex-1 min-w-0">
                            {/* Name heading — typewriter font */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.01, delay: 0.2 }}
                            >
                                <h1 className="typewriter-font text-3xl md:text-4xl text-fg mb-1">
                                    {profileData.name}<span className="text-red">_</span>
                                </h1>
                                <p className="text-xs text-fg-muted tracking-[0.1em] uppercase mb-4">
                                    [{profileData.tagline}]
                                </p>
                            </motion.div>

                            {/* Typewriter paper with bio */}
                            <div className="paper-insert paper-lines p-5 pl-14 mb-6">
                                <div className="text-sm leading-[28px]" style={{ color: "var(--color-ink)" }}>
                                    {bioChars.map((char, i) => (
                                        <motion.span
                                            key={i}
                                            className="typewriter-font"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: false, margin: "-50px" }}
                                            transition={{
                                                delay: 0.4 + i * 0.008,
                                                duration: 0.01,
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    <span className="inline-block w-1.5 h-4 bg-red ml-0.5 align-text-bottom animate-cursor-blink" />
                                </div>
                            </div>

                            {/* Links */}
                            <motion.div
                                className="flex flex-wrap gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.8, duration: 0.2 }}
                            >
                                <a
                                    href={profileData.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-[10px]"
                                >
                                    [GitHub]
                                </a>
                                <a
                                    href={profileData.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-[10px]"
                                >
                                    [LinkedIn]
                                </a>
                                <a
                                    href={`mailto:${profileData.email}`}
                                    className="retro-btn text-[10px]"
                                >
                                    [Email]
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Cassette widget */}
                    <div className="mt-8">
                        <CassetteWidget />
                    </div>
                </div>
            </RetroWindow>
        </section>
    );
}
