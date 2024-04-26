import Model from '../model/Model';
import View from '../view/View';

import BaseComponent from '../components/BaseComponent';

import { CarData, AnimatedCarData, WinnerData } from '../../types/interfaces';
import { FormAttribute } from '../../types/enums';

import animateCar from '../../utilities/animateCar';
import assertIsDefined from '../../utilities/assertIsDefined';
import { sortByAscending, sortByDescending } from '../../utilities/utils';

interface SuccessPromise {
  time: number;
  id: number;
}
export default class Controller {
  private model: Model = new Model();

  private view: View = new View();

  private animatedCars: { [id: number]: AnimatedCarData } = {};

  private winnerCar: SuccessPromise | null = null;

  private winsCount: number = 1;

  private isRace: boolean = false;

  public async handleDeleteButton(id: number, parent: BaseComponent, pageNumber: number): Promise<void> {
    const totalCarsElement = document.querySelector('.total-cars') as HTMLElement;

    await this.model.deleteCar(id);

    const cars = await this.model.getAllCars(pageNumber);

    View.renderCars(cars, parent, this.handleStartCar, this.handleStopCar);

    if (totalCarsElement) {
      totalCarsElement.textContent = `(${this.model.totalCarsValue})`;
    }
  }

  public async handleCreateButton(
    carsProps: CarData,
    parent: BaseComponent,
    pageNumber: number,
    totalCarsElement: BaseComponent,
  ): Promise<void> {
    await this.model.addCar(carsProps);

    const cars = await this.model.getAllCars(pageNumber);

    View.renderCars(cars, parent, this.handleStartCar, this.handleStopCar);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
  }

  public async handleUpdateButton(
    carsProps: CarData,
    parent: BaseComponent,
    pageNumber: number,
    totalCarsElement: BaseComponent,
  ): Promise<void> {
    await this.model.updateCar(carsProps);

    const cars = await this.model.getAllCars(pageNumber);

    View.renderCars(cars, parent, this.handleStartCar, this.handleStopCar);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
  }

  public async handleRenderCars(
    parent: BaseComponent,
    pageNumber: number,
    totalCarsElement: BaseComponent,
  ): Promise<void> {
    const cars = await this.model.getAllCars(pageNumber);

    View.renderCars(cars, parent, this.handleStartCar, this.handleStopCar);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
  }

  public async handleRenderWinners(
    parent: HTMLElement,
    pageNumber: number,
    totalWinnersElement: BaseComponent,
  ): Promise<void> {
    const winners = await this.model.getWinners(pageNumber);

    this.view.renderWinners(winners, parent);
    totalWinnersElement?.setTextContent(`(${this.model.totalWinnersValue})`);
  }

  public handleStartCar = async (id: number): Promise<void> => {
    const parentElement = <HTMLElement>document.querySelector('.car-wrapper-js');
    const car = <HTMLElement>document.querySelector(`[data-car="${id}"]`);
    const fieldWidth = parentElement.clientWidth;
    const carLeftPosition = car.offsetLeft - parentElement.offsetLeft;
    const carWidth = car.offsetWidth;
    const animationDistance = fieldWidth - (carLeftPosition + carWidth);
    const winnerMessageElem = document.querySelector('.winner-message-js');

    assertIsDefined(winnerMessageElem);

    try {
      const distanceData = await this.model.startEngine(id);
      const velocity = Number(distanceData.velocity);
      const distance = Number(distanceData.distance);
      const time = distance / velocity;

      this.animatedCars[id] = animateCar(car, animationDistance, time);

      const driveData = await this.model.driveEngine(id);

      if (!driveData.success) {
        window.cancelAnimationFrame(this.animatedCars[id].id);
      } else if (this.winnerCar === null && this.isRace) {
        const winnerCar = await this.model.getCar(id);
        const carName = winnerCar.name;
        const pastWinner = await this.model.getWinner(id);
        let winnerTime = Number((time / 1000).toFixed(2));

        this.winnerCar = { time, id };
        winnerMessageElem.textContent = `${carName} wins the race for ${winnerTime} seconds`;

        if (Object.keys(pastWinner).length !== 0) {
          this.winsCount = pastWinner.wins;
          this.winsCount += 1;
        }

        if (pastWinner.time < winnerTime) {
          winnerTime = pastWinner.time;
        }

        const winnerProps: WinnerData = {
          id,
          time: Number(winnerTime),
          wins: this.winsCount,
          name: winnerCar.name,
          color: winnerCar.color,
        };

        if (this.winsCount > 1) {
          await this.model.updateWinner(winnerProps);
        } else {
          await this.model.addWinner(winnerProps);
        }

        setTimeout(() => {
          winnerMessageElem.textContent = '';
        }, 4000);
        console.log(`${carName} wins the race for ${winnerTime} seconds`);

        this.isRace = false;
      }
    } catch (error) {
      console.error('Error starting car:', error);
    }
  };

  private handleStopCar = async (id: number): Promise<void> => {
    try {
      await this.model.stopEngine(Number(id));
      if (this.animatedCars[id]) {
        const car = <HTMLElement>document.querySelector(`[data-car="${id}"]`);

        window.cancelAnimationFrame(this.animatedCars[id].id);
        car.style.transform = 'translateX(0px)';
      }
    } catch (error) {
      console.error('Error stopping car:', error);
    }
  };

  public handleStartRace = async (page: number): Promise<void> => {
    const disabledBtns = document.querySelectorAll('.car-wrapper-js button');
    const startBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');

    disabledBtns.forEach((btn) => btn.setAttribute(FormAttribute.DISABLED, 'true'));
    startBtn?.setAttribute(FormAttribute.DISABLED, 'true');

    this.isRace = true;

    const cars = await this.model.getAllCars(page);
    const promises = cars.map((car) => this.handleStartCar(Number(car.id)));

    try {
      await Promise.all(promises);
      resetBtn?.removeAttribute(FormAttribute.DISABLED);
    } catch (error) {
      console.error('Error while racing:', error);
    }
  };

  public handleStopRace = async (page: number): Promise<void> => {
    const disabledBtns = document.querySelectorAll('.car-wrapper-js button');
    const startBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');
    const cars = await this.model.getAllCars(page);

    disabledBtns.forEach((btn) => btn.removeAttribute(FormAttribute.DISABLED));

    cars.forEach((car) => {
      this.handleStopCar(Number(car.id));
    });
    this.winnerCar = null;
    startBtn?.removeAttribute(FormAttribute.DISABLED);
    resetBtn?.setAttribute(FormAttribute.DISABLED, 'true');
  };

  public handleSortWinners = async (order: boolean, parent: HTMLElement, keyValue: keyof WinnerData): Promise<void> => {
    const winners = await this.model.getAllWinners();
    let sortedWinners: WinnerData[];

    if (order) {
      sortedWinners = sortByAscending(winners, keyValue);
      this.view.renderWinners(sortedWinners, parent);
    } else {
      sortedWinners = sortByDescending(winners, keyValue);
      this.view.renderWinners(sortedWinners, parent);
    }
  };
}
