"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const silk = [0.22, 1, 0.36, 1] as const;

/** Elegant first-visit loader: the monogram draws in, then a curtain lifts. */
export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("dno-loaded") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("dno-loaded", "1");
      } catch {}
    }, seen || reduce ? 350 : 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.loaded = show ? "false" : "true";
    window.dispatchEvent(new Event(show ? "dno:loading" : "dno:loaded"));
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[linear-gradient(160deg,#FFF6EC_0%,#FCE3D3_50%,#F3D6E6_100%)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: silk }}
          role="status"
          aria-label="Loading"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(242,193,78,0.35),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(194,65,107,0.25),transparent_55%)]" />
          <svg viewBox="0 0 120 120" className="relative h-20 w-20" aria-hidden>
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#C2416B"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: silk }}
            />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <motion.circle
                key={i}
                cx={60 + 44 * Math.cos((i / 12) * Math.PI * 2)}
                cy={60 + 44 * Math.sin((i / 12) * Math.PI * 2)}
                r="1.4"
                fill={["#C2416B", "#E9A23B", "#2F9C9A", "#7A5BA6"][i % 4]}
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              />
            ))}
          </svg>
          <div className="relative mt-8 overflow-hidden">
            <motion.p
              className="iridescent font-serif text-2xl font-light tracking-[0.3em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.35, ease: silk }}
            >
              D · N · O
            </motion.p>
          </div>
          <motion.p
            className="eyebrow relative mt-4 text-plum/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Atelier Norkai
          </motion.p>
          <motion.div
            className="kente relative mt-10 h-1.5 w-40 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.9, ease: silk }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
