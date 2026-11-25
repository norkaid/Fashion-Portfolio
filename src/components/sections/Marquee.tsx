"use client";

import { motion } from "motion/react";
import { KenteBand } from "@/components/Aurora";

const words = ["Ethereal", "Editorial", "Contemporary", "Afro-inspired", "Artistic", "Luxurious", "Timeless"];
const accents = ["text-saffron", "text-rose", "text-[#8FD3C9]", "text-coral"];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden bg-plum" aria-label={words.join(", ")}>
      <KenteBand className="h-2.5" />
      <div className="relative py-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(194,65,107,0.35),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(233,162,59,0.25),transparent_55%)]" />
        <motion.div
          className="relative flex w-max gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              <span
                className={`font-serif text-3xl font-light md:text-5xl ${
                  i % 2 ? `italic ${accents[(i >> 1) % accents.length]}` : "text-ivory"
                }`}
              >
                {w}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </span>
          ))}
        </motion.div>
      </div>
      <KenteBand className="h-2.5" />
    </div>
  );
}
