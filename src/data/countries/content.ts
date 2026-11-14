import type { CountryContent, Locale } from "@/types";
import { indonesia } from "./indonesia";
import { indonesiaRu } from "./indonesia/ru";

/**
 * Full content per country. Add a new country by creating a folder in src/data/countries/ like
 * `indonesia/` with the same files, then registering it here.
 *
 * Each country has an English version and optionally a Russian one (e.g.
 * `indonesia/ru.ts`). A missing language falls back to English.
 * Later this whole module is replaced by Supabase queries (see src/lib/api).
 */
const content: Record<string, Partial<Record<Locale, CountryContent>>> = {
  indonesia: { en: indonesia, ru: indonesiaRu },
};

export function getCountryContent(slug: string, locale: Locale = "en"): CountryContent | undefined {
  const entry = content[slug];
  return entry?.[locale] ?? entry?.en;
}

export const countriesWithContent = Object.keys(content);
