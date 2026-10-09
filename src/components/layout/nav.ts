import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

export const navItems: { href: string; key: TranslationKey; match: (path: string) => boolean }[] = [
  { href: "/", key: "nav.home", match: (p) => p === "/" },
  { href: "/map", key: "nav.map", match: (p) => p.startsWith("/map") },
  { href: "/schedule", key: "nav.schedule", match: (p) => p.startsWith("/schedule") },
  { href: "/countries", key: "nav.countries", match: (p) => p.startsWith("/countries") || p.startsWith("/country") },
];
