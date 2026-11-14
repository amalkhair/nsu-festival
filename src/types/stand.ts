/** Canonical OPD stand model: country and non-country stands share one interface. */
export type StandKind = "country" | "regional_collective" | "organization" | "thematic" | "unassigned";
export type StandStatus = "draft" | "review" | "published" | "archived";
export type StandLocale = "en" | "ru";

export interface StandTranslation {
  name: string;
  tagline?: string;
  summary?: string;
  description?: string;
  reviewStatus: "draft" | "in_review" | "approved";
}

export interface Stand {
  /** Stable ID; keep it unchanged when the map marker moves. */
  id: string;
  slug: string;
  boothCode: string;
  kind: StandKind;
  /** Null for organisation, thematic and unassigned stands. */
  countrySlug: string | null;
  flagCode?: string;
  theme: { primary: string; primaryDark: string; accent: string; soft: string };
  tags: string[];
  status: StandStatus;
  translations: Partial<Record<StandLocale, StandTranslation>>;
  externalResources: Array<{ label: string; url: string; locale?: StandLocale }>;
}

export interface ResolvedStand extends Omit<Stand, "translations"> {
  locale: StandLocale;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  translationFallback: boolean;
}
