import { CarData, WinnerData } from '../../types/interfaces';
import BaseComponent from '../components/BaseComponent';

import CarBlock from '../components/car-block/CarBlock';
import WinnerBlock from '../components/winner-block/WinnerBlock';

import Model from '../model/Model';

export default class View {
  private model: Model = new Model();

  static renderCars(
    cars: CarData[],
    parent: BaseComponent,
    startRaceHandler: (id: number) => void,
    stopRaceHandler: (id: number) => void,
  ) {
    parent.destroyChildren();

    cars.forEach((car) => {
      const carProps: CarData = {
        id: car.id,
        name: car.name,
        color: car.color,
      };
      const carBlock = new CarBlock(carProps, startRaceHandler, stopRaceHandler);

      if (parent) {
        parent.append(carBlock);
      }
    });
  }

  public renderWinners(winners: WinnerData[], parent: HTMLElement) {
    const pageNumberCountElem = document.querySelector('.winners .page-number-count');
    const pageNumberCount = pageNumberCountElem?.textContent?.slice(1);
    const parentElem = parent;
    let winnerNumber = Number(pageNumberCount) * 10 - 10;
    parentElem.innerHTML = '';
    winners.forEach(async (winner) => {
      const winnerCar = await this.model.getCar(winner.id);
      winnerNumber += 1;
      const winnerProps: WinnerData = {
        id: winner.id,
        winnerNumber,
        wins: winner.wins,
        time: winner.time,
        name: winnerCar.name,
        color: winnerCar.color,
      };
      const winnerBlock = new WinnerBlock(winnerProps);
      parentElem.append(winnerBlock.getNode());
    });
  }
}
