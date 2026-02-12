"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, Project } from "@/data/mockData";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";
import Link from "next/link";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";

/* ──────────────────────────────────────────────
   PROJECTS SECTION
   
   Vertical expansion panel (accordion).
   Only one project active at a time.
   ────────────────────────────────────────────── */

function FolderIcon({ open }: { open: boolean }) {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-150 flex-shrink-0">
            {open ? (
                <g>
                    {/* Open Folder */}
                    <path d="M4 6V20H20V8H14L12 6H4Z" fill="var(--color-bg-alt)" stroke="var(--color-border-light)" strokeWidth="1.5" />
                    {/* Front flap open/down */}
                    <path d="M4 14L6 20H18L20 14H4Z" fill="var(--color-bg)" stroke="var(--color-border-light)" strokeWidth="1.5" />
                </g>
            ) : (
                <g>
                    {/* Closed Folder */}
                    <path d="M4 6H12L14 8H20V18H4V6Z" fill="var(--color-bg)" stroke="var(--color-border-light)" strokeWidth="1.5" />
                    {/* Front flap */}
                    <path d="M4 9H20V18H4V9Z" fill="var(--color-bg-alt)" stroke="var(--color-border-light)" strokeWidth="1.5" />
                </g>
            )}
        </svg>
    );
}

function ProjectFolder({
    project,
    index,
    isActive,
    onClick
}: {
    project: Project;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) {
    const num = String(index + 1).padStart(2, "0");

    return (
        <motion.div
            layout
            className={`border border-border bg-bg-window hover:border-border-light transition-all cursor-pointer overflow-hidden ${isActive ? 'pb-4' : ''}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.3,
            }}
        >
            {/* Header/Tab */}
            <div className="p-4 flex items-center gap-4">
                <div className="folder-icon">
                    <FolderIcon open={isActive} />
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-between">
                    <div>
                        <h3 className={`font-bold text-fg typewriter-font truncate transition-all ${isActive ? 'text-lg text-red' : 'text-sm'}`}>
                            {project.title}
                        </h3>
                        <p className="text-[10px] text-fg-faint tracking-wider mt-0.5">
                            TRACK {num} // {project.techStack[0]}
                        </p>
                    </div>
                    <div className={`transform transition-transform duration-300 ${isActive ? 'rotate-90' : 'rotate-0'}`}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-fg-muted" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content - Only visible when active */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-4 md:px-16 pb-2 border-t border-dashed border-border-light pt-4 mx-4">
                            <div className="typewriter-font text-xs leading-relaxed mb-4 text-fg-muted max-w-2xl">
                                <TypewriterText text={project.description} speed={15} delay={0.1} />
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map((t) => (
                                    <span key={t} className="text-[10px] font-mono border border-border px-2 py-1 text-fg-faint bg-bg-alt">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="retro-btn text-xs flex items-center gap-2 group"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>VIEW_DETAILS</span>
                                </Link>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-xs flex items-center gap-2"
                                >
                                    <IconBrandGithub size={14} />
                                </a>
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="retro-btn text-xs bg-red text-white border-red flex items-center gap-2"
                                    >
                                        <IconExternalLink size={14} />
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

export default function ProjectsSection() {
    const [activeId, setActiveId] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setActiveId(current => current === id ? null : id);
    };

    return (
        <section id="projects" className="px-1 md:px-2 mb-6">
            <RetroWindow title="C:\PROJECTS" delay={0.15}>
                {/* Header */}
                <div className="h-8 border-b border-border flex items-center justify-between px-3 bg-bg-alt">
                    <span className="tape-label">▶ SIDE A — PROJECTS</span>
                    <span className="text-[10px] text-fg-faint">{projectsData.length} tracks</span>
                </div>

                {/* Vertical Stack Container */}
                <div className="p-4 flex flex-col gap-3">
                    {projectsData.map((project, i) => (
                        <ProjectFolder
                            key={project.id}
                            project={project}
                            index={i}
                            isActive={activeId === project.id}
                            onClick={() => handleToggle(project.id)}
                        />
                    ))}
                </div>
            </RetroWindow>
        </section>
    );
}
