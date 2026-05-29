import GameEntity from "../Engine/Entities/Standard/Entity";
import Timer from "../Engine/Utils/Timing/Timer";
import type { TowerDefense } from "../TowerDefense";
import type Tower from "./Tower";
import { TowerFactory as TowerFactory } from "./TowerFactory/TowerFactory";

export class MoneyTowerFactory extends TowerFactory {
  createTower(x: number, y: number, scale: number, rotation: number): Tower {
    return new MoneyTower(
      x,
      y,
      scale,
      rotation,
      this.game,
      this.createTowerTexture(),
      1,
      10,
    );
  }
  createTowerTexture(): HTMLImageElement {
    throw new Error("Method not implemented.");
  }
}

// doesn't extend Tower because it doesn't attack
export class MoneyTower extends GameEntity<TowerDefense> {
  private cooldownTimer: Timer;
  private moneyRate: number;
  constructor(
    x: number,
    y: number,
    scale: number,
    rotation: number,
    game: TowerDefense,
    texture: HTMLImageElement,
    cooldown: number,
    moneyRate: number,
  ) {
    super(x, y, scale, rotation, game, texture);

    this.cooldownTimer = new Timer(cooldown, true);
    this.moneyRate = moneyRate;
  }

  update() {
    if (this.cooldownTimer.tick(1 / 60).justFinished) {
      this.game.money += this.moneyRate;
    }
    console.log(this.game.money);
  }
}
