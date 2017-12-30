import * as Clipper from "./patterns/clipper";
import * as Point from "./patterns/geometry/point";
import * as List from "./patterns/core/list";
import * as Ob from "./patterns/core/object";
import { map, filter, comp, into, toFn } from "transducers-js";
const _ = require("lodash/fp");

const bigArr = Array.from(Array(1e2).keys());

const inc = n => n + 1;
const isEven = n => n % 2 === 0;
const xf = comp(map(inc), filter(isEven), map(inc));
console.time("a");
into([], xf, bigArr);
console.timeEnd("a");

const apush = (arr, x) => {
  arr.push(x);
  return arr;
};
console.time("b");
bigArr.reduce(toFn(xf, apush), []);
console.timeEnd("b");

const originalPoints: [number, number][] = [
  [0, 0],
  [4000, 0],
  [4000, 2400],
  [2000, 3800],
  [0, 2400]
];

const offset = 250;

const points = {
  original: Clipper.offset(0)(originalPoints),
  outer: Clipper.offset(offset)(originalPoints),
  inner: Clipper.offset(-offset)(originalPoints)
};

const originalPairs = List.loopifyInPairs(points.original);

const distances = originalPairs.map(([start, end]) =>
  Point.distance(start, end)
);

const b = originalPairs.reduce((arr, curr) => {
  const o = {
    start: curr[0],
    end: curr[1],
    distance: Point.distance(curr[0], curr[1])
  };
  arr.push(o);
  return arr;
}, []);
// console.log(b);

function calculatePoints(distance) {
  let points = [];
  for (let i = 0; i < distance / 2; i += 300) {
    points.push(i);
  }
  return points;
}

// prettier-ignore
_.flow(
  _.map(Ob.pluck("distance")),
  _.map(calculatePoints),
  console.log
)(b);
