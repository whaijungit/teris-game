import { Point } from "../interface";

export function getRandom(min: number, max: number):number {
  return Math.floor(Math.random() * max - min + min)
}

export function isPoint(object: any): object is Point{
  if (typeof object.clientX !== "undefined") {
    return true
  }
  return false
}