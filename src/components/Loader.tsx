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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: silk }}
          role="status"
          aria-label="Loading"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(228,211,188,0.7),transparent_65%)]" />
          <svg viewBox="0 0 120 120" className="relative h-20 w-20" aria-hidden>
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#B8955A"
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
                r="0.9"
                fill="#8C6E58"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              />
            ))}
          </svg>
          <div className="relative mt-8 overflow-hidden">
            <motion.p
              className="font-serif text-2xl font-light tracking-[0.3em] text-espresso"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.35, ease: silk }}
            >
              D · N · O
            </motion.p>
          </div>
          <motion.p
            className="eyebrow relative mt-4 text-clay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Atelier Norkai
          </motion.p>
          <motion.div
            className="relative mt-10 h-px w-40 origin-left bg-gold/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.9, ease: silk }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
