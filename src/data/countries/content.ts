import type { CountryContent, Locale } from "@/types";
import { indonesia } from "./indonesia";

/**
 * Full content per country. Add a new country by creating a folder in src/data/countries/ like
 * `indonesia/` with the same files, then registering it here.
 *
 * Content is English-only for now. When Russian arrives, store it as
 * e.g. `indonesia/ru.ts` and pick it here based on `locale`.
 * Later this whole module is replaced by Supabase queries (see src/lib/api).
 */
const content: Record<string, Partial<Record<Locale, CountryContent>>> = {
  indonesia: { en: indonesia },
};

export function getCountryContent(slug: string, locale: Locale = "en"): CountryContent | undefined {
  const entry = content[slug];
  return entry?.[locale] ?? entry?.en;
}

export const countriesWithContent = Object.keys(content);
