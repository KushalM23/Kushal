import React from "react";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";
import { ProfileContent } from "@/types/content";

interface ContactSectionProps {
    profile: ProfileContent;
}

export default function ContactSection({ profile }: ContactSectionProps) {
    const contactLinks = [
        profile.email ? { href: `mailto:${profile.email}`, label: "[EMAIL]" } : null,
        profile.linkedin ? { href: profile.linkedin, label: "[LINKEDIN]" } : null,
        profile.github ? { href: profile.github, label: "[GITHUB]" } : null,
    ].filter(Boolean) as Array<{ href: string; label: string }>;

    return (
        <section id="contact" className="px-1 md:px-2 mb-6">
            <RetroWindow
                title="CONTACT.txt"
                delay={0.25}
            >
                <div className="p-4 md:p-12 flex flex-col items-center justify-center bg-bg-alt/30">

                    <h2 className="typewriter-font text-xl md:text-3xl text-fg font-bold mb-6 md:mb-8 text-center">
                        <TypewriterText text="GET IN TOUCH" delay={0.5} speed={30} showCursor={true} />
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                className="retro-btn py-3 px-4 md:py-4 md:px-6 flex items-center justify-center gap-3 flex-1 group"
                            >
                                <span className="text-xs md:text-sm font-bold tracking-wider">{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </RetroWindow>
        </section>
    );
}
