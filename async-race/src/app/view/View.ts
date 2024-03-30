import { CarData } from '../../types/interfaces';
import BaseComponent from '../components/BaseComponent';

import CarBlock from '../components/car-block/CarBlock';

export default class View {
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
}
