import { CarData } from '../../types/interfaces';
import BaseComponent from '../components/BaseComponent';

import CarBlock from '../components/car-block/CarBlock';

export default class View {
  static renderCars(cars: CarData[], parent: BaseComponent) {
    parent.destroyChildren();

    cars.forEach((car) => {
      const carProps: CarData = {
        id: car.id,
        name: car.name,
        color: car.color,
      };
      const carBlock = new CarBlock(carProps);

      if (parent) {
        parent.append(carBlock);
      }
    });
  }
}
