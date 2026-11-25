"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const silk = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: React.ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, delay, ease: silk }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line mask reveal for editorial headings. */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, delay: delay + i * 0.12, ease: silk }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image reveal: a curtain of page colour slides away.
 *  The unclipped outer wrapper is what gets observed, so the reveal always triggers. */
export function Curtain({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: hidden },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.6, delay, ease: silk } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
