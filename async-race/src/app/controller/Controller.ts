import Model from '../model/Model';
import View from '../view/View';

import BaseComponent from '../components/BaseComponent';
import { CarData, AnimatedCarData, WinnerData } from '../../types/interfaces';
import animateCar from '../../utilities/animateCar';

import { FormAttribute } from '../../types/enums';
import assertIsDefined from '../../utilities/assertIsDefined';

interface SuccessPromise {
  time: number;
  id: number;
}

// interface BrokenEnginePromise {
//   success: boolean;
// }

// type PromiseResult = SuccessPromise | BrokenEnginePromise;

export default class Controller {
  private model: Model = new Model();

  private view: View = new View();

  private animatedCars: { [id: number]: AnimatedCarData } = {};

  private winnerCar: SuccessPromise | null = null;

  private winsCount: number = 1;

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

  public async handleRenderCars(parent: BaseComponent, pageNumber: number, totalCarsElement: BaseComponent) {
    const cars = await this.model.getAllCars(pageNumber);
    View.renderCars(cars, parent, this.handleStartCar, this.handleStopCar);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
  }

  public async handleRenderWinners(parent: HTMLElement, pageNumber: number, totalWinnersElement: BaseComponent) {
    const winners = await this.model.getWinners(pageNumber);

    this.view.renderWinners(winners, parent);
    totalWinnersElement?.setTextContent(`(${this.model.totalWinnersValue})`);
  }

  public handleStartCar = async (id: number) => {
    const parentElement = <HTMLElement>document.querySelector('.car-wrapper-js');
    const car = <HTMLElement>document.querySelector(`[data-car="${id}"]`);
    const fieldWidth = parentElement.clientWidth;
    const carLeftPosition = car.offsetLeft - parentElement.offsetLeft;
    const carWidth = car.offsetWidth;
    const animationDistance = fieldWidth - (carLeftPosition + carWidth);
    const winnerMessageElem = document.querySelector('.winner-message-js');
    assertIsDefined(winnerMessageElem);
    // let winsCount = 1;

    try {
      const distanceData = await this.model.startEngine(id);
      const velocity = Number(distanceData.velocity);
      const distance = Number(distanceData.distance);
      const time = distance / velocity;

      this.animatedCars[id] = animateCar(car, animationDistance, time);

      const driveData = await this.model.driveEngine(id);

      if (!driveData.success) {
        window.cancelAnimationFrame(this.animatedCars[id].id);
        // return driveData;
      } else if (this.winnerCar === null) {
        let winnerTime = (time / 1000).toFixed(2);
        const winnerCar = await this.model.getCar(id);
        const carName = winnerCar.name;

        this.winnerCar = { time, id };
        winnerMessageElem.textContent = `${carName} wins the race for ${winnerTime} seconds`;
        const pastWinner = await this.model.getWinner(id);

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
          console.log('update winner works');
          this.model.updateWinner(winnerProps);
        } else {
          console.log('add winner works');
          await this.model.addWinner(winnerProps);
        }

        setTimeout(() => {
          winnerMessageElem.textContent = '';
        }, 4000);
        console.log(`${carName} wins the race for ${winnerTime} seconds`);
      }

      //   return {
      //     time,
      //     id,
      //   };
    } catch (error) {
      console.error('Error starting car:', error);
      //   return false;
    }
  };

  private handleStopCar = async (id: number) => {
    try {
      await this.model.stopEngine(Number(id));
      window.cancelAnimationFrame(this.animatedCars[id].id);
      const car = <HTMLElement>document.querySelector(`[data-car="${id}"]`);
      car.style.transform = 'translateX(0px)';
    } catch (error) {
      console.error('Error stopping car:', error);
    }
  };

  public handleStartRace = async (page: number) => {
    const startBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');
    startBtn?.setAttribute(FormAttribute.DISABLED, 'true');
    const cars = await this.model.getAllCars(page);
    //   cars.forEach((car) => this.handleStartCar(Number(car.id)));
    const promises = cars.map((car) => this.handleStartCar(Number(car.id)));

    try {
      await Promise.all(promises);
      resetBtn?.removeAttribute(FormAttribute.DISABLED);
    } catch (error) {
      console.error('Error while racing:', error);
    }
  };

  public handleStopRace = async (page: number) => {
    const startBtn = document.querySelector('.btn-race');
    const resetBtn = document.querySelector('.btn-reset');
    const cars = await this.model.getAllCars(page);

    cars.forEach((car) => {
      this.handleStopCar(Number(car.id));
    });
    this.winnerCar = null;
    startBtn?.removeAttribute(FormAttribute.DISABLED);
    resetBtn?.setAttribute(FormAttribute.DISABLED, 'true');

    // resultRace = [];
    // noticeWinner.innerHTML = '';
  };
}
