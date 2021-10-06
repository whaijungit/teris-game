import { Rectangle } from "./Rectangle";
import { Point, Shape } from "../interface";

export abstract class RectangleGroup {
  private rectangles: readonly Rectangle[] = [];
  protected isClick: boolean = true;
  constructor(private shape: Shape, private centerPoint: Point, private color: string) {
    const arr: Rectangle[] = [];
    this.shape.forEach(point => {
      const rect = new Rectangle();
      rect.setColor(this.color);
      rect.setPoint({
        clientX: this.centerPoint.clientX + point.clientX,
        clientY: this.centerPoint.clientY + point.clientY
      })
      arr.push(rect)
    })
    this.rectangles = arr;
  }

  restCenterPoint() {
    this.setRectanglePoint()
  }

  private setRectanglePoint() {
    this.shape.forEach((point, index) => {
      this._rectangles[index].setPoint({
        clientX: this.centerPoint.clientX + point.clientX,
        clientY: this.centerPoint.clientY + point.clientY
      })
    })
  }

  public get _shape() {
    return this.shape
  }

  public set _shape(shape: Shape) {
    this.shape = shape
  }

  public get _rectangles() {
    return this.rectangles
  }

  public get _centerPoint() {
    return this.centerPoint
  }

  public set _centerPoint(point: Point) {
    this.centerPoint = point;
    this.restCenterPoint()
  }

  afterRotateShape(): Shape {
    if (this.isClick) {
      return this._shape.map(it => {
        const newPoint: Point = {
          clientX: -it.clientY,
          clientY: it.clientX
        }
        return newPoint
      })
    } else {
      return this._shape.map(it => {
        const newPoint: Point = {
          clientX: it.clientY,
          clientY: -it.clientX
        }
        return newPoint
      })
    }
  }
  rotate() {
    const shape = this.afterRotateShape();
    this._shape = shape
    this.setRectanglePoint()
  }
}