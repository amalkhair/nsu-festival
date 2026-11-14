import { fitPoint } from "./layout";

/** Source of truth: Version A as approved in chat. Country slugs may repeat. */
export const SOURCE_BOOTHS = [
  { id: "1", country: "iran", x: 82, y: 463 },
  { id: "2", country: "niger", x: 127, y: 450 },
  { id: "3", country: "pakistan", x: 168, y: 437 },
  { id: "4", country: "syria", x: 209, y: 423 },
  { id: "5", country: "tajikistan", x: 251, y: 412 },
  { id: "6", country: "india", x: 292, y: 398 },
  { id: "7", country: "mexico", x: 333, y: 386 },
  { id: "8", country: "serbia", x: 400, y: 370 },
  { id: "9", country: "algeria", x: 445, y: 356 },
  { id: "10", country: "english-countries", x: 488, y: 344 },
  { id: "11", country: "chinese-tea", x: 532, y: 332 },
  { id: "12", country: "germany", x: 575, y: 318 },
  { id: "13", country: "france", x: 618, y: 304 },
  { id: "14", country: "italy", x: 661, y: 291 },
  { id: "15", country: "china", x: 703, y: 278 },
  { id: "16", country: "china", x: 744, y: 265 },
  { id: "17", country: "indonesia", x: 787, y: 250 },
  { id: "18", country: "japan", x: 829, y: 238 },
  { id: "19", country: "russia", x: 872, y: 226 },
  { id: "20", country: "azerbaijan", x: 534, y: 458 },
  { id: "21", country: "sibupk", x: 578, y: 444 },
  { id: "22", country: "engineering", x: 622, y: 431 },
  { id: "23", country: "sibstrin", x: 666, y: 418 },
  { id: "24", country: "ngpu", x: 709, y: 406 },
  { id: "25", country: "nguadi", x: 750, y: 394 },
  { id: "26", country: "ngtu", x: 793, y: 382 },
  { id: "27", country: "nigeria", x: 914, y: 351 },
  { id: "28", country: "uzbekistan", x: 953, y: 372 },
  { id: "29", country: "thailand", x: 992, y: 393 },
  { id: "30", country: "burkina-faso", x: 1031, y: 415 },
  { id: "31", country: "myanmar", x: 1071, y: 436 },
  { id: "32", country: "sri-lanka", x: 1232, y: 347 },
  { id: "33", country: "bangladesh", x: 1240, y: 386 },
  { id: "34", country: "karakalpakstan", x: 1248, y: 423 },
  { id: "35", country: "korea", x: 1256, y: 462 },
  { id: "36", country: "tea-pavilion", x: 1263, y: 501 },
];

export const STAND_PLACEMENTS = SOURCE_BOOTHS.map(({ x, y, ...booth }) => ({
  ...booth,
  ...fitPoint(x, y),
  // Compact numbered markers fit the densely spaced rows without overlap.
  angle: Number(booth.id) <= 26 ? -17 : Number(booth.id) <= 31 ? 29 : -11,
  width: 18,
  height: 21,
}));
export const STAND_BY_ID = Object.fromEntries(STAND_PLACEMENTS.map(p => [p.id, p]));

// The stage front (+Y) faces the centre of row 27–31.
const stage = fitPoint(1120, 214);
const rowCentre = fitPoint(992, 393);
export const STAGE = {
  ...stage, width: 87, height: 54,
  angle: Math.atan2(rowCentre.y - stage.y, rowCentre.x - stage.x) * 180 / Math.PI - 90,
};
export const ENTRANCE = fitPoint(1140, 100);
