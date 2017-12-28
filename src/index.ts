import * as Clipper from "./patterns/clipper";
import * as Point from "./patterns/geometry/point";
import * as List from "./patterns/core/list";
const _ = require("lodash/fp");

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

const pluck = key => item => item[key];

function calculatePoints(distance) {
  let points = [];
  for (let i = 0; i < distance / 2; i += 300) {
    points.push(i);
  }
  return points;
}

_.flow(_.map(pluck("distance")), _.map(calculatePoints), console.log)(b);

// console.log(b.map(pluck("distance")));

// console.log(points.original)
// console.log(distances);

// const _ = require("lodash/fp");
// const snabbdom = require('snabbdom');
// const patch = snabbdom.init([
//   require('snabbdom/modules/class').default, // makes it easy to toggle classes
//   require('snabbdom/modules/props').default, // for setting properties on DOM elements
//   require('snabbdom/modules/style').default, // handles styling on elements with support for animations
//   require('snabbdom/modules/eventlisteners').default, // attaches event listeners
// ]);
// const h = require('snabbdom/h').default; // helper function for creating vnodes
// const p = _.flow(
//   List.loopifyInPairs,
//   _.map(([start, end]) => Point.distance(start, end))
// )(points.original);
