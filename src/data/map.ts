import type { MapBooth, MapFacility } from "@/types";

/**
 * Festival ground layout in map units. The SVG viewBox is 1000 × 680.
 * Booths line both sides of the central avenue, from the stage down to the entrance.
 * Swap these coordinates for the real site plan when it's available.
 */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 680;

export const booths: MapBooth[] = [
  { id: "B-01", country: "indonesia", x: 395, y: 245 },
  { id: "B-02", country: "china", x: 605, y: 245 },
  { id: "B-03", country: "japan", x: 395, y: 310 },
  { id: "B-04", country: "korea", x: 605, y: 310 },
  { id: "B-05", country: "india", x: 395, y: 375 },
  { id: "B-06", country: "thailand", x: 605, y: 375 },
  { id: "B-07", country: "france", x: 395, y: 480 },
  { id: "B-08", country: "germany", x: 605, y: 480 },
  { id: "B-09", country: "usa", x: 395, y: 545 },
  { id: "B-10", country: "brazil", x: 605, y: 545 },
  { id: "B-11", country: "russia", x: 270, y: 480 },
  { id: "B-12", country: "vietnam", x: 730, y: 480 },
];

export const facilities: MapFacility[] = [
  { id: "stage-main", type: "stage", label: "Main Stage", x: 500, y: 112 },
  { id: "stage-garden", type: "stage", label: "Garden Stage", x: 170, y: 250 },
  { id: "food-west", type: "food", label: "Food Court West", x: 230, y: 360 },
  { id: "food-east", type: "food", label: "Food Court East", x: 790, y: 330 },
  { id: "food-drinks", type: "food", label: "Drinks & Tea Corner", x: 815, y: 220 },
  { id: "info-main", type: "info", label: "Information Desk", x: 430, y: 615 },
  { id: "info-stage", type: "info", label: "Lost & Found", x: 690, y: 120 },
  { id: "toilet-east", type: "toilet", label: "Toilets", x: 850, y: 540 },
  { id: "toilet-west", type: "toilet", label: "Toilets", x: 150, y: 470 },
  { id: "medical", type: "medical", label: "Medical Tent", x: 850, y: 610 },
  { id: "rest-west", type: "rest", label: "Rest Area", x: 175, y: 575 },
  { id: "rest-east", type: "rest", label: "Rest Area", x: 820, y: 420 },
  { id: "entrance", type: "entrance", label: "Entrance", x: 500, y: 650 },
];
