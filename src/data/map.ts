import type { MapBooth, MapFacility } from "@/types";
import { ENTRANCE, STAGE, STAND_PLACEMENTS } from "./map/stand-positions";
export { MAP_WIDTH, MAP_HEIGHT } from "./map/layout";

export const booths: MapBooth[] = STAND_PLACEMENTS.map(
  ({ id, country, x, y }) => ({ id, country, x, y }),
);
export const facilities: MapFacility[] = [
  { id: "stage-main", type: "stage", label: "Main Stage", x: STAGE.x, y: STAGE.y },
  { id: "entrance", type: "entrance", label: "Entrance · Block 3", ...ENTRANCE },
];
