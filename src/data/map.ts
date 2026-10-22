import type { MapBooth, MapFacility } from "@/types";

/**
 * Festival ground layout in map units. The SVG viewBox is 1000 × 680
 * (x = left → right, y = top → bottom).
 *
 * The ground is the NSU courtyard (drawn in MapGround, FestivalMap.tsx):
 *   - the ring road runs along the left edge, diagonally up to the top, and down the right edge
 *   - the triangular lawn has corners at (330,580), (820,90) and (820,580)
 *   - the diagonal promenade between the flower beds and the lawn follows the line x + y = 780
 *   - the east promenade (between lawn and east flower beds) is centred on x = 852
 *   - the south promenade (below the lawn) is centred on y = 630
 */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 680;

export const booths: MapBooth[] = [
  // Diagonal promenade, bottom-left to top-right (x + y = 780, 60-unit steps)
  { id: "B-01", country: "indonesia", x: 240, y: 540 },
  { id: "B-02", country: "china", x: 300, y: 480 },
  { id: "B-03", country: "japan", x: 360, y: 420 },
  { id: "B-04", country: "korea", x: 420, y: 360 },
  { id: "B-05", country: "india", x: 480, y: 300 },
  { id: "B-06", country: "thailand", x: 540, y: 240 },
  { id: "B-07", country: "france", x: 600, y: 180 },
  { id: "B-08", country: "germany", x: 660, y: 120 },
  // South promenade, below the lawn, left to right
  { id: "B-09", country: "usa", x: 410, y: 630 },
  { id: "B-10", country: "brazil", x: 500, y: 630 },
  { id: "B-11", country: "russia", x: 590, y: 630 },
  { id: "B-12", country: "vietnam", x: 680, y: 630 },
];

export const facilities: MapFacility[] = [
  // On the lawn
  { id: "stage-main", type: "stage", label: "Main Stage", x: 690, y: 440 },
  { id: "stage-garden", type: "stage", label: "Garden Stage", x: 730, y: 230 },
  { id: "rest-lawn-west", type: "rest", label: "Rest Area (picnic lawn)", x: 430, y: 505 },
  { id: "rest-lawn-east", type: "rest", label: "Rest Area (picnic lawn)", x: 700, y: 300 },
  // East promenade, top to bottom
  { id: "food-east", type: "food", label: "Food Court East", x: 852, y: 190 },
  { id: "food-drinks", type: "food", label: "Drinks & Tea Corner", x: 852, y: 300 },
  { id: "info-stage", type: "info", label: "Lost & Found", x: 852, y: 410 },
  { id: "medical", type: "medical", label: "Medical Tent", x: 852, y: 510 },
  { id: "toilet-east", type: "toilet", label: "Toilets", x: 852, y: 610 },
  // South promenade
  { id: "food-south", type: "food", label: "Food Court South", x: 770, y: 632 },
  { id: "info-main", type: "info", label: "Information Desk", x: 330, y: 640 },
  { id: "entrance", type: "entrance", label: "Entrance", x: 230, y: 650 },
  { id: "toilet-west", type: "toilet", label: "Toilets", x: 140, y: 600 },
];