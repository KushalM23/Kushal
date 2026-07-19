"use client";

import { motion } from "framer-motion";
import LockedHeader from "@/components/LockedHeader";
import PreserveScrollBackButton from "@/components/PreserveScrollBackButton";
import { BlogPost } from "@/types/content";

interface BlogPostPageProps {
  post: BlogPost;
  profileName: string;
}

export default function BlogPostPage({ post, profileName }: BlogPostPageProps) {
  return (
    <>
      <LockedHeader name={profileName} />

      <div className="min-h-screen bg-bg text-fg font-mono selection:bg-red selection:text-white pb-12">
        <div className="max-w-5xl mx-auto pt-20 md:pt-24 px-3 md:px-4">
          <PreserveScrollBackButton
            label="BACK_TO_LOGS"
            className="inline-flex items-center gap-2 text-xs font-mono text-fg-muted hover:text-red mb-8 transition-colors group"
          />

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-bg-window p-5 md:p-12 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-dashed border-border-light pb-4 md:pb-6 mb-6 md:mb-8 gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold typewriter-font mb-2 text-red">{post.title}</h1>
                <div className="flex items-center gap-4 text-[10px] font-mono text-fg-faint">
                  <span>DATE: {post.date}</span>
                  <span>
                    ID: <span className="text-fg-muted">{String(post.id).padStart(4, "0")}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm md:prose-base max-w-none font-mono text-fg-muted leading-relaxed whitespace-pre-line">
              {post.content}
            </div>

            <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-border flex justify-between items-center text-[10px] font-mono text-fg-faint">
              <span>END_OF_FILE</span>
              <span>{post.slug.toUpperCase()}.TXT</span>
            </div>
          </motion.article>
        </div>
      </div>
    </>
  );
}
