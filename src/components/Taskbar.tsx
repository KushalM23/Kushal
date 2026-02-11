"use client";

import React, { useState, useEffect } from "react";

/* ──────────────────────────────────────────────
   TASKBAR
   
   Fixed bottom bar with START button,
   section shortcuts, clock, and cassette reel.
   ────────────────────────────────────────────── */

const SECTIONS = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Terminal" },
    { id: "contact", label: "Notepad" },
];

function useClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            );
        };
        tick();
        const id = setInterval(tick, 10000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export default function Taskbar() {
    const clock = useClock();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 h-9 bg-bg-alt border-t border-border flex items-center px-2 gap-1 select-none">
            {/* START button */}
            <button
                className="retro-btn text-[10px] px-3 py-0.5 font-bold flex items-center gap-1"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <span className="text-red">▓</span> START
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-border mx-1" />

            {/* Section shortcuts */}
            {SECTIONS.map((s) => (
                <button
                    key={s.id}
                    className="text-[10px] text-fg-muted hover:text-fg hover:bg-card px-2 py-1 border border-transparent hover:border-border transition-all"
                    onClick={() => scrollTo(s.id)}
                >
                    {s.label}
                </button>
            ))}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mini reel */}
            <div className="w-4 h-4 animate-reel-slow opacity-40 mr-2">
                <svg viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.8" />
                    <circle cx="8" cy="8" r="3" fill="none" stroke="var(--color-fg-muted)" strokeWidth="0.5" />
                    <circle cx="8" cy="8" r="1" fill="var(--color-fg-faint)" />
                </svg>
            </div>

            {/* Clock */}
            <div className="border border-border px-2 py-0.5 text-[10px] text-fg-muted bg-bg">
                {clock}
            </div>
        </div>
    );
}
