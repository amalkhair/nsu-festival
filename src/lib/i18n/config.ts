import type { Locale } from "@/types";

export const defaultLocale: Locale = "en";

/** Every locale the site is designed for, in switcher order. */
export const allLocales: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "ru", label: "RU", native: "Русский" },
];

/** Locales visitors can pick. Remove one here to hide it from the switcher. */
export const enabledLocales: Locale[] = ["en", "ru"];

/** Cookie that remembers the visitor's language (read by the server). */
export const LOCALE_COOKIE = "nsu-locale";
