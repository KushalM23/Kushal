"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number; // ms per char
    cursorColor?: string;
    wrapperClassName?: string;
    showCursor?: boolean;
}

export default function TypewriterText({
    text,
    className = "",
    delay = 0,
    speed = 30,
    cursorColor = "text-red",
    wrapperClassName = "",
    showCursor = true,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            // Reset state when effect runs
            setDisplayedText("");
            setIsComplete(false);

            let currentIndex = 0;
            let intervalId: NodeJS.Timeout;

            const startTimeout = setTimeout(() => {
                intervalId = setInterval(() => {
                    if (currentIndex < text.length) {
                        // Use slice instead of appending to avoid state synchronization issues
                        // and ensure we never access out of bounds
                        setDisplayedText(text.slice(0, currentIndex + 1));
                        currentIndex++;
                    } else {
                        clearInterval(intervalId);
                        setIsComplete(true);
                    }
                }, speed);
            }, delay * 1000);

            return () => {
                clearTimeout(startTimeout);
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [isInView, text, delay, speed]);

    return (
        <span ref={ref} className={`${wrapperClassName} inline-block`}>
            <span className={className}>{displayedText}</span>
            {showCursor && (
                <span className={`${cursorColor} inline-block ml-0.5 font-bold animate-cursor-blink`}>
                    _
                </span>
            )}
        </span>
    );
}
