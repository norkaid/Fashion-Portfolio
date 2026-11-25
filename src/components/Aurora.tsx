/**
 * Slow-drifting, blurred blooms of colour: the "ethereal light" behind sections.
 * Pure CSS animation (cheap), paused for reduced-motion users via globals.css.
 */
const spots = [
  { top: "-10%", left: "-8%", size: "55vw" },
  { top: "20%", left: "55%", size: "50vw" },
  { top: "55%", left: "10%", size: "45vw" },
  { top: "60%", left: "70%", size: "40vw" },
  { top: "-15%", left: "35%", size: "38vw" },
];

export default function Aurora({
  colors,
  className = "",
  opacity = 0.55,
}: {
  colors: string[];
  className?: string;
  opacity?: number;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {colors.slice(0, spots.length).map((c, i) => (
        <span
          key={i}
          className="aurora-blob"
          style={{
            top: spots[i].top,
            left: spots[i].left,
            width: spots[i].size,
            height: spots[i].size,
            background: c,
            opacity,
            animationDuration: `${20 + i * 6}s`,
            animationDelay: `${-i * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Kente-inspired woven colour band. */
export function KenteBand({ className = "h-2" }: { className?: string }) {
  return <div aria-hidden className={`kente w-full ${className}`} />;
}
