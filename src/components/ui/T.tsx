"use client";

import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

/** Translated text for use inside server components. */
export function T({ k, vars }: { k: TranslationKey; vars?: Record<string, string | number> }) {
  const t = useT();
  return <>{t(k, vars)}</>;
}
