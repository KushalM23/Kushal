"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconPlayerStopFilled, IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from "@tabler/icons-react";
import { soundManager } from "@/utils/sounds";

/* ──────────────────────────────────────────────
   CASSETTE WIDGET
   
   Physical cassette player body with rounded
   casing, spinning reels, tape window, and
   mechanical transport buttons.
   ────────────────────────────────────────────── */

type CassetteState = "idle" | "playing" | "paused" | "rewinding" | "fastforwarding";

export default function CassetteWidget() {
    const [status, setStatus] = useState<CassetteState>("idle");
    const [reelRotation, setReelRotation] = useState(0);
    const [tapeProgress, setTapeProgress] = useState(0.1); // 0 to 1

    // Sound logic
    useEffect(() => {
        if (status === "rewinding") {
            soundManager?.startCassetteWhir(true);
        } else if (status === "fastforwarding") {
            soundManager?.startCassetteWhir(false);
        } else {
            soundManager?.stopCassetteWhir();
        }

        return () => soundManager?.stopCassetteWhir();
    }, [status]);

    const changeStatus = (newStatus: CassetteState) => {
        if (newStatus !== status) {
            soundManager?.playToggle(newStatus !== "idle" && newStatus !== "paused");
            setStatus(newStatus);
        }
    };

    // Animation loop for reels and tape progress
    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            if (status === "playing") {
                setReelRotation(r => (r + 4) % 360);
                setTapeProgress(p => Math.min(p + 0.0005, 1));
            } else if (status === "fastforwarding") {
                setReelRotation(r => (r + 20) % 360);
                setTapeProgress(p => Math.min(p + 0.005, 1));
            } else if (status === "rewinding") {
                setReelRotation(r => (r - 20 + 360) % 360);
                setTapeProgress(p => Math.max(p - 0.005, 0));
            }
            animationFrame = requestAnimationFrame(animate);
        };

        if (status !== "idle" && status !== "paused") {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [status]);

    // Calculate radii based on progress
    // Max radius = 24, Min radius = 12 (hub)
    const leftReelRadius = 12 + (24 - 12) * (1 - tapeProgress);
    const rightReelRadius = 12 + (24 - 12) * tapeProgress;

    const handleReelClick = () => {
        if (status === "idle" || status === "paused") {
            soundManager?.playHover();
            setReelRotation(r => r + 45);
        }
    };

    return (
        <div className="cassette-body p-5 md:p-6 transition-transform duration-300 hover:scale-[1.01] select-none">
            {/* Cassette label */}
            <div className="text-center mb-4 flex justify-between items-end px-2">
                <span className="text-[10px] font-bold text-fg-faint">A</span>
                <span className="tape-label">PORTFOLIO MIX</span>
                <span className="text-[10px] font-bold text-fg-faint">60</span>
            </div>

            {/* Tape window — the transparent part of a cassette */}
            <div className="border border-border-light bg-bg mx-auto max-w-xs rounded p-3 relative overflow-hidden">
                <div className="flex items-center justify-center gap-8">
                    {/* Left reel - Supply */}
                    <div
                        className="w-16 h-16 cursor-pointer active:scale-95"
                        style={{ transform: `rotate(${reelRotation}deg)` }}
                        onClick={handleReelClick}
                    >
                        <svg viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r={leftReelRadius} fill="var(--color-fg-muted)" opacity="0.8" /> {/* Tape bulk */}
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
                    <div className="flex flex-col items-center gap-1 flex-1 relative z-10">
                        <div className="w-full h-[1px] bg-border" style={{ backgroundImage: 'none', backgroundSize: '4px 4px' }} />
                        <div className="w-full h-8 flex items-center justify-center">
                            {/* Felt pad logic visualization */}
                            <div className="w-12 h-4 bg-bg-alt border border-border rounded-sm opacity-50" />
                        </div>
                        <div className="w-full border-t border-fg-faint" />
                    </div>

                    {/* Right reel - Takeup */}
                    <div
                        className="w-16 h-16 cursor-pointer active:scale-95"
                        style={{ transform: `rotate(${reelRotation}deg)` }}
                        onClick={handleReelClick}
                    >
                        <svg viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="1" />
                            <circle cx="32" cy="32" r={rightReelRadius} fill="var(--color-fg-muted)" opacity="0.8" /> {/* Tape bulk */}
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
                <button
                    onClick={() => changeStatus("rewinding")}
                    className={`retro-btn text-[10px] px-3 py-1.5 ${status === "rewinding" ? "bg-bg-alt border-fg-muted inset-shadow" : ""}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 19V5L2 12L11 19ZM22 19V5L13 12L22 19Z" />
                    </svg>
                </button>
                <button
                    onClick={() => changeStatus(status === "playing" ? "paused" : "playing")}
                    className={`retro-btn text-[10px] px-5 py-1.5 font-bold ${status === "playing" ? "bg-red-dark text-white border-red shadow-inner translate-y-[1px]" : "bg-red text-white border-red"}`}
                >
                    {status === "playing" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 19V5H18V19H14ZM6 19V5H10V19H6Z" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                    )}
                </button>
                <button
                    onClick={() => changeStatus("idle")}
                    className={`retro-btn text-[10px] px-3 py-1.5 ${status === "idle" ? "bg-bg-alt" : ""}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6H18V18H6V6Z" />
                    </svg>
                </button>
                <button
                    onClick={() => changeStatus("fastforwarding")}
                    className={`retro-btn text-[10px] px-3 py-1.5 ${status === "fastforwarding" ? "bg-bg-alt border-fg-muted inset-shadow" : ""}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 5V19L22 12L13 5ZM4 5V19L13 12L4 5Z" />
                    </svg>
                </button>
            </div>

            {/* Status LED/Text */}
            <div className="mt-4 text-center">
                <p className="text-[10px] font-mono text-fg-faint uppercase tracking-widest">
                    {status === "idle" ? "READY" : status.toUpperCase()}
                    {status === "playing" && <span className="animate-pulse ml-1">●</span>}
                </p>
            </div>
        </div>
    );
}
