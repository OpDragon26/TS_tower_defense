import type { TowerDefense } from "../../TowerDefense";
import type Tower from "../Tower";

export abstract class TowerFactory {
  protected game: TowerDefense;
  constructor(game: TowerDefense) {
    this.game = game;
  }
  abstract createTower(
    x: number,
    y: number,
    scale: number,
    rotation: number,
  ): Tower;
  abstract createTowerTexture(): HTMLImageElement;
}
