import type { StandKind } from "@/types/stand";

const NON_COUNTRY_KINDS: Record<string, StandKind> = {
  "english-countries": "regional_collective",
  "chinese-tea": "thematic",
  sibupk: "organization", engineering: "organization", sibstrin: "organization",
  ngpu: "organization", nguadi: "organization", ngtu: "organization",
  "tea-pavilion": "thematic",
};
export function getStandKind(countrySlug: string): StandKind {
  return NON_COUNTRY_KINDS[countrySlug] ?? "country";
}
/** Physical stand routes stay distinct even when country profiles are shared. */
export function standSlug(countrySlug: string, boothId: string): string {
  return countrySlug === "china" ? `china-${boothId}` : countrySlug;
}
