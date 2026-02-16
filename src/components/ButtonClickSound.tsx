"use client";

import { useEffect } from "react";
import { soundManager } from "@/utils/sounds";

/**
 * Global click-sound handler.
 * Plays the unified mechanical click on any interactive element:
 * buttons, links, [role="button"], and .retro-btn.
 */
export default function ButtonClickSound() {
    useEffect(() => {
        const isInteractive = (el: HTMLElement | null): boolean => {
            while (el) {
                const tag = el.tagName;
                if (
                    tag === "BUTTON" ||
                    tag === "A" ||
                    el.getAttribute("role") === "button" ||
                    el.classList.contains("retro-btn") ||
                    el.classList.contains("cursor-pointer") ||
                    el.hasAttribute("onclick") ||
                    (tag === "INPUT" && ["button", "submit", "reset"].includes((el as HTMLInputElement).type))
                ) {
                    return true;
                }
                el = el.parentElement;
            }
            return false;
        };

        const handlePointerDown = (e: PointerEvent) => {
            if (isInteractive(e.target as HTMLElement)) {
                soundManager?.playClick();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            if (isInteractive(e.target as HTMLElement)) {
                soundManager?.playClick();
            }
        };

        // Warm up AudioContext on very first user gesture so the typewriter
        // sound can play immediately.
        const warmUp = () => {
            soundManager?.warmUp();
            events.forEach(e => document.removeEventListener(e, warmUp, true));
        };
        const events = ["click", "mousedown", "pointerdown", "keydown", "touchstart"] as const;
        events.forEach(e => document.addEventListener(e, warmUp, { capture: true, once: false }));

        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("keydown", handleKeyDown, true);
            events.forEach(e => document.removeEventListener(e, warmUp, true));
        };
    }, []);

    return null;
}
