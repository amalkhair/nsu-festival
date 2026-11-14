import type { Locale } from "@/types";
import { en, type TranslationKey } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";

/**
 * Plain translate function, usable on the server (page metadata) and in the browser.
 * A key missing in a locale falls back to English.
 */
const dictionaries: Record<Locale, Partial<Record<TranslationKey, string>>> = { en, ru };

export type Vars = Record<string, string | number>;

export function translate(locale: Locale, key: TranslationKey, vars?: Vars): string {
  const template = dictionaries[locale][key] ?? en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => (name in vars ? String(vars[name]) : `{${name}}`));
}
