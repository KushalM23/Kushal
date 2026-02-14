"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profileData } from "@/data/mockData";
import RetroWindow from "./RetroWindow";
import CassetteWidget from "./CassetteWidget";
import TypewriterText from "./TypewriterText";

/* ──────────────────────────────────────────────
   ABOUT WINDOW
   
   Bio on typewriter paper (cream background with
   ruled lines and red margin). Photo in a
   retro viewfinder frame. CassetteWidget below.
   ────────────────────────────────────────────── */

export default function AboutSection() {

    return (
        <section id="about" className="px-1 md:px-2 mb-6">
            <RetroWindow title="ABOUT.exe" delay={0.1}>
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile photo — retro viewfinder */}
                        <div className="shrink-0 flex flex-col items-center gap-3">
                            <div className="relative">
                                <div className="w-36 h-36 md:w-44 md:h-44 border-2 border-border-strong overflow-hidden bg-bg">
                                    <Image
                                        src="/profile pic wo bg.png"
                                        alt="Kushal"
                                        width={176}
                                        height={176}
                                        className="object-cover w-full h-full brightness-125 contrast-75 grayscale hover:grayscale-0 transition-all duration-500"
                                        priority
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
                                viewport={{ once: true }}
                                transition={{ duration: 0.01, delay: 0.2 }}
                            >
                                <h1 className="typewriter-font text-3xl md:text-4xl text-fg mb-1">
                                    {profileData.name}<span className="text-red">_</span>
                                </h1>
                                <p className="text-xs text-fg-muted tracking-widest uppercase mb-4">
                                    [{profileData.tagline}]
                                </p>
                            </motion.div>

                            {/* Typewriter paper with bio */}
                            <div className="paper-insert paper-lines p-5 pl-14 mb-6">
                                <div className="text-sm leading-7 text-fg">
                                    <TypewriterText
                                        text={profileData.bio}
                                        className="typewriter-font"
                                        delay={0.4}
                                        speed={15}
                                        showCursor={true}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="retro-btn text-xs px-4 py-2 flex items-center gap-2"
                                >
                                    <span>[CONTACT]</span>
                                </button>

                                <a
                                    href="/resume.pdf"
                                    download="Kushal_Resume.pdf"
                                    className="retro-btn text-xs px-4 py-2 flex items-center gap-2"
                                >
                                    <span>[RESUME]</span>
                                </a>
                            </div>
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
