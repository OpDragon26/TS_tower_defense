import Rectangle from "./Classes/Engine/Entities/Standard/Rectangle";
import Game from "./Classes/Engine/General/Game";
import RGBA from "./Classes/Engine/General/RGBA";
import "./style.css";
import { TowerDefense } from "./Classes/TowerDefense";
import { TestEnemy } from "./Classes/Enemy/TestEnemy";
import type { PathPoint } from "./Classes/Enemy/Enemy";

const game = new TowerDefense();

const path1: PathPoint[] = [
    {
        coords: [100, 100],
        speed: 100,
    },
    {
        coords: [1000, 0],
        speed: 50,
    },
    {
        coords: [300, 100],
        speed: 20,
    },
    {
        coords: [100, 100],
        speed: 200,
    },
];

game.entities.add(
    new TestEnemy(
        game,
        path1,
        document.querySelector("#perfect-test-image"),
        true,
    ),
);

setTimeout(() => {
    game.entities.add(
        new TestEnemy(
            game,
            path1,
            document.querySelector("#perfect-test-image"),
            false,
        ),
    );
}, 2000);

game.start();
