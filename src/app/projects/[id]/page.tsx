"use client";

import React, { use, useLayoutEffect } from "react";
import { projectsData } from "@/data/mockData";
import RetroWindow from "@/components/RetroWindow";
import LockedHeader from "@/components/LockedHeader";
import ScrollAnimatedSection, { useScrollInView } from "@/components/ScrollAnimatedSection";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBrandGithub, IconExternalLink, IconServer, IconDeviceAnalytics } from "@tabler/icons-react";
import TypewriterText from "@/components/TypewriterText";
import { motion } from "framer-motion";

/* Body content that waits for its parent ScrollAnimatedSection to be in view,
   then fades in after a delay (so heading TypewriterText finishes first). */
function DelayedContent({ children, delay = 0.6 }: { children: React.ReactNode; delay?: number }) {
    const isInView = useScrollInView();
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay, duration: 0.4, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}


export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    // Always start at top — prevents inheriting scroll from previous page
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);
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
        <>
            <LockedHeader
                onBackClick={() => {
                    sessionStorage.setItem("home:preserve-scroll", "1");
                    router.back();
                }}
            />

            <main className="min-h-screen px-2 md:px-4 pt-24 md:pt-24 pb-20 mx-auto max-w-5xl">
            <button
                onClick={() => {
                    sessionStorage.setItem("home:preserve-scroll", "1");
                    router.back();
                }}
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
                                <TypewriterText text={project.title} delay={0.2} speed={30} showCursor={true} />
                            </h1>
                            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
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
                    <ScrollAnimatedSection className="mb-10" animationType="slide" delay={0.15}>
                        <div className="w-full aspect-video bg-bg-window border border-border-light relative overflow-hidden flex items-center justify-center group">
                            {project.previewImage ? (
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
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-size-[100%_4px,3px_100%] pointer-events-none z-10 opacity-30"></div>
                        </div>
                    </ScrollAnimatedSection>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">

                            {/* Description Box */}
                            <ScrollAnimatedSection className="bg-bg-alt border border-border p-6 font-mono text-sm leading-relaxed text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="Overview" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <DelayedContent delay={0.7}>
                                    <p className="whitespace-pre-line">
                                        {project.longDescription}
                                    </p>
                                </DelayedContent>
                            </ScrollAnimatedSection>

                            {/* Features */}
                            <ScrollAnimatedSection className="font-mono text-sm leading-7 text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="Key_Features" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <ul className="grid gap-3">
                                    {project.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-red mt-0.5 shrink-0">— </span><TypewriterText text={feature} delay={0.8 + (i * 0.2)} speed={20} showCursor={true} />
                                        </li>
                                    )) || (
                                            <li className="text-fg-faint italic">// No features listed.</li>
                                        )}
                                </ul>
                            </ScrollAnimatedSection>

                            {/* Architecture */}
                            <ScrollAnimatedSection className="font-mono text-sm leading-7 text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="System_Architecture" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <DelayedContent delay={0.8}>
                                    <div className="bg-bg-window border border-border p-5 rounded text-xs md:text-sm">
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-fg-faint mb-3 border-b border-border-light pb-2">
                                            <IconServer size={14} /> Architecture_Diagram_v1
                                        </div>
                                        <p className="whitespace-pre-line leading-relaxed">
                                            {project.architecture}
                                        </p>
                                    </div>
                                </DelayedContent>
                            </ScrollAnimatedSection>
                        </div>

                        {/* Metadata / Sidebar */}
                        <div className="space-y-6">
                            <ScrollAnimatedSection className="border border-border p-5 bg-bg-window top-24 rounded" animationType="slide" delay={0.1}>
                                <h3 className="text-xs font-bold text-fg uppercase tracking-widest mb-4 border-b border-border-light pb-2">Project_Stats</h3>
                                <ul className="space-y-3 text-xs font-mono text-fg-muted">
                                    <li className="flex justify-between">
                                        <span className="text-fg-faint">ID:</span>
                                        <span className="text-fg">{String(project.id).padStart(3, '0')}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-fg-faint">Status:</span>
                                        <span className="text-green font-bold">COMPLETED</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-fg-faint">Year:</span>
                                        <span className="text-fg">2024-2025</span>
                                    </li>
                                </ul>

                                <div className="mt-6 border-t border-dashed border-border-light pt-4">
                                    <h4 className="text-[10px] font-bold text-fg uppercase tracking-widest mb-3">Tech_Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] bg-bg-alt border border-border px-2 py-1 text-fg-muted font-mono hover:border-red hover:text-red transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollAnimatedSection>
                        </div>
                    </div>
                </div>
            </RetroWindow>
            </main>
        </>
    );
}
