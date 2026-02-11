"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ──────────────────────────────────────────────
   OS MENU BAR
   
   Sticky top bar resembling classic Mac/Windows.
   Shows after boot. Has OS name + live clock.
   ────────────────────────────────────────────── */

function useClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        };
        tick();
        const id = setInterval(tick, 10000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export default function OSMenuBar() {
    const { scrollY } = useScroll();
    const barOpacity = useTransform(scrollY, [200, 500], [0, 1]);
    const clock = useClock();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-40 h-8 bg-bg-alt border-b border-border flex items-center justify-between px-4 text-xs text-fg-muted select-none"
            style={{ opacity: barOpacity }}
        >
            <div className="flex items-center gap-4">
                <span className="text-fg font-bold">
                    ▓ KUSHAL<span className="text-red">_</span>OS
                </span>
                <span className="text-fg-faint">│</span>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Help</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-fg-faint">v2.6</span>
                <span className="text-fg-faint">│</span>
                <span>{clock}</span>
            </div>
        </motion.div>
    );
}
