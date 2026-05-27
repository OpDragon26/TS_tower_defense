import CircleHitbox from "../Engine/Hitboxes/CircleHitbox";
import type IHitbox from "../Engine/Hitboxes/IHitbox";
import type { TowerDefense } from "../TowerDefense";
import Enemy, { type PathPoint } from "./Enemy";

export class TestEnemy extends Enemy {
    public get hitbox(): IHitbox {
        return new CircleHitbox(this.x, this.y, 10);
    }
    constructor(
        game: TowerDefense,
        path: PathPoint[],
        texture: HTMLImageElement,
        lookAtNextPoint: boolean = false,
    ) {
        super(path, 1, game, texture, lookAtNextPoint);
    }
}
