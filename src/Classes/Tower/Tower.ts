import type IEntity from "../Engine/Entities/IEntity";
import GameEntity from "../Engine/Entities/Standard/Entity";
import CircleHitbox from "../Engine/Hitboxes/CircleHitbox";
import type IHitbox from "../Engine/Hitboxes/IHitbox";
import { Tags } from "../Tags";
import type { TowerDefense } from "../TowerDefense";

export default abstract class Tower extends GameEntity<TowerDefense> {
    protected targetingRadius;
    constructor(
        targetingRadius: number,
        x: number,
        y: number,
        scale: number,
        rotation: number,
        game: TowerDefense,
        texture: HTMLImageElement,
    ) {
        super(x, y, scale, rotation, game, texture);
        this.targetingRadius = targetingRadius;
    }

    protected findTargets(): IEntity<TowerDefense>[] {
        const hitbox = new CircleHitbox(
            this.x,
            this.y,
            this.targetingRadius,
            this.scale,
        );

        const targets: IEntity<TowerDefense>[] = [];

        this.game.entities.forEach((e) => {
            if (!e.tagged(Tags.ENEMY) || !("hitbox" in e)) return;
            const enemyHitbox = e.hitbox as IHitbox;
            if (enemyHitbox.collides(hitbox)) {
                targets.push(e);
            }
        });
        return targets;
    }
}
