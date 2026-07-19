"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CassetteWidget from "./CassetteWidget";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";
import { GitHubStats, PortfolioSkill, ProfileContent } from "@/types/content";

interface AboutSectionProps {
  profile: ProfileContent;
  skills: PortfolioSkill[];
  stats: GitHubStats;
}

const statItems = (stats: GitHubStats) => [
  { label: "REPOS", value: stats.publicRepos },
  { label: "FOLLOWERS", value: stats.followers },
  { label: "FOLLOWING", value: stats.following },
  { label: "STARS", value: stats.totalStars },
];

export default function AboutSection({ profile, skills, stats }: AboutSectionProps) {
  return (
    <section id="about" className="px-1 md:px-2 mb-6">
      <RetroWindow title="ABOUT.exe" delay={0.1}>
        <div className="p-2 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="shrink-0 flex flex-col items-center gap-3 md:w-[300px]">
              <div className="relative">
                <div className="w-32 h-32 md:w-44 md:h-44 border-2 border-border-strong overflow-hidden bg-bg">
                  <Image
                    src="/profilebg.png"
                    alt={profile.name}
                    width={176}
                    height={176}
                    className="object-cover w-full h-full brightness-125 contrast-75 grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-red" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-red" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-red" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-red" />
              </div>
              <span className="tape-label">PHOTO REEL</span>

              <div className="w-full mt-2 grid grid-cols-2 gap-2">
                {statItems(stats).map((item) => (
                  <div key={item.label} className="border border-border bg-bg-alt px-3 py-2">
                    <div className="text-[9px] text-fg-faint tracking-[0.25em] uppercase">{item.label}</div>
                    <div className="typewriter-font text-sm md:text-base text-fg mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.01, delay: 0.2 }}
              >
                <h1 className="typewriter-font text-3xl md:text-4xl text-fg mb-1">{profile.name}</h1>
                <div className="text-lg">
                  <TypewriterText
                    text={`[${profile.tagline || profile.role}]`}
                    className="typewriter-font"
                    delay={0.4}
                    speed={15}
                    showCursor={true}
                  />
                </div>
              </motion.div>

              <div className="paper-insert paper-lines p-3 pl-4 md:p-5 md:pl-14 mb-4 md:mb-6">
                <div className="text-md leading-7 text-fg">
                  <TypewriterText
                    text={profile.bio}
                    className="typewriter-font"
                    delay={0.4}
                    speed={15}
                    showCursor={true}
                  />
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="retro-btn text-xs px-4 py-2 flex items-center gap-2"
                >
                  <span>[CONTACT]</span>
                </button>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn text-xs px-4 py-2 flex items-center gap-2"
                >
                  <span>[RESUME]</span>
                </a>
              </div>

              <div className="mt-4 md:mt-6 space-y-3">
                <div className="border border-dashed border-border px-3 py-2 bg-bg-window/70">
                  <div className="text-[9px] text-fg-faint tracking-[0.25em] uppercase mb-1">LATEST_ACTIVITY</div>
                  <div className="typewriter-font text-xs md:text-sm text-fg-muted">{stats.latestActivity}</div>
                </div>

                {skills.length > 0 && (
                  <div className="border border-border bg-bg-alt px-3 py-3">
                    <div className="text-[9px] text-fg-faint tracking-[0.25em] uppercase mb-2">TOP_STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-[10px] font-mono border border-border px-2 py-1 text-fg-faint bg-bg"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CassetteWidget />
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}
