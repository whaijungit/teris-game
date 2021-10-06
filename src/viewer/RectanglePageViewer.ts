import $ from "jquery";
import PagerConfig from "../config/PagerConfig";
import { Rectangle } from "../core/Rectangle";
import { RectangleViewer } from "../interface";

export class RectanglePageViewer implements RectangleViewer {
  private dom?: JQuery<HTMLElement>
  private isRemove: boolean = false;

  constructor(private rect: Rectangle, private container: JQuery<HTMLElement>) {}

  show(rect: Rectangle): void {
    if (this.isRemove) {
      return;
    }
    if (!this.dom) {
      this.dom = $("<div>").css({
        position: "absolute",
        width: PagerConfig.RectangleSize.width,
        height: PagerConfig.RectangleSize.height,
        border: PagerConfig.RectangleSize.border,
        boxSizing: PagerConfig.RectangleSize.boxSizing
      }).appendTo(this.container)
    }
    this.dom.css({
      left: rect.getPoint().clientX * PagerConfig.RectangleSize.width,
      top: rect.getPoint().clientY * PagerConfig.RectangleSize.height,
      background: rect.getColor()
    })
  }

  remove(): void {
    if (this.dom && !this.isRemove) {
      this.dom.remove()
      this.isRemove = true
    }
  }

}