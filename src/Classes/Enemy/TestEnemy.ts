import type { TowerDefense } from "../TowerDefense";
import Enemy, { type PathPoint } from "./Enemy";

export class TestEnemy extends Enemy {
    constructor(
        game: TowerDefense,
        path: PathPoint[],
        texture: HTMLImageElement,
        lookAtNextPoint: boolean = false,
    ) {
        super(path, 1, game, texture, lookAtNextPoint);
    }
}
