"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/mockData";
import { useRouter } from "next/navigation";

const HEADER_H = 54;

interface LockedHeaderProps {
    onBackClick?: () => void;
}

export default function LockedHeader({ onBackClick }: LockedHeaderProps) {
    const router = useRouter();
    const [pageProgress, setPageProgress] = useState(0);

    // Page scroll progress tracking
    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
                setPageProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            sessionStorage.setItem("home:preserve-scroll", "1");
            router.back();
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg flex items-center justify-center"
            style={{
                height: HEADER_H,
                willChange: "height",
            }}
        >
            {/* Name container — centered and visible */}
            <div className="h-full flex items-center justify-center px-4">
                <button
                    onClick={handleClick}
                    className="typewriter-font text-fg font-bold text-2xl leading-none hover:text-red transition-colors cursor-pointer"
                >
                    {profileData.name}
                    <span className="text-red inline-block ml-0.5 font-bold animate-cursor-blink">_</span>
                </button>
            </div>

            {/* Scroll Progress Bar */}
            <div
                className="absolute bottom-0 left-0 h-0.5 bg-red z-50"
                style={{ width: `${pageProgress * 100}%`, transition: 'width 100ms linear' }}
            />
        </motion.div>
    );
}
