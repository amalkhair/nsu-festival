import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import type { CountryTheme } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** CSS variables for a country's colour theme. Use with `var(--c-primary)` etc. */
export function themeStyle(theme: CountryTheme): CSSProperties {
  return {
    "--c-primary": theme.primary,
    "--c-primary-dark": theme.primaryDark,
    "--c-accent": theme.accent,
    "--c-soft": theme.soft,
  } as CSSProperties;
}

export function flagUrl(code: string, width: 40 | 80 | 160 | 320 = 80) {
  return `https://flagcdn.com/w${width}/${code}.png`;
}
