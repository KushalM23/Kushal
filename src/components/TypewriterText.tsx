"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { soundManager } from "@/utils/sounds";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number; // ms per char
    cursorColor?: string;
    wrapperClassName?: string;
    showCursor?: boolean;
    mute?: boolean;
    startWhenInitiallyVisible?: boolean;
}

export default function TypewriterText({
    text,
    className = "",
    delay = 0,
    speed = 30,
    cursorColor = "text-red",
    wrapperClassName = "",
    showCursor = false,
    mute = true,
    startWhenInitiallyVisible = false,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [shouldStart, setShouldStart] = useState(false);
    const ref = React.useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

    // Auto-adjust speed for long text to avoid painfully slow rendering
    const effectiveSpeed = text.length > 100 ? Math.min(speed, 8) : text.length > 50 ? Math.min(speed, 15) : speed;

    useEffect(() => {
        if (isInView) {
            setShouldStart(true);
        }
    }, [isInView]);

    useEffect(() => {
        if (!startWhenInitiallyVisible || shouldStart) return;

        const node = ref.current;
        if (!node) return;

        const checkVisibility = () => {
            const rect = node.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

            const isVerticallyVisible = rect.top < viewportHeight - 8 && rect.bottom > 8;
            const isHorizontallyVisible = rect.left < viewportWidth && rect.right > 0;

            if (isVerticallyVisible && isHorizontallyVisible) {
                setShouldStart(true);
            }
        };

        checkVisibility();
        const frameId = requestAnimationFrame(checkVisibility);
        window.addEventListener("resize", checkVisibility, { passive: true });

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", checkVisibility);
        };
    }, [shouldStart, startWhenInitiallyVisible]);

    useEffect(() => {
        if (shouldStart) {
            setDisplayedText("");
            setIsComplete(false);

            let currentIndex = 0;
            let intervalId: NodeJS.Timeout;

            const startTimeout = setTimeout(() => {
                intervalId = setInterval(() => {
                    if (currentIndex < text.length) {
                        const char = text[currentIndex];

                        // Typewriter sound only plays when explicitly enabled (mute=false)
                        // Only the boot screen name typing should set mute=false
                        if (!mute && char !== " ") {
                            soundManager?.playTypewriterClick();
                        }

                        setDisplayedText(text.slice(0, currentIndex + 1));
                        currentIndex++;
                    } else {
                        clearInterval(intervalId);
                        setIsComplete(true);
                    }
                }, effectiveSpeed);
            }, delay * 1000);

            return () => {
                clearTimeout(startTimeout);
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [shouldStart, text, delay, effectiveSpeed, mute]);

    return (
        <span ref={ref} className={wrapperClassName}>
            <span className={className}>{displayedText}</span>
            {showCursor && (
                <span className={`${cursorColor} inline-block ml-0.5 font-bold animate-cursor-blink`}>
                    _
                </span>
            )}
        </span>
    );
}
