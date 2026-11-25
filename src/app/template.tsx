"use client";

import { motion } from "motion/react";

const silk = [0.22, 1, 0.36, 1] as const;

/** Soft cinematic transition between pages: a champagne veil lifts as the page rises in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] bg-champagne"
        initial={{ clipPath: "inset(0 0 0% 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 1.1, ease: silk, delay: 0.05 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: silk, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
