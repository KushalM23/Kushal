"use client";

import React from "react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

/* ──────────────────────────────────────────────
   RETRO WINDOW
   
   Reusable window shell with title bar chrome.
   Three variants: normal, terminal, notepad.
   Mechanical spring entrance animation.
   ────────────────────────────────────────────── */

interface RetroWindowProps {
    title: string;
    children: React.ReactNode;
    variant?: "normal" | "terminal" | "notepad";
    className?: string;
    menuItems?: string[];
    delay?: number;
}

export default function RetroWindow({
    title,
    children,
    variant = "normal",
    className = "",
    menuItems,
    delay = 0,
}: RetroWindowProps) {
    const isTerminal = variant === "terminal";

    return (
        <motion.div
            className={`retro-window ${className}`}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                delay,
                duration: 0.25,
                type: "spring",
                stiffness: 350,
                damping: 28,
            }}
        >
            {/* Title bar */}
            <div className="retro-titlebar">
                <div className="retro-titlebar-btns">
                    <span />
                    <span />
                    <span />
                </div>
                <span className={"flex-1 text-lg text-center text-fg-muted"}>
                    <TypewriterText text={title} delay={delay + 0.2} speed={50} showCursor={true} />
                </span>
                <span className="text-fg-faint w-13 text-right">
                    {variant === "terminal" ? "bash" : variant === "notepad" ? "txt" : "exe"}
                </span>
            </div>

            {/* Optional menu bar (for notepad) */}
            {menuItems && (
                <div className="h-7 border-b border-border flex items-center gap-4 px-3 text-[11px] text-fg-muted bg-bg-alt">
                    {menuItems.map((item) => (
                        <span key={item} className="hover:text-fg cursor-default">{item}</span>
                    ))}
                </div>
            )}

            {/* Body */}
            <div className={`${isTerminal ? "bg-bg font-mono" : ""}`}>
                {children}
            </div>
        </motion.div>
    );
}
