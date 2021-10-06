import $ from "jquery";
import { GameStatus, GameViewer } from "../interface";
import { RectangleGroup } from "../core/RectangleGroup";
import { RectanglePageViewer } from "./RectanglePageViewer";
import { Game } from "../core/Game";
import GamgeConfig from "../config/GamgeConfig";
import PagerConfig from "../config/PagerConfig";

export class GamePageViewer implements GameViewer {
  
  private nextDom = $("#next");
  private panelDom = $("#panel");
  private scoreDom = $("#score");
  private msgDom = $("#msg");
  init(game: Game): void {
    // 设置游戏面板尺寸
    this.panelDom.css({
      width: GamgeConfig.panlSzie.width * PagerConfig.RectangleSize.width,
      height: GamgeConfig.panlSzie.height * PagerConfig.RectangleSize.height,
    })
    this.nextDom.css({
      width: GamgeConfig.nextSize.width * PagerConfig.RectangleSize.width,
      height: GamgeConfig.nextSize.height * PagerConfig.RectangleSize.height,
    })
    // 设备事件
    $(document).keydown(function (e) {
      if (e.keyCode === 37) {
        game.controlLeft()
      }else if (e.keyCode === 39) {
        game.controlRight()
      } else if (e.keyCode === 38) {
        game.controlRotate()
      } else if (e.keyCode === 32) {
        if (game._gameStatus === GameStatus.playing) {
          game.pause()
        } else {
          game.start()
        }
      } else if (e.keyCode === 40) {
        game.controlDown()
      }
    })
  }
  showNextTeris(teris: RectangleGroup): void {
    teris._rectangles.forEach((rect) => rect.setViewer(new RectanglePageViewer(rect, this.nextDom)))
  }
  switchTeris(teris: RectangleGroup): void {
    teris._rectangles.forEach(rect => {
      rect.getViewer()!.remove()
      rect.setViewer(new RectanglePageViewer(rect, this.panelDom))
    })
  }
  showScore(score: number): void {
    this.scoreDom.html(score.toString())
  }
  onPause(): void {
    this.msgDom.css({
      display: "flex"
    })
    this.msgDom.find("p").html("pause")
  }
  onStart(): void {
    this.msgDom.hide()
  }
  onOver(): void {
    this.msgDom.css({
      display: "flex"
    })
    this.msgDom.find("p").html("Game over")
  }
}