import type { Locale } from "@/types";

export const defaultLocale: Locale = "en";

/** Every locale the site is designed for, in switcher order. */
export const allLocales: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "ru", label: "RU", native: "Русский" },
];

/**
 * Locales visitors can actually pick. Add "ru" here once
 * dictionaries/ru.ts and the Russian content are filled in.
 */
export const enabledLocales: Locale[] = ["en"];

export const LOCALE_STORAGE_KEY = "nsu-festival:locale";
