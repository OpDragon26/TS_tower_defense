import GameEntity from "../Engine/Entities/Standard/Entity";
import type IHitbox from "../Engine/Hitboxes/IHitbox";
import { Tags } from "../Tags";
import type { TowerDefense } from "../TowerDefense";

export type PathPoint = {
    coords: [number, number];
    // the speed at which the entity will move at before it reaches the next point
    speed: number;
};

class PathFollower {
    public x: number;
    public y: number;
    public rotation: number = 0;
    private readonly pointsToVisit: PathPoint[];
    private directionVector: [number, number] = [0, 0];
    private lastVisitedPointIndex: number = 0;

    get isOver(): boolean {
        return this.lastVisitedPointIndex >= this.pointsToVisit.length - 1;
    }

    get currentPoint(): PathPoint {
        return this.pointsToVisit[this.lastVisitedPointIndex];
    }

    get nextPoint(): PathPoint {
        return this.pointsToVisit[this.lastVisitedPointIndex + 1];
    }

    constructor(pointsToVisit: PathPoint[]) {
        if (pointsToVisit.length < 2) {
            throw new Error("Points to visit's length is too short");
        }
        this.pointsToVisit = pointsToVisit;
        this.x = this.pointsToVisit[0].coords[0];
        this.y = this.pointsToVisit[0].coords[1];

        this.setRotation();
        this.setDirectionVector();
    }

    public step() {
        if (this.isOver) return;
        const deltatime = 1 / 60;

        this.x += this.directionVector[0] * this.currentPoint.speed * deltatime;
        this.y += this.directionVector[1] * this.currentPoint.speed * deltatime;

        const distCurrent =
            Math.pow(this.x - this.currentPoint.coords[0], 2) +
            Math.pow(this.y - this.currentPoint.coords[1], 2);

        const distCurrentNext =
            Math.pow(
                this.nextPoint.coords[0] - this.currentPoint.coords[0],
                2,
            ) +
            Math.pow(this.nextPoint.coords[1] - this.currentPoint.coords[1], 2);

        if (distCurrent >= distCurrentNext + 0.01) {
            this.x = this.nextPoint.coords[0];
            this.y = this.nextPoint.coords[1];
            this.lastVisitedPointIndex += 1;
            this.setDirectionVector();
            this.setRotation();
        }
    }

    private setRotation() {
        if (this.isOver) return;
        this.rotation = PathFollower.getFacingAngle(
            this.currentPoint.coords,
            this.nextPoint.coords,
        );
    }

    private setDirectionVector() {
        if (this.isOver) return;
        const newX = this.nextPoint.coords[0] - this.currentPoint.coords[0];
        const newY = this.nextPoint.coords[1] - this.currentPoint.coords[1];

        const len = Math.sqrt(newX * newX + newY * newY);
        this.directionVector = [newX / len, newY / len];
    }

    static getFacingAngle(
        point: [number, number],
        nextPoint: [number, number],
    ): number {
        const dx = nextPoint[0] - point[0];
        const dy = nextPoint[1] - point[1];
        return -Math.atan2(dx, dy) + Math.PI / 2;
    }
}

export default abstract class Enemy extends GameEntity<TowerDefense> {
    private lookAtNextPoint: boolean;
    protected pathFollower: PathFollower;
    public abstract hitbox: IHitbox;

    protected isOver(): boolean {
        return this.pathFollower.isOver;
    }
    constructor(
        pointsToFollow: PathPoint[],
        scale: number,
        game: TowerDefense,
        texture: HTMLImageElement,
        lookAtNextPoint: boolean = false,
    ) {
        const pathFollower = new PathFollower(pointsToFollow);
        const rotation = lookAtNextPoint ? pathFollower.rotation : 0;
        super(pathFollower.x, pathFollower.y, scale, rotation, game, texture);
        this.tags.add(Tags.ENEMY);

        this.pathFollower = new PathFollower(pointsToFollow);
        this.lookAtNextPoint = lookAtNextPoint;
    }

    public update(): void {
        if (!this.pathFollower.isOver) {
            this.pathFollower.step();
        }
        this.x = this.pathFollower.x;
        this.y = this.pathFollower.y;
        if (this.lookAtNextPoint) {
            this.rotation = this.pathFollower.rotation;
        }
    }
}
