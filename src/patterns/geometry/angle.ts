/**
 * converts radians into degrees
 * @param radians
 */
export const rad2Deg = (radians: number): number => radians * 180 / Math.PI;

/**
 * converts degrees into radians
 * @param degrees
 */
export const deg2Rad = (degrees: number): number => degrees * Math.PI / 180;
