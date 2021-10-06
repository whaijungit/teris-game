import GamgeConfig from "../config/GamgeConfig";
import { RectangleGroup } from "./RectangleGroup";
import { MovedDirection, Point, Shape } from "../interface";
import { isPoint } from "../utils";
import { Rectangle } from "./Rectangle";

export class TerisRules {

  static canIMove(shape: Shape, tragetPoint: Point, exeists: Rectangle[]): boolean {
    const tragetRectanglePoint: Point[] = shape.map(it => {
      return {
        clientX: it.clientX + tragetPoint.clientX,
        clientY: it.clientY + tragetPoint.clientY
      }
    });
    let result = tragetRectanglePoint.some(it => {
      return it.clientX < 0 || it.clientX > GamgeConfig.panlSzie.width - 1 || it.clientY < 0 || it.clientY > GamgeConfig.panlSzie.height - 1
    })
    if (result) {
      return false
    }
    result = tragetRectanglePoint.some(point =>
      exeists.some(it => it.getPoint().clientX === point.clientX && it.getPoint().clientY === point.clientY)
    )
    if (result) {
      return false
    }
    return true
  }

  static move(teris: RectangleGroup, drirection: MovedDirection, exesits: Rectangle[]): boolean
  static move(teris: RectangleGroup, tragetPoint: Point, exesits: Rectangle[]): boolean
  static move(teris: RectangleGroup, tragetPointOrDirection: Point | MovedDirection, exesits: Rectangle[]): boolean {
    if (isPoint(tragetPointOrDirection)) {
      if (this.canIMove(teris._shape, tragetPointOrDirection, exesits)) {
        teris._centerPoint = tragetPointOrDirection
        return true
      }
      return false
    }
    else {
      const drirection = tragetPointOrDirection;
      let tragetPoint: Point;
      if (drirection === MovedDirection.down) {
        tragetPoint = {
          clientX: teris._centerPoint.clientX,
          clientY: teris._centerPoint.clientY + 1
        }
      } else if (drirection === MovedDirection.left) {
        tragetPoint = {
          clientX: teris._centerPoint.clientX - 1,
          clientY: teris._centerPoint.clientY
        }
      } else {
        tragetPoint = {
          clientX: teris._centerPoint.clientX + 1,
          clientY: teris._centerPoint.clientY
        }
      }
      return this.move(teris, tragetPoint, exesits)
    }
  }

  static moveDirectly(teris: RectangleGroup, drirection: MovedDirection, exesits: Rectangle[]) {
    while (this.move(teris, drirection, exesits)) { }
  }

  static rotate(teris: RectangleGroup, exesits: Rectangle[]): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris._centerPoint, exesits)) {
      teris.rotate()
      return false
    } else {
      return true
    }
  }

  private static getLineRectangles(exesits: Rectangle[], y: number) {
    return exesits.filter(rect => rect.getPoint().clientY === y)
  }

  static deletRectangles(exesits: Rectangle[]): number {
    const clientYS = exesits.map(it => it.getPoint().clientY)
    const maxY = Math.max(...clientYS)
    const minY = Math.min(...clientYS);
    let line = 0;
    for (let y = minY; y <= maxY; y++) {
      if (this.deletLine(exesits, y)) {
        line++
      }
    }
    return line
  }

  private static deletLine(exesits: Rectangle[], line: number): boolean {
    const rectangles = this.getLineRectangles(exesits, line)
    if (rectangles.length === GamgeConfig.panlSzie.width) {
      rectangles.forEach(rect => {
        rect.getViewer()?.remove()
        const index = exesits.indexOf(rect);
        exesits.splice(index, 1)
      })
      exesits.filter(rect => rect.getPoint().clientY < line).forEach(rect => {
        rect.setPoint({
          clientX: rect.getPoint().clientX,
          clientY: rect.getPoint().clientY + 1
        })
      })
      return true
    }
    return false
  }
}