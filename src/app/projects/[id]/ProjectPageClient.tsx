"use client";

import React, { use, useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { Project } from "@/data/content";
import RetroWindow from "@/components/RetroWindow";
import LockedHeader from "@/components/LockedHeader";
import ScrollAnimatedSection, { useScrollInView } from "@/components/ScrollAnimatedSection";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconArrowRight, IconBrandGithub, IconExternalLink, IconServer } from "@tabler/icons-react";
import TypewriterText from "@/components/TypewriterText";
import { AnimatePresence, motion } from "framer-motion";

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

function resolveScreenshotPath(source: string) {
    const path = source.trim();
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
    if (path.startsWith("public/")) return `/${path.slice("public/".length)}`;
    return `/${path.replace(/^\.\//, "")}`;
}

function ScreenshotCarousel({ title, sources }: { title: string; sources?: string[] }) {
    const screenshots = useMemo(
        () => (sources ?? []).filter((source) => typeof source === "string" && source.trim()),
        [sources],
    );
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        screenshots.forEach((source) => {
            const image = new window.Image();
            image.src = resolveScreenshotPath(source);
        });
    }, [screenshots]);

    if (!screenshots.length) {
        return (
            <div className="w-full aspect-[16/10] bg-bg-alt border border-border-light flex items-center justify-center text-center text-fg-faint font-mono p-8">
                <span className="text-xs uppercase tracking-widest border border-dashed border-fg-faint px-4 py-2">
                    No screenshots available
                </span>
            </div>
        );
    }

    const showPrevious = () => {
        setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
    };
    const showNext = () => {
        setActiveIndex((current) => (current + 1) % screenshots.length);
    };
    const showScreenshot = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="w-full bg-bg-alt p-2 md:p-3">
            <div className="relative overflow-hidden bg-bg-window border border-border-light">
                <div className="aspect-[16/10] flex items-center justify-center overflow-hidden p-2 md:p-4">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={screenshots[activeIndex]}
                            className="flex max-h-full max-w-full items-center justify-center"
                            variants={{
                                enter: {
                                    opacity: 0,
                                    clipPath: "inset(50% 0 50% 0)",
                                    filter: "grayscale(1) contrast(1.8) brightness(1.45)",
                                },
                                center: {
                                    opacity: [0, 1, 1],
                                    clipPath: ["inset(50% 0 50% 0)", "inset(50% 0 50% 0)", "inset(0 0 0 0)"],
                                    filter: ["grayscale(1) contrast(1.8) brightness(1.45)", "grayscale(1) contrast(2) brightness(1.7)", "grayscale(0) contrast(1) brightness(1)"],
                                    transition: { duration: 0.28, times: [0, 0.52, 1], ease: "linear" },
                                },
                                exit: {
                                    opacity: [1, 0.8, 0],
                                    clipPath: ["inset(0 0 0 0)", "inset(49% 0 49% 0)", "inset(50% 0 50% 0)"],
                                    filter: ["grayscale(0) contrast(1) brightness(1)", "grayscale(1) contrast(2) brightness(1.7)", "grayscale(1) contrast(1.8) brightness(1.45)"],
                                    transition: { duration: 0.38, times: [0, 0.18, 1], ease: "linear" },
                                },
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <img
                                src={resolveScreenshotPath(screenshots[activeIndex])}
                                alt={`${title} screenshot ${activeIndex + 1} of ${screenshots.length}`}
                                className="block max-h-full max-w-full object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                    <motion.div
                        key={`static-${screenshots[activeIndex]}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.95, 0.25, 0.65, 0] }}
                        transition={{ duration: 0.38, times: [0, 0.12, 0.35, 0.62, 1], ease: "linear" }}
                        className="pointer-events-none absolute inset-0 mix-blend-multiply"
                        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0, transparent 1px, rgba(44,36,22,0.38) 2px, transparent 3px), repeating-linear-gradient(90deg, rgba(230,57,70,0.06) 0, transparent 2px, rgba(45,138,78,0.05) 4px, transparent 6px)" }}
                        aria-hidden="true"
                    />
                    <motion.div
                        key={`channel-line-${screenshots[activeIndex]}`}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 0] }}
                        transition={{ duration: 0.38, times: [0, 0.14, 0.52, 1], ease: "linear" }}
                        className="pointer-events-none absolute left-0 right-0 top-1/2 h-0.5 bg-paper shadow-[0_0_10px_3px_rgba(253,251,247,0.95)]"
                        aria-hidden="true"
                    />
                </div>

                {screenshots.length > 1 && (
                    <>
                    <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous screenshot"
                        className="absolute left-2 top-1/2 -translate-y-1/2 retro-btn !p-2 bg-bg-window/90"
                    >
                        <IconArrowLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next screenshot"
                        className="absolute right-2 top-1/2 -translate-y-1/2 retro-btn !p-2 bg-bg-window/90"
                    >
                        <IconArrowRight size={16} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-bg-window border border-border-light px-3 py-1.5 font-mono text-[10px] text-fg-muted">
                        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}</span>
                        </div>
                </>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-size-[100%_4px,3px_100%] pointer-events-none z-10 opacity-30" />
            </div>

            {screenshots.length > 1 && (
                <div className="flex justify-center gap-2 pt-3" aria-label="Screenshot navigation">
                    {screenshots.map((screenshot, index) => (
                        <button
                            type="button"
                            key={`${screenshot}-${index}`}
                            onClick={() => showScreenshot(index)}
                            aria-label={`Show screenshot ${index + 1}`}
                            aria-current={index === activeIndex ? "true" : undefined}
                            className={`h-1.5 transition-all ${index === activeIndex ? "w-6 bg-red" : "w-1.5 bg-border-light hover:bg-fg-muted"}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


export default function ProjectPage({ params, project }: { params: Promise<{ id: string }>; project?: Project }) {
    const router = useRouter();
    use(params);

    // Always start at top — prevents inheriting scroll from previous page
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);
    const resolvedProject = project;

    if (!resolvedProject) {
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

            <main className="min-h-screen px-3 md:px-4 pt-20 md:pt-24 pb-16 md:pb-20 mx-auto max-w-5xl">
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

            <RetroWindow title={`${resolvedProject.title}.exe`} delay={0.1}>
                <div className="p-4 md:p-10">
                    {/* Header */}
                    <div className="border-b border-dashed border-border-light pb-4 md:pb-6 mb-6 md:mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                            <h1 className="text-2xl md:text-5xl font-bold text-fg typewriter-font">
                                <TypewriterText text={resolvedProject.title} delay={0.2} speed={30} showCursor={true} />
                            </h1>
                            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                                <a
                                    href={resolvedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="retro-btn text-xs flex items-center gap-2"
                                >
                                    <IconBrandGithub size={14} /> SOURCE
                                </a>
                                {resolvedProject.live && (
                                    <a
                                    href={resolvedProject.live}
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

                    {/* Screenshots */}
                    <ScrollAnimatedSection className="mb-6 md:mb-10" animationType="slide" delay={0.15}>
                        <RetroWindow title={`PREVIEW`} variant="notepad" delay={0.2}>
                            <ScreenshotCarousel title={resolvedProject.title} sources={resolvedProject.screenshots} />
                        </RetroWindow>
                    </ScrollAnimatedSection>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        <div className="md:col-span-2 space-y-8">

                            {/* Description Box */}
                            <ScrollAnimatedSection className="bg-bg-alt border border-border p-4 md:p-6 font-mono text-sm leading-relaxed text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="Overview" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <DelayedContent delay={0.7}>
                                    <p className="whitespace-pre-line">
                                        {resolvedProject.longDescription}
                                    </p>
                                </DelayedContent>
                            </ScrollAnimatedSection>

                            {/* Features */}
                            <ScrollAnimatedSection className="font-mono text-sm leading-7 text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="Key_Features" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <ul className="grid gap-3">
                                    {resolvedProject.features?.length ? resolvedProject.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-red mt-0.5 shrink-0">— </span><TypewriterText text={feature} delay={0.8 + (i * 0.2)} speed={20} showCursor={true} />
                                        </li>
                                    )) : (
                                        <li className="text-fg-faint italic">{"// NO_FEATURES_ADDED"}</li>
                                    )}
                                </ul>
                            </ScrollAnimatedSection>

                            {/* Architecture */}
                            <ScrollAnimatedSection className="font-mono text-sm leading-7 text-fg-muted" animationType="slide">
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="System_Architecture" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <DelayedContent delay={0.8}>
                                    <div className="bg-bg-window border border-border p-4 md:p-5 rounded text-xs md:text-sm">
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-fg-faint mb-3 border-b border-border-light pb-2">
                                            <IconServer size={14} /> Architecture_Diagram_v1
                                        </div>
                                        <p className="whitespace-pre-line leading-relaxed">
                                            {resolvedProject.architecture}
                                        </p>
                                    </div>
                                </DelayedContent>
                            </ScrollAnimatedSection>
                        </div>

                        {/* Metadata / Sidebar */}
                        <div className="space-y-6">
                            <ScrollAnimatedSection className="border border-border p-4 md:p-5 bg-bg-window rounded" animationType="slide" delay={0.1}>
                                <div className="text-fg block mb-3 text-xs uppercase tracking-widest border-b border-border-light pb-2">
                                    <TypewriterText className="font-bold text-sm" text="Fun_Facts" delay={0.5} speed={10} showCursor={true} />
                                </div>
                                <ul className="grid gap-3 font-mono text-sm leading-7 text-fg-muted">
                                    {resolvedProject.funFacts?.length ? resolvedProject.funFacts.map((fact, i) => (
                                        <li key={`${fact}-${i}`} className="flex items-start gap-2">
                                            <span className="text-red mt-0.5 shrink-0">— </span>{fact}
                                        </li>
                                    )) : (
                                        <li className="text-fg-faint italic">{"// NO_FUN_FACTS_ADDED"}</li>
                                    )}
                                </ul>
                            </ScrollAnimatedSection>

                            <ScrollAnimatedSection className="border border-border p-4 md:p-5 bg-bg-window top-24 rounded" animationType="slide" delay={0.1}>
                                <h3 className="text-xs font-bold text-fg uppercase tracking-widest mb-4 border-b border-border-light pb-2">Project_Stats</h3>
                                <ul className="space-y-3 text-xs font-mono text-fg-muted">
                                    <li className="flex justify-between">
                                        <span className="text-fg-faint">ID:</span>
                                        <span className="text-fg">{String(resolvedProject.id).padStart(3, '0')}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-fg-faint">Status:</span>
                                        <span className={`font-bold ${resolvedProject.unavailable ? "text-red" : "text-green"}`}>
                                            {resolvedProject.unavailable ? "UNAVAILABLE" : "EXTRACTED"}
                                        </span>
                                    </li>
                                </ul>

                                <div className="mt-6 border-t border-dashed border-border-light pt-4">
                                    <h4 className="text-[10px] font-bold text-fg uppercase tracking-widest mb-3">Tech_Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {resolvedProject.techStack.length ? resolvedProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] bg-bg-alt border border-border px-2 py-1 text-fg-muted font-mono hover:border-red hover:text-red transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        )) : (
                                            <span className="text-[10px] text-fg-faint font-mono">{"// NO_TECH_STACK_ADDED"}</span>
                                        )}
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
