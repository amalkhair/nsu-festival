/**
 * Data access layer.
 *
 * Pages and components get their data ONLY through these functions, never by
 * importing from src/data directly. Today they read static TypeScript files;
 * later each function body is replaced with a Supabase query and the UI
 * doesn't need to change. They're async on purpose for that reason.
 */
import type { Country, CountryContent, Food, Locale, ScheduleItem } from "@/types";
import { countries, getCountry as findCountry } from "@/data/countries/list";
import { countriesWithContent, getCountryContent as findContent } from "@/data/countries/content";
import { schedule } from "@/data/schedule";
import { festival, festivalDays, stages } from "@/data/festival";
import { booths, facilities } from "@/data/map";

export async function getFestival() {
  return { ...festival, days: festivalDays, stages };
}

export async function getCountries(): Promise<Country[]> {
  return countries;
}

export async function getFeaturedCountries(): Promise<Country[]> {
  return countries.filter((c) => c.featured);
}

export async function getCountry(slug: string): Promise<Country | undefined> {
  return findCountry(slug);
}

export async function getCountryContent(slug: string, locale: Locale = "en"): Promise<CountryContent | undefined> {
  return findContent(slug, locale);
}

export async function getCountrySlugsWithContent(): Promise<string[]> {
  return countriesWithContent;
}

export async function getFood(countrySlug: string, foodSlug: string): Promise<Food | undefined> {
  return findContent(countrySlug)?.foods.find((f) => f.slug === foodSlug);
}

export async function getSchedule(): Promise<ScheduleItem[]> {
  return [...schedule].sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start));
}

export async function getMap() {
  return { booths, facilities };
}
