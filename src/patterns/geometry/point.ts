type Point = [number, number];

const _getXY = (startX, startY, endX, endY) => [endX - startX, endY - startY];

/**
 * Lerp
 * @param distance
 */
export const pointOnLine = (distance: number) => (
  [startX, startY]: Point,
  [endX, endY]: Point
): Point => {
  const [x, y] = _getXY(startX, startY, endX, endY);
  const hypot = Math.hypot(x, y);
  return [x / hypot * distance, y / hypot * distance];
};

/**
 * Calculates the straight-line distance between two points
 * @param param0
 * @param param1
 */
export const distance = (
  [startX, startY]: Point,
  [endX, endY]: Point
): number => {
  const [x, y] = _getXY(startX, startY, endX, endY);
  return Math.hypot(x, y);
};

/**
 * Calculates the point at a % distance between two points
 * @param percentage
 */
export const percentageOnLine = (percentage: number = 0.5) => (
  [startX, startY]: Point,
  [endX, endY]: Point
): Point => {
  const [x, y] = _getXY(startX, startY, endX, endY);
  return [startX + x * percentage, startY + y * percentage];
};

/**
 * Calculates the point between two points
 */
export const midpoint = percentageOnLine(0.5);

/**
 * Angle between two points
 * @param param0
 * @param param1
 */
export const angle = ([startX, startY]: Point, [endX, endY]: Point): number => {
  const [x, y] = _getXY(startX, startY, endX, endY);
  return Math.atan2(y, x);
};
