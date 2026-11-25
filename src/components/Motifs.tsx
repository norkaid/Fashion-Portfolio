/**
 * Subtle Afro-contemporary motifs, drawn as fine linework rather than literal patterns:
 *  - DotOrbit: concentric dotted rings (echoing dotted textile and the dotted waves in the portfolio)
 *  - Weave: a strip-woven lattice, in the spirit of hand-loomed cloth
 *  - Dashes: resist-dye style hand marks
 *  - ArchLine: an architectural arch outline
 */

export function DotOrbit({ className = "", rings = 5, color = "#B8955A" }: { className?: string; rings?: number; color?: string }) {
  const els: React.ReactNode[] = [];
  for (let r = 1; r <= rings; r++) {
    const radius = r * 18;
    const count = Math.round(radius * 0.7);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + r * 0.3;
      els.push(
        <circle
          key={`${r}-${i}`}
          cx={100 + radius * Math.cos(a)}
          cy={100 + radius * Math.sin(a)}
          r={r % 2 ? 0.9 : 0.6}
          fill={color}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {els}
      <circle cx="100" cy="100" r="3" fill="none" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

export function Weave({ className = "", color = "#5E4535" }: { className?: string; color?: string }) {
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * 12;
      const y = row * 12;
      const horiz = (row + col) % 2 === 0;
      cells.push(
        horiz ? (
          <g key={`${row}-${col}`}>
            <line x1={x + 1} y1={y + 4} x2={x + 11} y2={y + 4} stroke={color} strokeWidth="0.45" />
            <line x1={x + 1} y1={y + 8} x2={x + 11} y2={y + 8} stroke={color} strokeWidth="0.45" />
          </g>
        ) : (
          <g key={`${row}-${col}`}>
            <line x1={x + 4} y1={y + 1} x2={x + 4} y2={y + 11} stroke={color} strokeWidth="0.45" />
            <line x1={x + 8} y1={y + 1} x2={x + 8} y2={y + 11} stroke={color} strokeWidth="0.45" />
          </g>
        ),
      );
    }
  }
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      {cells}
    </svg>
  );
}

export function Dashes({ className = "", color = "#8C6E58" }: { className?: string; color?: string }) {
  const marks: React.ReactNode[] = [];
  for (let i = 0; i < 26; i++) {
    const x = (i * 37) % 300;
    const y = ((i * 53) % 90) + 5;
    const rot = ((i * 29) % 40) - 20;
    marks.push(
      <line
        key={i}
        x1={x}
        y1={y}
        x2={x + 10}
        y2={y}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        transform={`rotate(${rot} ${x + 5} ${y})`}
      />,
    );
  }
  return (
    <svg viewBox="0 0 310 100" className={className} aria-hidden>
      {marks}
    </svg>
  );
}

export function ArchLine({ className = "", color = "#B8955A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 160" className={className} aria-hidden fill="none">
      <path d="M2 160V50a48 48 0 0 1 96 0v110" stroke={color} strokeWidth="0.5" />
      <path d="M10 160V52a40 40 0 0 1 80 0v108" stroke={color} strokeWidth="0.3" strokeDasharray="1.5 3" />
    </svg>
  );
}
