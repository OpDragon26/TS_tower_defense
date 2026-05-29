import Rectangle from "./Engine/Entities/Standard/Rectangle";
import Game from "./Engine/General/Game";
import { MoneyTowerFactory } from "./Tower/MoneyTower";
import type { TowerFactory } from "./Tower/TowerFactory/TowerFactory";

export class TowerDefense extends Game<TowerDefense> {
  public money: number = 100;

  public towerFactories: Record<string, TowerFactory> = {
    moneyTower: new MoneyTowerFactory(this),
  };
}
