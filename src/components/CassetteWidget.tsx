"use client";

import { IconPlayerPlay, IconPlayerPause, IconPlayerStop, IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";

/* ──────────────────────────────────────────────
   CASSETTE WIDGET
   
   Physical cassette player body with rounded
   casing, spinning reels, tape window, and
   mechanical transport buttons.
   ────────────────────────────────────────────── */

export default function CassetteWidget() {
    return (
        <div className="cassette-body p-5 md:p-6">
            {/* Cassette label */}
            <div className="text-center mb-4">
                <span className="tape-label">◉ PORTFOLIO MIX — SIDE A ◉</span>
            </div>

            {/* Tape window — the transparent part of a cassette */}
            <div className="border border-border-light bg-bg mx-auto max-w-xs rounded p-3">
                <div className="flex items-center justify-center gap-8">
                    {/* Left reel */}
                    <div className="w-16 h-16 animate-reel-slow">
                        <svg viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r="20" fill="none" stroke="var(--color-border)" strokeWidth="0.8" />
                            <circle cx="32" cy="32" r="10" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r="3" fill="var(--color-fg-faint)" />
                            {/* Spokes */}
                            {[0, 60, 120, 180, 240, 300].map((a) => (
                                <line
                                    key={a}
                                    x1="32" y1="32"
                                    x2={32 + 28 * Math.cos((a * Math.PI) / 180)}
                                    y2={32 + 28 * Math.sin((a * Math.PI) / 180)}
                                    stroke="var(--color-border)"
                                    strokeWidth="0.4"
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Tape between reels */}
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full border-t border-fg-faint" />
                        <div className="w-full border-t border-dashed border-border" />
                        <div className="w-full border-t border-fg-faint" />
                    </div>

                    {/* Right reel */}
                    <div className="w-16 h-16 animate-reel-spin">
                        <svg viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r="20" fill="none" stroke="var(--color-border)" strokeWidth="0.8" />
                            <circle cx="32" cy="32" r="10" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r="3" fill="var(--color-fg-faint)" />
                            {[0, 60, 120, 180, 240, 300].map((a) => (
                                <line
                                    key={a}
                                    x1="32" y1="32"
                                    x2={32 + 28 * Math.cos((a * Math.PI) / 180)}
                                    y2={32 + 28 * Math.sin((a * Math.PI) / 180)}
                                    stroke="var(--color-border)"
                                    strokeWidth="0.4"
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            {/* Transport controls — physical buttons */}
            <div className="flex items-center justify-center gap-2 mt-5">
                <button className="retro-btn text-[10px] px-3 py-1.5">  <IconPlayerTrackPrev /></button>
                <button className="retro-btn text-[10px] px-5 py-1.5 bg-red text-white border-red font-bold"><IconPlayerPlay /></button>
                <button className="retro-btn text-[10px] px-3 py-1.5"><IconPlayerPause /></button>
                <button className="retro-btn text-[10px] px-3 py-1.5"><IconPlayerStop /></button>
                <button className="retro-btn text-[10px] px-3 py-1.5"><IconPlayerTrackNext /></button>
            </div>

            {/* Bottom label */}
            <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex-1 border-t border-dashed border-border" />
                <span className="text-[8px] text-fg-faint tracking-[0.25em] uppercase">
                    TYPE II — HIGH BIAS — 2026
                </span>
                <div className="flex-1 border-t border-dashed border-border" />
            </div>
        </div>
    );
}
