import Clipper from "clipper-js";

const multiplier = 1e6;
const toClipper = p => ({ X: p[0] * multiplier, Y: p[1] * multiplier });
const fromClipper = c => [c.X / multiplier, c.Y / multiplier];

type Point = [number, number];
type JointType = "jtMiter" | "jtRound" | "jtSquare";
type EndType =
  | "etClosedPolygon"
  | "etClosedLine"
  | "etOpenSquare"
  | "etOpenRound"
  | "etOpenButt";

/**
 * Expands or contracts points of a closed polygon.
 * @param delta
 * @param jointType
 * @param endType
 * @param miterLimit
 * @param roundPrecision
 */
export const offset = (
  delta: number,
  jointType: JointType = "jtMiter",
  endType: EndType = "etClosedPolygon",
  miterLimit: number = Infinity,
  roundPrecision: number = 0
) => (points: Point[]): Point[] => {
  const subject = new Clipper([points.map(toClipper)], true);
  const newShape = subject.offset(delta * multiplier, {
    jointType,
    endType,
    miterLimit,
    roundPrecision
  });
  const outPath = newShape.paths[0] || [];
  return outPath.map(fromClipper);
};

/**
 * Calculates the area of a polygon
 * @param outline
 */
export const area = (outline: Point[]): number => {
  const shape = new Clipper([outline.map(toClipper)], true);
  const rawArea = shape.totalArea();
  return Math.abs(rawArea / multiplier) / multiplier;
};
