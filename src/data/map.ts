import type { MapBooth, MapFacility } from "@/types";

/**
 * Festival ground layout in map units. The SVG viewBox is 1000 × 820
 * (x = left → right, y = top → bottom).
 *
 *   - Stage plaza: the strip at the top (y 0–170), north of the courtyard
 *   - Outer diagonal row: on the walkway beside the main building, line x + y = 715
 *   - Inner diagonal row: on the promenade beside the lawn, line x + y = 920
 *   - Top row: between the walkway and the lawn's top corner, y = 250
 *   - East column: between the lawn and the east flower beds, x = 850
 *   - The south side (below the lawn) has no stands
 */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 820;

export const booths: MapBooth[] = [
  // Inner diagonal row, bottom-left to top-right
  { id: "B-01", country: "indonesia", x: 370, y: 550 },
  { id: "B-02", country: "china", x: 450, y: 470 },
  { id: "B-03", country: "japan", x: 530, y: 390 },
  { id: "B-04", country: "korea", x: 610, y: 310 },
  // Top row, left to right
  { id: "B-05", country: "india", x: 720, y: 250 },
  { id: "B-06", country: "thailand", x: 810, y: 250 },
  // East column, top to bottom
  { id: "B-07", country: "france", x: 850, y: 340 },
  { id: "B-08", country: "germany", x: 850, y: 430 },
  { id: "B-09", country: "usa", x: 850, y: 520 },
  // Outer diagonal row (beside the main building), bottom-left to top-right
  { id: "B-10", country: "brazil", x: 240, y: 475 },
  { id: "B-11", country: "russia", x: 330, y: 385 },
  { id: "B-12", country: "vietnam", x: 420, y: 295 },
];

export const facilities: MapFacility[] = [
  // Stage plaza
  { id: "stage-main", type: "stage", label: "Main Stage", x: 790, y: 85 },
  { id: "toilet-north", type: "toilet", label: "Toilets", x: 950, y: 55 },
  { id: "info-stage", type: "info", label: "Lost & Found", x: 950, y: 120 },
  // On the lawn
  { id: "stage-garden", type: "stage", label: "Garden Stage", x: 720, y: 440 },
  { id: "rest-lawn-west", type: "rest", label: "Rest Area (picnic lawn)", x: 480, y: 660 },
  { id: "rest-lawn-east", type: "rest", label: "Rest Area (picnic lawn)", x: 680, y: 520 },
  // East promenade, below the stands
  { id: "food-east", type: "food", label: "Food Court", x: 850, y: 600 },
  { id: "food-drinks", type: "food", label: "Drinks & Tea Corner", x: 850, y: 670 },
  { id: "medical", type: "medical", label: "Medical Tent", x: 850, y: 740 },
  // South-west corner
  { id: "toilet-west", type: "toilet", label: "Toilets", x: 140, y: 740 },
  { id: "info-main", type: "info", label: "Information Desk", x: 330, y: 780 },
  { id: "entrance", type: "entrance", label: "Entrance", x: 230, y: 790 },
];