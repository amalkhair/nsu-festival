"use client";

import { useEffect, useState } from "react";

const COLORS = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#7b5cff", "#ff9f1c"];

interface Piece {
  left: number;
  delay: number;
  drift: number;
  spin: number;
  color: string;
  w: number;
  h: number;
  round: boolean;
}

/** Lightweight CSS confetti burst. Generated after mount to keep SSR deterministic. */
export function Confetti({ count = 60 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 160,
        spin: 360 + Math.random() * 720,
        color: COLORS[i % COLORS.length],
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        round: Math.random() > 0.7,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="animate-confetti absolute top-0 block"
          style={
            {
              left: `${p.left}%`,
              width: p.round ? p.w : p.w * 0.6,
              height: p.round ? p.w : p.h,
              background: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
