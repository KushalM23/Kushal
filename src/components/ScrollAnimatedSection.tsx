"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

/* Context so children can know when their parent section scrolled into view */
const InViewContext = React.createContext(false);
export function useScrollInView() {
  return React.useContext(InViewContext);
}

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "slide" | "flicker";
  delay?: number;
}

const variants = {
  fade: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  flicker: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function ScrollAnimatedSection({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
}: ScrollAnimatedSectionProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <InViewContext.Provider value={isInView}>
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants[animationType]}
        transition={
          animationType !== "flicker"
            ? { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }
            : { delay }
        }
      >
        {children}
      </motion.div>
    </InViewContext.Provider>
  );
}
