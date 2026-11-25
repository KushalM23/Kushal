"use client";

import React from "react";
import RetroWindow from "./RetroWindow";
import { blogData, type BlogPost } from "@/data/content";
import { IconArrowRight } from "@tabler/icons-react";
import TypewriterText  from "@/components/TypewriterText"
import Link from "next/link";

export default function BlogSection() {

    return (
        <section id="blog" className="px-1 md:px-2 mb-6">
            <RetroWindow title="BLOG.txt" delay={0.3}>
                <div className="p-4 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-dashed border-border-light pb-3 md:pb-4">
                        <span className="tape-label">THOUGHTS_AND_LOGS</span>
                        <span className="text-[10px] text-fg-faint font-mono">{blogData.length} ENTRIES</span>
                    </div>

                    {/* Blog List */}
                    <div className="space-y-6 md:space-y-8">
                        {blogData.length > 0 ? blogData.map((post: BlogPost, i: number) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block" onClick={() => { sessionStorage.setItem("home:preserve-scroll", "1"); sessionStorage.setItem("home:scroll-pos", String(window.scrollY)); }}>
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                                    <h3 className="text-lg font-bold text-fg typewriter-font group-hover:text-red transition-colors">
                                        <span className="text-fg-faint mr-2 text-xs">0{post.id}.</span>
                                        {post.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-fg-faint shrink-0">
                                        {post.date}
                                    </span>
                                </div>
                                <TypewriterText text={post.excerpt} className="typewriter-font" speed={15} delay={0.1} showCursor={true} />
                                <div className="pl-6">
                                    <span className="text-[10px] text-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-flex items-center gap-1">
                                        READ_ENTRY <IconArrowRight size={10} />
                                    </span>
                                </div>
                            </Link>
                        )) : (
                            <div className="font-typewrite-font text-xs text-fg-faint border border-dashed border-border p-4">
                                <TypewriterText text="No thoughts logged yet" className="typewriter-font" speed={5} delay={0.1} showCursor={true} />
                            </div>
                        )}
                    </div>
                </div>
            </RetroWindow>
        </section>
    );
}
