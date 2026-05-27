import type Tower from "../Tower";

export interface ITowerFactory {
    createTower(): Tower;
    createTowerTexture(): HTMLImageElement;
}
