"use client";

import { useId } from "react";
import type { SceneVariant } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Illustrated placeholder landscapes. They keep the prototype looking finished
 * before real photography is added. Wherever a data item has an `image`
 * field, <Picture> shows the photo instead.
 */
interface SceneProps {
  variant: SceneVariant;
  className?: string;
  title?: string;
}

const W = 400;
const H = 260;

export function Scene({ variant, className, title }: SceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const art = ART[variant] ?? ART.festival;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={art.sky[0]} />
          <stop offset="100%" stopColor={art.sky[1]} />
        </linearGradient>
        <linearGradient id={id("water")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={art.water?.[0] ?? "#4fb3d9"} />
          <stop offset="100%" stopColor={art.water?.[1] ?? "#1d6f9e"} />
        </linearGradient>
        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id("sky")})`} />
      {art.draw(id)}
    </svg>
  );
}

type Draw = (id: (name: string) => string) => React.ReactNode;
interface Art {
  sky: [string, string];
  water?: [string, string];
  draw: Draw;
}

function Palm({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeLinecap="round">
      <path d="M0 0 Q 6 -40 -4 -80" strokeWidth={5} />
      <g strokeWidth={4}>
        <path d="M-4 -80 Q -30 -92 -48 -74" />
        <path d="M-4 -80 Q -26 -70 -38 -50" />
        <path d="M-4 -80 Q 22 -96 42 -82" />
        <path d="M-4 -80 Q 20 -72 34 -54" />
        <path d="M-4 -80 Q -6 -100 8 -108" />
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={0.85}>
      <ellipse cx="0" cy="0" rx="26" ry="9" />
      <ellipse cx="-12" cy="-6" rx="13" ry="10" />
      <ellipse cx="8" cy="-9" rx="15" ry="12" />
    </g>
  );
}

function Pine({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d="M0 -46 L14 -18 L7 -18 L18 0 L-18 0 L-7 -18 L-14 -18 Z" />
      <rect x="-2" y="0" width="4" height="7" />
    </g>
  );
}

/** Mirror the left half of a Balinese split gate (candi bentar) around x=200. */
const GATE_LEFT =
  "195,222 195,78 189,78 189,94 183,94 183,114 175,114 175,136 165,136 165,158 155,158 155,184 144,184 144,222";
const GATE_RIGHT = GATE_LEFT.split(" ")
  .map((p) => {
    const [x, y] = p.split(",").map(Number);
    return `${400 - x},${y}`;
  })
  .join(" ");

const ART: Record<SceneVariant, Art> = {
  temple: {
    sky: ["#ff8d5c", "#ffd9a3"],
    draw: (id) => (
      <>
        <circle cx="200" cy="150" r="70" fill={`url(#${id("glow")})`} />
        <circle cx="200" cy="150" r="38" fill="#fff4dc" opacity="0.9" />
        <path d="M0 190 L110 128 L150 140 L215 96 L300 152 L360 138 L400 150 L400 260 L0 260 Z" fill="#c8706a" opacity="0.5" />
        <path d="M0 214 Q 100 200 200 210 T 400 206 L400 260 L0 260 Z" fill="#6e2f3c" />
        <polygon points={GATE_LEFT} fill="#3a1b29" />
        <polygon points={GATE_RIGHT} fill="#3a1b29" />
        <rect x="181" y="208" width="38" height="16" fill="#2b111d" />
        <Palm x={58} y={240} s={1.1} color="#2b111d" />
        <Palm x={350} y={246} s={0.95} color="#2b111d" />
        <path d="M0 236 Q 120 222 220 234 T 400 230 L400 260 L0 260 Z" fill="#2b111d" />
      </>
    ),
  },
  sea: {
    sky: ["#79cdfc", "#e7f8ff"],
    water: ["#22b8c8", "#0a6688"],
    draw: (id) => (
      <>
        <Cloud x={80} y={50} s={1.1} />
        <Cloud x={300} y={36} s={0.8} />
        <rect y="158" width={W} height={H - 158} fill={`url(#${id("water")})`} />
        <path d="M-10 160 C -6 98, 70 92, 86 160 Z" fill="#2c8a57" />
        <path d="M60 160 C 66 118, 120 112, 132 160 Z" fill="#3aa266" />
        <path d="M150 160 C 160 70, 260 66, 268 160 Z" fill="#257d4e" />
        <path d="M250 160 C 258 120, 300 116, 312 160 Z" fill="#3aa266" />
        <path d="M300 160 C 310 100, 400 96, 410 160 Z" fill="#2c8a57" />
        <g opacity="0.25" fill="#0b3d4f">
          <ellipse cx="38" cy="168" rx="46" ry="6" />
          <ellipse cx="209" cy="170" rx="58" ry="7" />
          <ellipse cx="356" cy="168" rx="52" ry="6" />
        </g>
        <g stroke="#fff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
          <path d="M40 200 h40" />
          <path d="M150 214 h56" />
          <path d="M270 196 h36" />
          <path d="M90 236 h50" />
          <path d="M300 230 h44" />
        </g>
        <path d="M150 250 Q 200 236 250 250 Z" fill="#7ee0d6" opacity="0.5" />
      </>
    ),
  },
  volcano: {
    sky: ["#ffbf9b", "#a9c9ff"],
    draw: (id) => (
      <>
        <circle cx="320" cy="120" r="60" fill={`url(#${id("glow")})`} />
        <circle cx="320" cy="120" r="22" fill="#fff1d6" />
        <path d="M0 176 L70 130 L130 160 L190 120 L260 166 L330 128 L400 160 L400 260 L0 260 Z" fill="#8a7fa6" opacity="0.45" />
        <path d="M70 200 L165 108 L180 116 L198 104 L216 116 L232 108 L330 200 Z" fill="#6f5b70" />
        <path d="M165 108 L180 116 L198 104 L216 116 L232 108 L224 128 L176 128 Z" fill="#544356" />
        <g fill="#fff" opacity="0.7">
          <ellipse cx="200" cy="92" rx="18" ry="9" />
          <ellipse cx="214" cy="74" rx="14" ry="8" />
          <ellipse cx="224" cy="56" rx="11" ry="7" />
        </g>
        <path d="M0 196 Q 100 180 200 196 T 400 190 L400 260 L0 260 Z" fill="#4c9a3f" />
        <path d="M0 214 Q 120 200 220 216 T 400 210 L400 260 L0 260 Z" fill="#6bb34f" />
        <path d="M0 234 Q 100 222 200 236 T 400 230 L400 260 L0 260 Z" fill="#8fcb63" />
        <g stroke="#3d7f33" strokeOpacity="0.5" strokeWidth="1.2" fill="none">
          <path d="M0 204 Q 100 190 200 204 T 400 198" />
          <path d="M0 224 Q 120 210 220 226 T 400 220" />
        </g>
      </>
    ),
  },
  stupa: {
    sky: ["#9fd0ff", "#fdeccf"],
    draw: () => (
      <>
        <Cloud x={70} y={46} />
        <Cloud x={330} y={60} s={0.7} />
        <path d="M0 200 Q 200 186 400 200 L400 260 L0 260 Z" fill="#6fae54" />
        <g fill="#8c7b69">
          <rect x="96" y="196" width="208" height="16" rx="2" />
          <rect x="112" y="181" width="176" height="16" rx="2" />
          <rect x="128" y="166" width="144" height="16" rx="2" />
          <rect x="144" y="152" width="112" height="15" rx="2" />
          <rect x="158" y="140" width="84" height="13" rx="2" />
        </g>
        <g fill="#6f6052">
          <rect x="96" y="208" width="208" height="4" />
          <rect x="112" y="193" width="176" height="4" />
          <rect x="128" y="178" width="144" height="4" />
          <rect x="144" y="163" width="112" height="4" />
        </g>
        <g fill="#9a8a77">
          {[150, 166, 182, 218, 234, 250].map((x) => (
            <path key={`a${x}`} d={`M${x - 5} 152 Q ${x - 5} 143 ${x} 140 Q ${x + 5} 143 ${x + 5} 152 Z`} />
          ))}
          {[136, 152, 168, 184, 216, 232, 248, 264].map((x) => (
            <path key={`b${x}`} d={`M${x - 5} 166 Q ${x - 5} 157 ${x} 154 Q ${x + 5} 157 ${x + 5} 166 Z`} />
          ))}
        </g>
        <path d="M178 141 Q 178 112 200 104 Q 222 112 222 141 Z" fill="#9a8a77" />
        <rect x="197.5" y="84" width="5" height="22" rx="2" fill="#7d6e5e" />
        <g fill="#3f8a3a">
          <circle cx="44" cy="196" r="22" />
          <circle cx="70" cy="204" r="16" />
          <circle cx="352" cy="198" r="24" />
          <circle cx="326" cy="206" r="14" />
        </g>
        <path d="M0 236 Q 200 224 400 236 L400 260 L0 260 Z" fill="#579a42" />
      </>
    ),
  },
  savanna: {
    sky: ["#ffcf8e", "#fff1d6"],
    water: ["#3dbad1", "#1f7fa3"],
    draw: (id) => (
      <>
        <circle cx="90" cy="96" r="54" fill={`url(#${id("glow")})`} />
        <circle cx="90" cy="96" r="20" fill="#fff4df" />
        <path d="M0 168 Q 70 104 150 150 Q 220 98 300 140 Q 350 116 400 132 L400 212 L0 212 Z" fill="#b48a45" />
        <path d="M0 190 Q 90 146 180 180 Q 260 150 330 176 Q 370 166 400 172 L400 214 L0 214 Z" fill="#c9a259" />
        <g fill="#7c6a2b">
          <circle cx="232" cy="150" r="4" />
          <circle cx="246" cy="144" r="3" />
          <circle cx="120" cy="170" r="3.5" />
        </g>
        <rect y="206" width={W} height={H - 206} fill={`url(#${id("water")})`} />
        <path d="M0 206 Q 100 200 200 208 T 400 204 L400 214 Q 300 210 200 216 T 0 212 Z" fill="#f4c2b8" />
        <g stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round">
          <path d="M60 232 h40" />
          <path d="M220 244 h50" />
          <path d="M310 226 h30" />
        </g>
      </>
    ),
  },
  lake: {
    sky: ["#9cd3ff", "#eaf7ff"],
    water: ["#5fb0dc", "#2b6a9e"],
    draw: (id) => (
      <>
        <Cloud x={300} y={50} />
        <path d="M0 178 L60 120 L110 150 L180 96 L250 150 L320 112 L400 166 L400 200 L0 200 Z" fill="#7d9cc4" />
        <path d="M0 186 L80 146 L150 172 L230 132 L310 170 L400 150 L400 200 L0 200 Z" fill="#5b7fab" />
        <rect y="180" width={W} height={H - 180} fill={`url(#${id("water")})`} />
        <path d="M160 190 Q 200 176 240 190 Z" fill="#3d7f4e" />
        <g stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
          <path d="M120 214 h50" />
          <path d="M240 226 h46" />
          <path d="M170 244 h40" />
        </g>
        <Pine x={20} y={236} s={1.3} color="#1f4d33" />
        <Pine x={52} y={244} s={1} color="#245c3c" />
        <Pine x={360} y={240} s={1.2} color="#1f4d33" />
        <Pine x={388} y={248} s={0.9} color="#245c3c" />
      </>
    ),
  },
  pagoda: {
    sky: ["#ffd3de", "#fff5ea"],
    draw: () => (
      <>
        <path d="M30 200 L150 86 L270 200 Z" fill="#8ea3cb" />
        <path d="M128 106 L150 86 L172 106 L162 112 L150 104 L138 112 Z" fill="#fff" />
        <path d="M0 210 Q 200 196 400 210 L400 260 L0 260 Z" fill="#7aa36a" />
        <g transform="translate(300 0)">
          {[0, 1, 2, 3, 4].map((i) => {
            const y = 200 - i * 26;
            const w = 64 - i * 9;
            return (
              <g key={i}>
                <rect x={-w / 2 + 8} y={y - 16} width={w - 16} height={16} fill="#7a1d1d" />
                <path d={`M${-w / 2 - 6} ${y - 14} Q 0 ${y - 26} ${w / 2 + 6} ${y - 14} L ${w / 2 - 4} ${y - 20} L ${-w / 2 + 4} ${y - 20} Z`} fill="#c1121f" />
              </g>
            );
          })}
          <rect x="-1.5" y="64" width="3" height="30" fill="#5a1414" />
        </g>
        <g fill="#f7a8c0">
          <circle cx="40" cy="214" r="26" />
          <circle cx="70" cy="200" r="20" />
          <circle cx="92" cy="222" r="18" />
        </g>
        <g fill="#fbc7d6">
          <circle cx="54" cy="206" r="10" />
          <circle cx="84" cy="214" r="8" />
        </g>
        <path d="M0 238 Q 200 228 400 238 L400 260 L0 260 Z" fill="#628f55" />
      </>
    ),
  },
  palace: {
    sky: ["#ffc98a", "#fff1db"],
    draw: (id) => (
      <>
        <circle cx="200" cy="96" r="70" fill={`url(#${id("glow")})`} />
        <rect x="70" y="196" width="260" height="20" fill="#c8b39a" />
        <rect x="86" y="186" width="228" height="12" fill="#d8c5ad" />
        <rect x="112" y="146" width="176" height="42" fill="#b0281f" />
        <g fill="#7f1a14">
          {[124, 148, 172, 196, 220, 244, 268].map((x) => (
            <rect key={x} x={x} y="150" width="6" height="36" />
          ))}
        </g>
        <path d="M86 150 Q 200 128 314 150 L 330 138 Q 318 152 300 154 L100 154 Q 82 152 70 138 Z" fill="#e0a100" />
        <rect x="140" y="112" width="120" height="24" fill="#b0281f" />
        <path d="M118 116 Q 200 96 282 116 L 296 104 Q 286 118 270 120 L130 120 Q 114 118 104 104 Z" fill="#e0a100" />
        <g fill="#2f7d4a">
          <circle cx="40" cy="200" r="22" />
          <circle cx="362" cy="200" r="22" />
        </g>
        <path d="M0 214 Q 200 206 400 214 L400 260 L0 260 Z" fill="#9c8467" />
        <path d="M0 236 Q 200 228 400 236 L400 260 L0 260 Z" fill="#7d6950" />
      </>
    ),
  },
  city: {
    sky: ["#b6d3ff", "#f2f7ff"],
    draw: () => (
      <>
        <Cloud x={90} y={56} />
        <g fill="#91a7cf">
          <rect x="10" y="130" width="40" height="100" />
          <rect x="54" y="110" width="34" height="120" />
          <rect x="250" y="120" width="36" height="110" />
          <rect x="350" y="136" width="44" height="94" />
        </g>
        <path d="M196 230 L214 110 L218 60 L222 110 L240 230 Z" fill="#6c7fa8" />
        <rect x="203" y="160" width="30" height="3" fill="#6c7fa8" />
        <g fill="#4d648f">
          <rect x="88" y="150" width="46" height="80" />
          <rect x="138" y="130" width="40" height="100" />
          <rect x="286" y="146" width="40" height="84" />
          <rect x="324" y="168" width="34" height="62" />
        </g>
        <g fill="#ffe7a8" opacity="0.85">
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={95 + c * 13} y={160 + r * 16} width="6" height="8" />),
          )}
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1].map((c) => <rect key={`b${r}-${c}`} x={146 + c * 16} y={142 + r * 16} width="7" height="8" />),
          )}
        </g>
        <rect y="228" width={W} height={H - 228} fill="#3a4d73" />
        <g stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2">
          <path d="M20 244 h40" />
          <path d="M160 246 h60" />
          <path d="M300 242 h40" />
        </g>
      </>
    ),
  },
  stage: {
    sky: ["#1f1150", "#6b2fbf"],
    draw: () => (
      <>
        <g fill="#fff" opacity="0.12">
          <polygon points="80,0 120,0 220,220 140,220" />
          <polygon points="280,0 320,0 260,220 180,220" />
          <polygon points="196,0 214,0 250,220 160,220" />
        </g>
        <g>
          {[60, 110, 160, 240, 290, 340].map((x, i) => (
            <circle key={x} cx={x} cy={22} r={6} fill={["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#ffd166", "#ef476f"][i]} />
          ))}
          <rect x="40" y="12" width="320" height="4" fill="#2c1c63" />
        </g>
        <ellipse cx="200" cy="214" rx="190" ry="26" fill="#140a36" />
        <ellipse cx="200" cy="208" rx="160" ry="16" fill="#2b1866" />
        <g fill="#f5c84c">
          <circle cx="170" cy="150" r="9" />
          <path d="M160 206 L164 164 Q 170 158 176 164 L182 206 Z" />
          <path d="M162 172 L140 150" stroke="#f5c84c" strokeWidth="5" strokeLinecap="round" />
          <path d="M178 172 L196 158" stroke="#f5c84c" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g fill="#ff7aa8">
          <circle cx="232" cy="146" r="9" />
          <path d="M222 206 L226 160 Q 232 154 238 160 L244 206 Z" />
          <path d="M226 168 L210 146" stroke="#ff7aa8" strokeWidth="5" strokeLinecap="round" />
          <path d="M240 168 L262 156" stroke="#ff7aa8" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g fill="#0d0626">
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={14 + i * 29} cy={254 - (i % 2) * 5} r={13} />
          ))}
        </g>
      </>
    ),
  },
  festival: {
    sky: ["#4d7cff", "#9b7bff"],
    draw: () => {
      const colors = ["#ffd166", "#ef476f", "#06d6a0", "#ffffff", "#118ab2", "#ff9f1c"];
      return (
        <>
          <g opacity="0.22" fill="#fff">
            <circle cx="60" cy="40" r="30" />
            <circle cx="350" cy="70" r="40" />
          </g>
          <path d="M0 40 Q 200 90 400 40" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
          {Array.from({ length: 13 }, (_, i) => {
            const x = 14 + i * 30;
            const t = x / 400;
            const y = 40 + 4 * 50 * t * (1 - t);
            return <polygon key={i} points={`${x - 9},${y} ${x + 9},${y} ${x},${y + 16}`} fill={colors[i % colors.length]} />;
          })}
          <path d="M110 200 L110 120 Q 200 70 290 120 L290 200 Z" fill="#2a1b6e" />
          <path d="M126 200 L126 126 Q 200 88 274 126 L274 200 Z" fill="#3c2a96" />
          <rect x="140" y="118" width="120" height="26" rx="5" fill="#ffd166" />
          <text x="200" y="136" textAnchor="middle" fontSize="12" fontWeight="800" fill="#2a1b6e" fontFamily="sans-serif">
            CULTURE CONNECTS US
          </text>
          {[40, 80, 320, 360].map((x, i) => (
            <g key={x}>
              <rect x={x} y="110" width="2" height="100" fill="#ffffff" opacity="0.6" />
              <rect x={x + 2} y="110" width="22" height="14" fill={colors[(i * 2) % colors.length]} />
            </g>
          ))}
          <g fill="#1a1050">
            {Array.from({ length: 16 }, (_, i) => (
              <g key={i}>
                <circle cx={10 + i * 26} cy={226 - (i % 3) * 4} r={9} />
                <rect x={i * 26} y={232 - (i % 3) * 4} width="20" height="40" rx="8" />
              </g>
            ))}
          </g>
          <g stroke="#1a1050" strokeWidth="5" strokeLinecap="round">
            <path d="M88 220 L80 196" />
            <path d="M246 214 L256 190" />
            <path d="M326 220 L334 198" />
          </g>
        </>
      );
    },
  },
};
