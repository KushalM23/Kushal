"use client";

import React from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/mockData";
import RetroWindow from "./RetroWindow";

/* ──────────────────────────────────────────────
   NOTEPAD WINDOW
   
   Contact form on typewriter paper.
   Cream background, ruled lines, red margin.
   ────────────────────────────────────────────── */

export default function NotepadWindow() {
    return (
        <section id="contact" className="px-4 md:px-8 mb-6">
            <RetroWindow
                title="COMPOSE_MESSAGE.txt — Notepad"
                variant="notepad"
                menuItems={["File", "Edit", "Format", "Help"]}
                delay={0.25}
            >
                {/* Typewriter paper body */}
                <div className="paper-insert paper-lines p-6 pl-14 md:p-8 md:pl-16">
                    {/* Typed header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.1, duration: 0.01 }}
                        className="mb-8"
                    >
                        <h2 className="typewriter-font text-xl md:text-2xl mb-2" style={{ color: "var(--color-ink)" }}>
                            Get in Touch<span style={{ color: "var(--color-red)" }}>_</span>
                        </h2>
                        <p className="typewriter-font text-xs leading-[28px]" style={{ color: "rgba(44,36,22,0.5)" }}>
                            Want to collaborate? Have a question? Type below.
                        </p>
                    </motion.div>

                    {/* Form — styled as typed form fields */}
                    <motion.form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-6"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                            delay: 0.2,
                            duration: 0.15,
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                    >
                        <div>
                            <label
                                className="typewriter-font block text-xs mb-2"
                                style={{ color: "var(--color-ink)" }}
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b-2 border-dashed py-1 text-sm typewriter-font outline-none"
                                style={{
                                    borderColor: "rgba(44,36,22,0.2)",
                                    color: "var(--color-ink)",
                                }}
                                placeholder="Your name..."
                            />
                        </div>
                        <div>
                            <label
                                className="typewriter-font block text-xs mb-2"
                                style={{ color: "var(--color-ink)" }}
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-b-2 border-dashed py-1 text-sm typewriter-font outline-none"
                                style={{
                                    borderColor: "rgba(44,36,22,0.2)",
                                    color: "var(--color-ink)",
                                }}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label
                                className="typewriter-font block text-xs mb-2"
                                style={{ color: "var(--color-ink)" }}
                            >
                                Message:
                            </label>
                            <textarea
                                rows={5}
                                className="w-full bg-transparent border-2 border-dashed p-2 text-sm typewriter-font outline-none resize-none leading-[28px]"
                                style={{
                                    borderColor: "rgba(44,36,22,0.2)",
                                    color: "var(--color-ink)",
                                }}
                                placeholder="Type your message..."
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <span className="text-[10px]" style={{ color: "rgba(44,36,22,0.3)" }}>
                                Ln 1, Col 1
                            </span>
                            <button
                                type="submit"
                                className="retro-btn text-sm typewriter-font"
                            >
                                [SEND] →
                            </button>
                        </div>
                    </motion.form>

                    {/* Contact info — typed at bottom of page */}
                    <motion.div
                        className="mt-8 pt-4"
                        style={{ borderTop: "1px dashed rgba(44,36,22,0.15)" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.4, duration: 0.2 }}
                    >
                        <p className="typewriter-font text-xs mb-3" style={{ color: "rgba(44,36,22,0.4)" }}>
                            — or find me at —
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href={`mailto:${profileData.email}`}
                                className="retro-btn text-[10px] px-3 py-1"
                            >
                                ✉ {profileData.email}
                            </a>
                            <a
                                href={profileData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-btn text-[10px] px-3 py-1"
                            >
                                ◆ GitHub
                            </a>
                            <a
                                href={profileData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-btn text-[10px] px-3 py-1"
                            >
                                ◆ LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </RetroWindow>
        </section>
    );
}
