"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, Project } from "@/data/mockData";
import RetroWindow from "./RetroWindow";

/* ──────────────────────────────────────────────
   PROJECTS WINDOW
   
   File-manager grid with cassette tape labels
   on each project. Clicking expands to show
   details on typewriter paper.
   ────────────────────────────────────────────── */

function FolderIcon({ open }: { open: boolean }) {
    return (
        <svg viewBox="0 0 32 28" className="w-10 h-9 transition-colors duration-150">
            {open ? (
                <>
                    <path d="M2 6h28v18H2z" fill="var(--color-bg-alt)" stroke="var(--color-border-light)" strokeWidth="1" />
                    <path d="M0 8h24l4-4H4z" fill="var(--color-titlebar)" stroke="var(--color-border-light)" strokeWidth="1" />
                    <path d="M2 8l-2 16h28l2-16z" fill="var(--color-card)" stroke="var(--color-border-light)" strokeWidth="1" />
                </>
            ) : (
                <>
                    <path d="M2 4h10l2 2h16v18H2z" fill="var(--color-card)" stroke="var(--color-border-light)" strokeWidth="1" />
                    <path d="M2 8h28v14H2z" fill="var(--color-bg-alt)" stroke="var(--color-border-light)" strokeWidth="1" />
                </>
            )}
        </svg>
    );
}

function ProjectFolder({ project, index }: { project: Project; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const num = String(index + 1).padStart(2, "0");

    return (
        <motion.div
            className="border border-border bg-bg-window hover:border-border-light transition-colors cursor-pointer folder-hover"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                delay: index * 0.06,
                duration: 0.15,
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
        >
            {/* Folder header */}
            <div className="p-4 flex items-center gap-3">
                <div className="folder-icon">
                    <FolderIcon open={isOpen} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-fg typewriter-font truncate">
                        {project.title}
                    </p>
                    <p className="text-[10px] text-fg-faint tracking-wider">
                        TRACK {num}
                    </p>
                </div>
                <span className="text-fg-faint text-xs">
                    {isOpen ? "▾" : "▸"}
                </span>
            </div>

            {/* Expanded — typewriter paper detail */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "linear" }}
                        className="overflow-hidden"
                    >
                        <div className="paper-insert paper-lines px-4 py-4 pl-10 border-t border-border">
                            <p className="typewriter-font text-xs leading-[28px] mb-3" style={{ color: "var(--color-ink)" }}>
                                <span style={{ color: "var(--color-red)" }}>—</span> {project.description}
                            </p>

                            {/* Tech stack as cassette label tags */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {project.techStack.map((t) => (
                                    <span key={t} className="tape-label">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-2">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-[10px] px-3 py-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    SOURCE
                                </a>
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="retro-btn text-[10px] px-3 py-1 bg-red text-white border-red"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        PLAY →
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function ProjectsWindow() {
    return (
        <section id="projects" className="px-4 md:px-8 mb-6">
            <RetroWindow title="C:\PROJECTS" delay={0.15}>
                {/* Header with cassette label and reel */}
                <div className="h-8 border-b border-border flex items-center justify-between px-3 bg-bg-alt">
                    <span className="tape-label">▶ SIDE A — PROJECTS</span>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 animate-reel-slow opacity-50">
                            <svg viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="7" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.8" />
                                <circle cx="8" cy="8" r="3" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
                                <circle cx="8" cy="8" r="1" fill="var(--color-fg-faint)" />
                            </svg>
                        </div>
                        <span className="text-[10px] text-fg-faint">{projectsData.length} tracks</span>
                    </div>
                </div>

                {/* File grid */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projectsData.map((project, i) => (
                        <ProjectFolder key={project.id} project={project} index={i} />
                    ))}
                </div>
            </RetroWindow>
        </section>
    );
}
