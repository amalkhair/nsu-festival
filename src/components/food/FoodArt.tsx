"use client";

import { useId } from "react";
import type { FoodCategory } from "@/types";
import { cn } from "@/lib/utils";

/** Illustrated dish used until real food photography is added. */
export function FoodArt({
  palette,
  category,
  className,
  title,
}: {
  palette: [string, string, string];
  category: FoodCategory;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [dark, mid, light] = palette;

  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={`${uid}-bg`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#fffaf2" />
          <stop offset="100%" stopColor={light} />
        </radialGradient>
        <radialGradient id={`${uid}-food`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={mid} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${uid}-bg)`} />
      <rect y="190" width="400" height="70" fill="#8b5a3c" opacity="0.9" />
      <g stroke="#6e432b" strokeOpacity="0.5" strokeWidth="2">
        <path d="M0 210 H400" />
        <path d="M0 236 H400" />
      </g>
      <g fill="#3f8a3a" opacity="0.9">
        <path d="M40 120 Q 70 90 100 118 Q 70 130 40 120 Z" />
        <path d="M330 80 Q 360 60 380 88 Q 352 96 330 80 Z" />
      </g>

      {category === "drink" ? (
        <g>
          <ellipse cx="200" cy="222" rx="70" ry="10" fill="#000" opacity="0.15" />
          <path d="M152 70 L248 70 L236 218 Q 200 228 164 218 Z" fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeWidth="3" />
          <path d="M158 110 L242 110 L234 214 Q 200 222 166 214 Z" fill={`url(#${uid}-glass)`} />
          <g fill={dark} opacity="0.85">
            <circle cx="186" cy="190" r="6" />
            <circle cx="208" cy="198" r="6" />
            <circle cx="222" cy="182" r="5" />
            <circle cx="196" cy="174" r="5" />
          </g>
          <rect x="216" y="36" width="8" height="120" rx="4" fill="#ef476f" transform="rotate(14 220 96)" />
          <g fill="#fff" opacity="0.8">
            <rect x="176" y="118" width="18" height="16" rx="3" />
            <rect x="204" y="126" width="16" height="14" rx="3" />
          </g>
        </g>
      ) : (
        <g>
          <ellipse cx="200" cy="200" rx="138" ry="34" fill="#000" opacity="0.12" />
          <ellipse cx="200" cy="186" rx="132" ry="44" fill="#ffffff" />
          <ellipse cx="200" cy="184" rx="108" ry="32" fill="#f3efe8" />
          {category === "main" && (
            <>
              <ellipse cx="166" cy="176" rx="46" ry="22" fill="#fbf8f1" />
              <g fill={`url(#${uid}-food)`}>
                <ellipse cx="226" cy="172" rx="34" ry="18" />
                <ellipse cx="200" cy="164" rx="28" ry="15" />
                <ellipse cx="248" cy="160" rx="22" ry="12" />
              </g>
            </>
          )}
          {category === "snack" &&
            [150, 186, 222, 258].map((x, i) => (
              <rect key={x} x={x - 16} y={150 + (i % 2) * 8} width="34" height="22" rx="8" fill={`url(#${uid}-food)`} transform={`rotate(${i * 7 - 10} ${x} 160)`} />
            ))}
          {category === "dessert" &&
            [160, 190, 220, 250, 175, 235].map((x, i) => (
              <circle key={i} cx={x} cy={i < 4 ? 176 : 156} r="16" fill={`url(#${uid}-food)`} />
            ))}
          <g fill="#3f8a3a">
            <path d="M260 150 q 12 -10 22 0 q -12 8 -22 0 Z" />
            <path d="M150 158 q 10 -9 20 0 q -10 7 -20 0 Z" />
          </g>
          <g fill="#e63946">
            <circle cx="276" cy="172" r="3.5" />
            <circle cx="140" cy="182" r="3" />
          </g>
          <g stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M180 120 q -8 -14 0 -26 q 8 -12 0 -24" />
            <path d="M206 116 q -8 -14 0 -26 q 8 -12 0 -24" />
            <path d="M232 120 q -8 -14 0 -26 q 8 -12 0 -24" />
          </g>
        </g>
      )}
    </svg>
  );
}
