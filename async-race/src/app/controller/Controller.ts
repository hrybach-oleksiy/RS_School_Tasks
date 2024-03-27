import Model from '../model/Model';
import View from '../view/View';

import BaseComponent from '../components/BaseComponent';
import { CarData } from '../../types/interfaces';

export default class Controller {
  private model: Model = new Model();

  private view: View = new View();

  public async handleDeleteButton(id: number, parent: BaseComponent, pageNumber: number): Promise<void> {
    const totalCarsElement = document.querySelector('.total-cars') as HTMLElement;

    await this.model.deleteCar(id);
    const cars = await this.model.getAllCars(pageNumber);
    View.renderCars(cars, parent);

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
    View.renderCars(cars, parent);
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
    View.renderCars(cars, parent);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
  }

  public async handleRenderCars(parent: BaseComponent, pageNumber: number, totalCarsElement: BaseComponent) {
    const cars = await this.model.getAllCars(pageNumber);
    View.renderCars(cars, parent);
    console.log(this.model.totalCarsValue);
    totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
    console.log(this.model.totalCarsValue);
  }

  // public async handleGenerateButton() {}
}
