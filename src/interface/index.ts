/*---------------------------------------
  interface teris interface type enum
  and types exsitois
  [rectangle rectangleGroup Point
  rectangleViewer GameViewer Shape
  MoveDirection GameStatus]
---------------------------------------*/

import { Game } from "../core/Game";
import { Rectangle } from "../core/Rectangle";
import { RectangleGroup } from "../core/RectangleGroup";

export interface Point {
  readonly clientX: number;
  readonly clientY: number;
}

export interface RectangleViewer {
  show(rect: Rectangle): void;
  remove(): void;
}

export interface GameViewer {
  showNextTeris(teris: RectangleGroup): void;
  switchTeris(teris: RectangleGroup): void;
  init(game: Game): void;
  showScore(score: number): void;
  onPause(): void;
  onStart(): void;
  onOver(): void;
}

export type Shape = Point[];

export enum MovedDirection {
  left,
  right,
  down,
}

export enum GameStatus {
  init,
  playing,
  pause,
  over
}