import { Rectangle } from "../core/Rectangle";
import { RectangleViewer } from "../interface";

export class RectangleConsoleViewer implements RectangleViewer {
  show(rect: Rectangle): void {
    console.log(rect.getPoint().clientX, rect.getPoint().clientY,rect.getColor())
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }

}