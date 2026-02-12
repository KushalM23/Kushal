"use client";

import React, { use } from "react";
import { projectsData } from "@/data/mockData";
import RetroWindow from "@/components/RetroWindow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBrandGithub, IconExternalLink, IconServer, IconDeviceAnalytics, IconCode } from "@tabler/icons-react";
import TypewriterText from "@/components/TypewriterText";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const projectId = parseInt(id);
    const project = projectsData.find((p) => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center font-mono">
                    <h1 className="text-2xl text-red font-bold mb-4">404: PROJECT_NOT_FOUND</h1>
                    <button onClick={() => router.push('/')} className="retro-btn">
                        &lt;- RETURN_ROOT
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen p-2 md:p-8 pt-24 md:pt-32 pb-20 container mx-auto max-w-4xl">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-xs font-mono text-fg-muted mb-6 hover:text-red transition-colors group"
            >
                <IconArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>BACK_TO_ARCHIVE</span>
            </button>

            <RetroWindow title={`${project.title}.exe`} delay={0.1}>
                <div className="p-6 md:p-10">
                    {/* Header */}
                    <div className="border-b border-dashed border-border-light pb-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                            <h1 className="text-3xl md:text-5xl font-bold text-fg typewriter-font">
                                <TypewriterText text={project.title} delay={0.2} speed={30} />
                            </h1>
                            <div className="flex gap-3">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-xs flex items-center gap-2"
                                >
                                    <IconBrandGithub size={14} /> SOURCE
                                </a>
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="retro-btn text-xs bg-red text-white border-red flex items-center gap-2"
                                    >
                                        <IconExternalLink size={14} /> DEMO
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Image Section */}
                    <div className="mb-10">
                        <div className="w-full aspect-video bg-bg-window border border-border-light relative overflow-hidden flex items-center justify-center group">
                            {project.previewImage && !project.previewImage.includes("preview") ? (
                                <img src={project.previewImage} alt={`${project.title} Preview`} className="object-cover w-full h-full" />
                            ) : (
                                <div className="text-center text-fg-faint font-mono p-8">
                                    <div className="mb-2">
                                        <IconDeviceAnalytics size={48} className="mx-auto opacity-50 mb-4" />
                                    </div>
                                    <div className="text-xs uppercase tracking-widest border border-dashed border-fg-faint px-4 py-2 inline-block">
                                        No Signal
                                    </div>
                                    <div className="mt-4 text-[10px] opacity-70">
                                        // Preview data unavailable.
                                    </div>
                                </div>
                            )}
                            {/* Scanline effect overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30"></div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">

                            {/* Description Box */}
                            <div className="bg-bg-alt border border-border p-6 font-mono text-sm leading-relaxed text-fg-muted">
                                <p className="mb-4">
                                    <strong className="text-fg block mb-2 text-xs uppercase tracking-widest border-b border-border-light pb-1">Overview</strong>
                                </p>
                                <TypewriterText text={project.longDescription || project.description} delay={0.5} speed={10} />
                            </div>

                            {/* Features */}
                            <div className="font-mono text-sm leading-7 text-fg-muted">
                                <h2 className="text-sm font-bold text-fg mb-4 flex items-center gap-2 border-b border-border-light pb-2 uppercase tracking-widest">
                                    Key_Features
                                </h2>
                                <ul className="grid gap-2">
                                    {project.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <TypewriterText text={feature} delay={0.8 + (i * 0.2)} speed={20} />
                                        </li>
                                    )) || (
                                            <li className="text-fg-faint italic">// No features listed.</li>
                                        )}
                                </ul>
                            </div>

                            {/* Architecture */}
                            <div className="font-mono text-sm leading-7 text-fg-muted">
                                <h2 className="text-sm font-bold text-fg mb-4 flex items-center gap-2 border-b border-border-light pb-2 uppercase tracking-widest">
                                    System_Architecture
                                </h2>
                                <div className="bg-bg-window border border-border p-4 rounded text-xs md:text-sm">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-fg-faint mb-3 border-b border-border-light pb-2">
                                        <IconServer size={14} /> Architecture_Diagram_v1
                                    </div>
                                    <TypewriterText
                                        text={project.architecture || "Standard MVC architecture following modular patterns."}
                                        delay={1.2}
                                        speed={10}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Metadata / Sidebar */}
                        <div className="space-y-6">
                            <div className="border border-border p-4 bg-bg-window sticky top-4">
                                <h3 className="text-xs font-bold text-fg uppercase tracking-widest mb-3">Project_Stats</h3>
                                <ul className="space-y-2 text-xs font-mono text-fg-muted">
                                    <li className="flex justify-between">
                                        <span>ID:</span>
                                        <span>{String(project.id).padStart(3, '0')}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Status:</span>
                                        <span className="text-green">COMPLETED</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Year:</span>
                                        <span>2024-2025</span>
                                    </li>
                                </ul>

                                <div className="mt-6 border-t border-dashed border-border-light pt-4">
                                    <h4 className="text-[10px] font-bold text-fg uppercase tracking-widest mb-2">Tech_Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <div key={tech} className="text-[10px] bg-bg-alt border border-border px-2 py-1 text-fg-faint font-mono">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="opacity-50 pointer-events-none">
                                {/* ASCII placeholder */}
                                <div className="text-[8px] leading-[8px] font-mono text-fg-faint whitespace-pre text-center border border-border-light p-4">
                                    {`
  .-----.
 /       \\
|  FILES  |
 \\       /
  '-----'
`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RetroWindow>
        </main>
    );
}
