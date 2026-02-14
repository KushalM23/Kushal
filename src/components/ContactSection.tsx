import React from "react";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";
import { profileData } from "@/data/mockData";

export default function ContactSection() {
    return (
        <section id="contact" className="px-1 md:px-2 mb-6">
            <RetroWindow
                title="CONTACT.txt"
                delay={0.25}
            >
                <div className="p-6 md:p-12 flex flex-col items-center justify-center bg-bg-alt/30">

                    <h2 className="typewriter-font text-2xl md:text-3xl text-fg font-bold mb-8 text-center">
                        <TypewriterText text="GET IN TOUCH" delay={0.5} speed={30} showCursor={true} />
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center">
                        <a
                            href={`mailto:${profileData.email}`}
                            className="retro-btn py-4 px-6 flex items-center justify-center gap-3 flex-1 group"
                        >
                            <span className="text-sm font-bold tracking-wider">[EMAIL]</span>
                        </a>

                        <a
                            href={profileData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="retro-btn py-4 px-6 flex items-center justify-center gap-3 flex-1 group"
                        >
                            <span className="text-sm font-bold tracking-wider">[LINKEDIN]</span>
                        </a>

                        <a
                            href={profileData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="retro-btn py-4 px-6 flex items-center justify-center gap-3 flex-1 group"
                        >
                            <span className="text-sm font-bold tracking-wider">[GITHUB]</span>
                        </a>
                    </div>
                </div>
            </RetroWindow>
        </section>
    );
}
