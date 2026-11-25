"use client";

import { motion } from "motion/react";

const words = ["Ethereal", "Editorial", "Contemporary", "Afro-inspired", "Artistic", "Luxurious", "Timeless"];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-taupe/25 bg-ivory py-6" aria-label={words.join(", ")}>
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className={`font-serif text-3xl font-light text-espresso md:text-5xl ${i % 2 ? "italic text-earth" : ""}`}>
              {w}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
