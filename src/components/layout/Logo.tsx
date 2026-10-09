import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="NSU International Cultural Festival, home">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1d5bff" />
            <stop offset="100%" stopColor="#7b5cff" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#logo-g)" />
        <g fill="none" stroke="#fff" strokeWidth="1.6" opacity="0.95">
          <circle cx="20" cy="20" r="11" />
          <ellipse cx="20" cy="20" rx="5" ry="11" />
          <path d="M9 20 H31" />
          <path d="M11 14 H29 M11 26 H29" opacity="0.7" />
        </g>
        <circle cx="30" cy="10" r="3.5" fill="#ffd166" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold tracking-tight text-ink">NSU</span>
        <span className="mt-0.5 text-[10px] font-semibold text-ink-soft sm:text-[11px]">International Cultural Festival</span>
      </span>
    </Link>
  );
}
