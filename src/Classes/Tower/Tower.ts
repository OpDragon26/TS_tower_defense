import GameEntity from "../Engine/Entities/Standard/Entity";
import type { TowerDefense } from "../TowerDefense";

export default abstract class Tower extends GameEntity<TowerDefense> {
  constructor(
    x: number,
    y: number,
    scale: number,
    rotation: number,
    game: TowerDefense,
    texture: HTMLImageElement,
  ) {
    super(x, y, scale, rotation, game, texture);
  }
}
