
/**
 * Visual identity for the 36 festival booths.
 * Keys use country slugs from src/data/countries/list.ts.
 * Codes are display labels, not official ISO codes in every case.
 */

export type MapIdentity = {
  code: string;
  logo?: string;
};

export const mapIdentities: Record<string, MapIdentity> = {
  iran: { code: "IRN" },
  niger: { code: "NER" },
  pakistan: { code: "PAK" },
  syria: { code: "SYR" },
  tajikistan: { code: "TJK" },
  india: { code: "IND" },
  mexico: { code: "MEX" },

  serbia: { code: "SRB" },
  algeria: { code: "DZA" },
  "english-countries": { code: "ENG" },
  "chinese-tea": { code: "CTP" },
  germany: { code: "DEU" },
  france: { code: "FRA" },
  italy: { code: "ITA" },
  china: { code: "CHN" },
  indonesia: { code: "IDN" },
  japan: { code: "JPN" },
  russia: { code: "RUS" },
  azerbaijan: { code: "AZE" },

  sibupk: { code: "SUP" },
  engineering: { code: "EBT" },
  sibstrin: { code: "SST" },
  ngpu: { code: "НГПУ" },
  nguadi: { code: "НГУА" },
  ngtu: { code: "НГТУ" },
  nigeria: { code: "NGA" },

  uzbekistan: { code: "UZB" },
  thailand: { code: "THA" },
  "burkina-faso": { code: "BFA" },
  myanmar: { code: "MMR" },
  "sri-lanka": { code: "LKA" },

  bangladesh: { code: "BGD" },
  karakalpakstan: { code: "KKL" },
  korea: { code: "KOR" },
  "tea-pavilion": { code: "TEA" },
  "unassigned-36": { code: "B36" },
};
