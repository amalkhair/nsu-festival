/**
 * Data access layer.
 *
 * Pages and components get their data ONLY through these functions, never by
 * importing from src/data directly. Today they read static TypeScript files;
 * later each function body is replaced with a Supabase query and the UI
 * doesn't need to change. They're async on purpose for that reason.
 *
 * Every function returns text in the visitor's language (read from the cookie
 * by getLocale). Pass a locale explicitly to override it.
 */
import type { Country, CountryContent, Food, Locale, MapFacility, ScheduleItem } from "@/types";
import { countries, getCountry as findCountry } from "@/data/countries/list";
import { countriesWithContent, getCountryContent as findContent } from "@/data/countries/content";
import { schedule } from "@/data/schedule";
import { festival, festivalDays, stages } from "@/data/festival";
import { booths, facilities } from "@/data/map";
import { countriesRu, tagsRu } from "@/data/ru/countries";
import { daysRu, facilitiesRu, festivalRu, scheduleRu, stagesRu } from "@/data/ru/festival";
import { getLocale } from "@/lib/i18n/server";

async function resolve(locale?: Locale): Promise<Locale> {
  return locale ?? (await getLocale());
}

// ── Translation helpers: English data in, localized copy out ──

function localizeCountry(c: Country, locale: Locale): Country {
  if (locale !== "ru") return c;
  const ru = countriesRu[c.slug];
  return {
    ...c,
    ...(ru ?? {}),
    tags: c.tags.map((tag) => tagsRu[tag] ?? tag),
  };
}

function localizeScheduleItem(item: ScheduleItem, locale: Locale): ScheduleItem {
  if (locale !== "ru") return item;
  return { ...item, title: scheduleRu[item.id] ?? item.title };
}

function localizeFacility(f: MapFacility, locale: Locale): MapFacility {
  if (locale !== "ru") return f;
  return { ...f, label: facilitiesRu[f.id] ?? f.label };
}

// ── Public API ──

export async function getFestival(locale?: Locale) {
  const loc = await resolve(locale);
  if (loc !== "ru") return { ...festival, days: festivalDays, stages };
  return {
    ...festival,
    ...festivalRu,
    days: festivalDays.map((d) => ({ ...d, ...(daysRu[d.date] ?? {}) })),
    stages: stages.map((s) => ({ ...s, name: stagesRu[s.id] ?? s.name })),
  };
}

export async function getCountries(locale?: Locale): Promise<Country[]> {
  const loc = await resolve(locale);
  return countries.map((c) => localizeCountry(c, loc));
}

export async function getFeaturedCountries(locale?: Locale): Promise<Country[]> {
  return (await getCountries(locale)).filter((c) => c.featured);
}

export async function getCountry(slug: string, locale?: Locale): Promise<Country | undefined> {
  const country = findCountry(slug);
  return country && localizeCountry(country, await resolve(locale));
}

export async function getCountryContent(slug: string, locale?: Locale): Promise<CountryContent | undefined> {
  return findContent(slug, await resolve(locale));
}

/** Slugs only, no text: safe to call anywhere. */
export async function getCountrySlugsWithContent(): Promise<string[]> {
  return countriesWithContent;
}

export async function getFood(countrySlug: string, foodSlug: string, locale?: Locale): Promise<Food | undefined> {
  return findContent(countrySlug, await resolve(locale))?.foods.find((f) => f.slug === foodSlug);
}

export async function getSchedule(locale?: Locale): Promise<ScheduleItem[]> {
  const loc = await resolve(locale);
  return [...schedule]
    .sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start))
    .map((item) => localizeScheduleItem(item, loc));
}

export async function getMap(locale?: Locale) {
  const loc = await resolve(locale);
  return { booths, facilities: facilities.map((f) => localizeFacility(f, loc)) };
}
