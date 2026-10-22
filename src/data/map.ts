
import type { MapBooth, MapFacility } from "@/types";

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 680;

/**
 * Festival layout — horseshoe / U formation.
 * Semua koordinat berada di dalam viewBox 1000 × 680.
 */
export const booths: MapBooth[] = [
  // Blok 1: kiri bawah menuju tengah
  { id: "1", country: "iran", x: 100, y: 485 },
  { id: "2", country: "niger", x: 145, y: 460 },
  { id: "3", country: "pakistan", x: 190, y: 435 },
  { id: "4", country: "syria", x: 235, y: 410 },
  { id: "5", country: "tajikistan", x: 280, y: 385 },
  { id: "6", country: "india", x: 325, y: 360 },
  { id: "7", country: "mexico", x: 370, y: 335 },

  // Blok 2: tengah naik ke kanan atas
  { id: "8", country: "serbia", x: 410, y: 300 },
  { id: "9", country: "algeria", x: 450, y: 270 },
  { id: "10", country: "english-countries", x: 490, y: 240 },
  { id: "11", country: "chinese-tea", x: 530, y: 210 },
  { id: "12", country: "germany", x: 570, y: 185 },
  { id: "13", country: "france", x: 610, y: 165 },
  { id: "14", country: "italy", x: 650, y: 150 },
  { id: "15", country: "china", x: 690, y: 140 },
  { id: "16", country: "indonesia", x: 730, y: 135 },
  { id: "17", country: "japan", x: 775, y: 135 },
  { id: "18", country: "russia", x: 820, y: 145 },
  { id: "19", country: "azerbaijan", x: 865, y: 160 },

  // Blok 3: deret bawah, kiri ke kanan
  { id: "20", country: "sibupk", x: 300, y: 590 },
  { id: "21", country: "engineering", x: 350, y: 590 },
  { id: "22", country: "sibstrin", x: 400, y: 590 },
  { id: "23", country: "ngpu", x: 450, y: 590 },
  { id: "24", country: "nguadi", x: 500, y: 590 },
  { id: "25", country: "ngtu", x: 550, y: 590 },
  { id: "26", country: "nigeria", x: 600, y: 590 },

  // Blok 4: sisi kanan bawah
  { id: "27", country: "uzbekistan", x: 650, y: 430 },
  { id: "28", country: "thailand", x: 695, y: 455 },
  { id: "29", country: "burkina-faso", x: 740, y: 480 },
  { id: "30", country: "myanmar", x: 785, y: 505 },
  { id: "31", country: "sri-lanka", x: 830, y: 530 },

  // Blok 5: deret vertikal paling kanan
  { id: "32", country: "bangladesh", x: 925, y: 280 },
  { id: "33", country: "karakalpakstan", x: 925, y: 330 },
  { id: "34", country: "korea", x: 925, y: 380 },
  { id: "35", country: "tea-pavilion", x: 925, y: 430 },
  { id: "36", country: "unassigned-36", x: 925, y: 480 },
];

export const facilities: MapFacility[] = [
  // Panggung utama di dalam area U, tidak menutupi booth
  {
    id: "stage-main",
    type: "stage",
    label: "Main Stage",
    x: 810,
    y: 250,
  },

  // Pintu masuk di pojok kanan atas
  {
    id: "entrance",
    type: "entrance",
    label: "Entrance",
    x: 925,
    y: 90,
  },

  // Panggung tambahan
  {
    id: "stage-garden",
    type: "stage",
    label: "Garden Stage",
    x: 190,
    y: 230,
  },

  // Area makanan di sisi bawah
  {
    id: "food-west",
    type: "food",
    label: "Food Court West",
    x: 120,
    y: 625,
  },
  {
    id: "food-east",
    type: "food",
    label: "Food Court East",
    x: 750,
    y: 625,
  },

  // Fasilitas umum
  {
    id: "info-main",
    type: "info",
    label: "Information Desk",
    x: 520,
    y: 430,
  },
  {
    id: "toilet-east",
    type: "toilet",
    label: "Toilets",
    x: 960,
    y: 560,
  },
  {
    id: "medical",
    type: "medical",
    label: "Medical Tent",
    x: 500,
    y: 100,
  },
];
