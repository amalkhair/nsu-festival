import type { Dictionary } from "./en";

/**
 * Russian UI strings.
 *
 * Fill this in key by key. Any key left out falls back to English,
 * so the site never shows a blank label while translation is in progress.
 * When it's ready, add "ru" to `enabledLocales` in ../config.ts.
 */
export const ru: Partial<Dictionary> = {
  "nav.home": "Главная",
  "nav.map": "Карта",
  "nav.schedule": "Расписание",
  "nav.countries": "Страны",
};
