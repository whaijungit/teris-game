import { Point, RectangleViewer } from "../interface";

export class Rectangle {
  public point: Point = {clientX: 0,clientY: 0}
  private viewer?: RectangleViewer
  private color: string = "rgba(255,255,255,.4)"
  public setPoint(point: Point) {
    this.point = point;
    this.viewer?.show(this)
  }
  public getPoint() {
    return this.point;
  }
  public setColor(color: string) {
    this.color = color;
  }
  public getColor() {
    return this.color
  }
  public setViewer(viewer: RectangleViewer) {
    this.viewer = viewer;
    this.viewer.show(this)
  }
  public getViewer() {
    return this.viewer
  }
}