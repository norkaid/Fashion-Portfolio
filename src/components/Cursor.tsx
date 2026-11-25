"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft, two-part cursor for fine pointers.
 * Any element with data-cursor="View" (or other text) grows the cursor into a labelled lens.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hoverLink, setHoverLink] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 38, mass: 0.6 });
  const rx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.9 });
  const ry = useSpring(y, { stiffness: 120, damping: 22, mass: 0.9 });
  const last = useRef<Element | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as Element | null;
      if (t === last.current) return;
      last.current = t;
      const labelled = t?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(labelled?.dataset.cursor ?? null);
      setHoverLink(!!t?.closest?.("a, button, [role='button']"));
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = label ? 104 : hoverLink ? 54 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-hibiscus"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden || label ? 0 : 1 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-espresso/40"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          backgroundColor: label ? "rgba(255,247,238,0.82)" : "rgba(247,242,234,0)",
          borderColor: label ? "rgba(233,162,59,0.9)" : "rgba(194,65,107,0.5)",
          backdropFilter: label ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <motion.span
          className="font-serif text-[15px] italic text-plum"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
