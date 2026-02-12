"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { blogData } from "@/data/mockData";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import CRTOverlay from "@/components/CRTOverlay";
import { motion } from "framer-motion";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = blogData.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-bg text-fg font-sans selection:bg-red selection:text-white pb-12">
            <CRTOverlay />

            <div className="max-w-3xl mx-auto pt-24 px-4">
                <Link href="/#blog" className="inline-flex items-center gap-2 text-xs font-mono text-fg-muted hover:text-red mb-8 transition-colors">
                    <IconArrowLeft size={14} />
                    <span>BACK_TO_LOGS</span>
                </Link>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-border bg-bg-window p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Header info */}
                    <div className="flex justify-between items-start border-b border-dashed border-border-light pb-6 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold typewriter-font mb-2 text-red">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-[10px] font-mono text-fg-faint">
                                <span>DATE: {post.date}</span>
                                <span>ID: <span className="text-fg-muted">{String(post.id).padStart(4, '0')}</span></span>
                            </div>
                        </div>
                        <div className="hidden md:block w-16 h-16 border border-border flex items-center justify-center bg-bg-alt">
                            <span className="text-[10px] -rotate-45 text-fg-faint">FILE</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none font-mono text-fg-muted leading-relaxed whitespace-pre-line">
                        {post.content}
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-border flex justify-between items-center text-[10px] font-mono text-fg-faint">
                        <span>END_OF_FILE</span>
                        <span>{slug.toUpperCase()}.TXT</span>
                    </div>
                </motion.article>
            </div>
        </div>
    );
}
