import { Point, Shape } from "../interface";
import { getRandom } from "../utils";
import { RectangleGroup } from "./RectangleGroup";

export class TShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: -1, clientY: 0 }, { clientX: 0, clientY: 0 }, { clientX: 1, clientY: 0 }, { clientX: 0, clientY: -1 }
    ], _centerPoint, color)
  }
}

export class LShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: -2, clientY: 0 }, { clientX: -1, clientY: 0 }, { clientX: 0, clientY: 0 }, { clientX: 0, clientY: -1 }
    ], _centerPoint, color)
  }
}

export class LMirrorShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: 2, clientY: 0 }, { clientX: 1, clientY: 0 }, { clientX: 0, clientY: 0 }, { clientX: 0, clientY: -1 }
    ], _centerPoint, color)
  }
}

export class SShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: 0, clientY: 0 }, { clientX: 1, clientY: 0 }, { clientX: 0, clientY: 1 }, { clientX: -1, clientY: 1 }
    ]
      , _centerPoint, color)
  }
  rotate() {
    super.rotate()
    this.isClick = !this.isClick
  }
}

export class SMirrorShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: 0, clientY: 0 }, { clientX: -1, clientY: 0 }, { clientX: 0, clientY: 1 }, { clientX: 1, clientY: 1 }
    ]
      , _centerPoint, color)
  }
  rotate() {
    super.rotate()
    this.isClick = !this.isClick
  }
}

export class RectShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: 0, clientY: 0 }, { clientX: 1, clientY: 0 }, { clientX: 0, clientY: 1 }, { clientX: 1, clientY: 1 }
    ], _centerPoint, color)
  }
  afterRotateShape() {
    return this._shape
  }
}

export class LineShape extends RectangleGroup {
  constructor(_centerPoint: Point, color: string) {
    super([
      { clientX: -1, clientY: 0 }, { clientX: 0, clientY: 0 }, { clientX: 1, clientY: 0 }, { clientX: 2, clientY: 0 }
    ], _centerPoint, color)
  }
  rotate() {
    super.rotate()
    this.isClick = !this.isClick
  }
}

export const shapes = [
  TShape,
  SShape,
  SMirrorShape,
  RectShape,
  LShape,
  LMirrorShape,
  LineShape
];

export const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "orange"
]

export function createTeris(centerPoint: Point): RectangleGroup {
  let index = getRandom(0, shapes.length);
  const Shape = shapes[index]
  index = getRandom(0, colors.length)
  const color = colors[index];
  return new Shape(centerPoint, color)
}