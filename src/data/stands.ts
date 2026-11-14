import type { Country } from "@/types";
import type { ResolvedStand, Stand, StandKind, StandLocale } from "@/types/stand";
import { countries } from "@/data/countries/list";

/**
 * Transitional adapter from the current prototype data to the unified stand model.
 * Classification of non-country records is provisional and must be confirmed by OPD.
 * Replace this adapter with Directus/PostgreSQL queries later without changing UI types.
 */
const NON_COUNTRY_KINDS: Record<string, StandKind> = {
  "english-countries": "regional_collective",
  "chinese-tea": "thematic",
  sibupk: "organization",
  engineering: "organization",
  sibstrin: "organization",
  ngpu: "organization",
  nguadi: "organization",
  ngtu: "organization",
  "tea-pavilion": "thematic",
  "unassigned-36": "unassigned",
};

function toStand(country: Country): Stand {
  const kind = NON_COUNTRY_KINDS[country.slug] ?? "country";
  return {
    id: `stand-${country.booth.padStart(2, "0")}`,
    slug: country.slug,
    boothCode: country.booth,
    kind,
    countrySlug: kind === "country" ? country.slug : null,
    flagCode: country.flag,
    theme: country.theme,
    tags: country.tags,
    status: "published",
    translations: {
      en: {
        name: country.name,
        tagline: country.tagline,
        summary: country.tags.join(" · "),
        description: "",
        reviewStatus: "approved",
      },
      // Do not invent Russian copy. Missing RU records explicitly fall back to EN.
    },
    externalResources: [],
  };
}

export const stands: Stand[] = countries.map(toStand);

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
