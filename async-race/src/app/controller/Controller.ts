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

  public async handleCreateButton(body: CarData, parent: BaseComponent, pageNumber: number): Promise<void> {
    const totalCarsElement = document.querySelector('.total-cars') as HTMLElement;

    await this.model.addCar(body);
    const cars = await this.model.getAllCars(pageNumber);
    View.renderCars(cars, parent);

    if (totalCarsElement) {
      totalCarsElement.textContent = `(${this.model.totalCarsValue})`;
    }
  }
}
