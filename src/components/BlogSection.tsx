"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import RetroWindow from "./RetroWindow";
import TypewriterText from "./TypewriterText";
import { BlogPost } from "@/types/content";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="px-1 md:px-2 mb-6">
      <RetroWindow title="BLOG.txt" delay={0.3}>
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-dashed border-border-light pb-3 md:pb-4">
            <span className="tape-label">THOUGHTS_AND_LOGS</span>
            <span className="text-[10px] text-fg-faint font-mono">{posts.length} ENTRIES</span>
          </div>

          <div className="space-y-6 md:space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
                onClick={() => {
                  sessionStorage.setItem("home:preserve-scroll", "1");
                  sessionStorage.setItem("home:scroll-pos", String(window.scrollY));
                }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                  <h3 className="text-lg font-bold text-fg typewriter-font group-hover:text-red transition-colors">
                    <span className="text-fg-faint mr-2 text-xs">{String(post.id).padStart(2, "0")}.</span>
                    {post.title}
                  </h3>
                  <span className="text-[10px] font-mono text-fg-faint shrink-0">{post.date}</span>
                </div>
                <TypewriterText text={post.excerpt} className="typewriter-font" speed={15} delay={0.1} showCursor={true} />
                <div className="pl-6">
                  <span className="text-[10px] text-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-flex items-center gap-1">
                    READ_ENTRY <IconArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}
