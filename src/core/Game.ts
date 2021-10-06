import { createTeris } from "./Teris";
import { Rectangle } from "./Rectangle";
import { TerisRules } from "./TerisRules";
import GamgeConfig from "../config/GamgeConfig";
import { RectangleGroup } from "./RectangleGroup";
import { GameStatus, GameViewer, MovedDirection } from "../interface";

export class Game {
  private gameStatus: GameStatus = GameStatus.init 
  private cureTeris?: RectangleGroup
  private nextTeris: RectangleGroup;
  private timer?: number
  private duration: number;
  private exists: Rectangle[] = [];
  private score: number = 0;

  public get _gameStatus() {
    return this.gameStatus
  }

  public get _score() {
    return this.score
  }

  public set _score(score:number) {
    this.score = score
    this.gameViewer.showScore(this.score)
    const level = GamgeConfig.levels.filter(it => it.score <= score).pop()!
    if (level.duartion === this.duration) {
      return
    }
    this.duration = level.duartion
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
      this.autoDrop()
    }
  }

  constructor(private gameViewer: GameViewer) {
    this.duration = GamgeConfig.levels[0].duartion;
    this.nextTeris = createTeris({ clientX: 0, clientY: 0 })
    this.createNextTeris()
    this.gameViewer.init(this)
    this.gameViewer.showScore(this._score)
  }
  start() {
    if (this.gameStatus === GameStatus.playing) {
      return
    }
    if (this.gameStatus === GameStatus.over) {
      this.init()
    }
    this.gameStatus = GameStatus.playing
    if (!this.cureTeris) {
      this.switchTeris()
    }
    this.autoDrop()
    this.gameViewer.onStart()
  }

  pause() {
    if (this.gameStatus === GameStatus.playing) {
      this.gameStatus = GameStatus.pause;
      clearInterval(this.timer)
      this.timer = undefined;
      this.gameViewer.onPause();
    }
  }

  controlLeft() {
    if (this.cureTeris && this.gameStatus === GameStatus.playing) {
      TerisRules.move(this.cureTeris, MovedDirection.left, this.exists)
    }
  }

  controlRight() {
    if (this.cureTeris && this.gameStatus === GameStatus.playing) {
      TerisRules.move(this.cureTeris, MovedDirection.right, this.exists)
    }
  }

  controlDown() {
    if (this.cureTeris && this.gameStatus === GameStatus.playing) {
      TerisRules.moveDirectly(this.cureTeris, MovedDirection.down, this.exists)
      this.hitBottom()
    }
  }

  controlRotate() {
    if (this.cureTeris && this.gameStatus === GameStatus.playing) {
      TerisRules.rotate(this.cureTeris, this.exists)
    }
  }

  switchTeris() {
    this.cureTeris = this.nextTeris
    this.cureTeris._rectangles.forEach(rect => rect.getViewer()?.remove())
    this.resetCenterPoint(GamgeConfig.panlSzie.width, this.cureTeris)
    if (!TerisRules.canIMove(this.cureTeris._shape, this.cureTeris._centerPoint, this.exists)) {
      this.gameStatus = GameStatus.over
      clearInterval(this.timer)
      this.timer = undefined
      this.gameViewer.onOver()
      return
    }
    this.createNextTeris()
    this.gameViewer.switchTeris(this.cureTeris)
  }

  private autoDrop() {
    if (this.timer || this.gameStatus !== GameStatus.playing) {
      return
    }
    this.timer = setInterval(() => {
      if (this.cureTeris) {
        if (!TerisRules.move(this.cureTeris, MovedDirection.down, this.exists)) {
          this.hitBottom()
        }
      }
    }, this.duration)
  }

  private resetCenterPoint(width: number, teris: RectangleGroup) {
    const clientX = Math.ceil(width / 2 - 1)
    const clientY = 0;
    teris._centerPoint = { clientX, clientY }
    while (teris._rectangles.some(it => it.getPoint().clientY < 0)) {
      teris._centerPoint = {
        clientX: teris._centerPoint.clientX,
        clientY: teris._centerPoint.clientY + 1
      }
    }
  }

  private hitBottom() {
    this.exists = this.exists.concat(this.cureTeris!._rectangles)
    const line = TerisRules.deletRectangles(this.exists);
    this.addScore(line)
    this.switchTeris()
  }

  private init() {
    this.exists.forEach(rect => rect.getViewer()?.remove())
    this.exists = [];
    this.createNextTeris()
    this.cureTeris = undefined;
    this._score = 0;
  }

  private createNextTeris() {
    this.nextTeris = createTeris({ clientX: 0, clientY: 0 })
    this.resetCenterPoint(GamgeConfig.nextSize.width, this.nextTeris)
    this.gameViewer.showNextTeris(this.nextTeris);
  }

  private addScore(line: number) {
    if (line === 0) {
      return
    } else if (line === 1) {
      this._score += 10
    } else if (line === 2) {
      this._score += 35;
    } else if (line === 3) {
      this._score += 50
    } else {
      this._score += 100
    }
  }
}