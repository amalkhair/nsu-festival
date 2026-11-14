import { getStandKind, standSlug } from "@/lib/stand";
import type { Country } from "@/types";
import type { ResolvedStand, Stand, StandLocale } from "@/types/stand";
import { countries } from "@/data/countries/list";
import { booths } from "@/data/map";
import { countriesRu, tagsRu } from "@/data/ru/countries";

/** Temporary adapter: v0 identity data -> common stand model, later replace via data layer. */
function toStand(country: Country, boothCode: string): Stand {
  const kind = getStandKind(country.slug);
  const russian = countriesRu[country.slug];
  const translations: Stand["translations"] = {
    en: {
      name: country.name,
      tagline: country.tagline,
      summary: country.tags.join(" · "),
      description: "",
      reviewStatus: "approved",
    },
  };
  if (russian) {
    translations.ru = {
      name: russian.name,
      tagline: russian.tagline,
      summary: country.tags.map((tag) => tagsRu[tag] ?? tag).join(" · "),
      description: "",
      reviewStatus: "approved",
    };
  }
  return {
    id: `stand-${boothCode.padStart(2, "0")}`,
    slug: standSlug(country.slug, boothCode),
    boothCode,
    kind,
    countrySlug: kind === "country" ? country.slug : null,
    // Do not display an arbitrary Russian flag on institution or themed stands.
    flagCode: kind === "country" ? country.flag : undefined,
    theme: country.theme,
    tags: country.tags,
    status: "published",
    translations,
    externalResources: [],
  };
}

// One identity per physical stand; several stands can share a country profile.
export const stands: Stand[] = booths.map((booth) => {
  const country = countries.find(c => c.slug === booth.country);
  if (!country) throw new Error(`Missing country profile for stand ${booth.id}`);
  return toStand(country, booth.id);
});

export function getStand(slug: string): Stand | undefined {
  return stands.find((stand) => stand.slug === slug);
}

export function resolveStand(stand: Stand, locale: StandLocale = "en"): ResolvedStand {
  const requested = stand.translations[locale];
  const selected = requested ?? stand.translations.en;
  return {
    id: stand.id,
    slug: stand.slug,
    boothCode: stand.boothCode,
    kind: stand.kind,
    countrySlug: stand.countrySlug,
    flagCode: stand.flagCode,
    theme: stand.theme,
    tags: stand.tags,
    status: stand.status,
    externalResources: stand.externalResources,
    locale,
    name: selected?.name ?? stand.slug,
    tagline: selected?.tagline ?? "",
    summary: selected?.summary ?? "",
    description: selected?.description ?? "",
    translationFallback: locale !== "en" && !requested,
  };
}
