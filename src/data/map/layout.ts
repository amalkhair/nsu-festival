/** Approved canvas and lossless uniform transform from Version A. */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 680;
export const SOURCE_WIDTH = 1480;
export const SOURCE_HEIGHT = 1200;
export const MAP_SCALE = Math.min(MAP_WIDTH / SOURCE_WIDTH, MAP_HEIGHT / SOURCE_HEIGHT);
export const MAP_OFFSET_X = (MAP_WIDTH - SOURCE_WIDTH * MAP_SCALE) / 2;
export const MAP_OFFSET_Y = (MAP_HEIGHT - SOURCE_HEIGHT * MAP_SCALE) / 2;

export function fitPoint(x: number, y: number) {
  return { x: MAP_OFFSET_X + x * MAP_SCALE, y: MAP_OFFSET_Y + y * MAP_SCALE };
}
