import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span, div, input, button } from '../../components/HTMLComponents';
import CarBlock from '../../components/car-block/CarBlock';

// import View from '../../viewTemp/View';

import { CarData } from '../../../types/interfaces';
import { FormAttribute } from '../../../types/enums';
import Model from '../../model/Model';
import View from '../../view/View';
import Controller from '../../controller/Controller';

import styles from './Garage.module.scss';
import carsBlockStyles from '../../components/car-block/CarBlock.module.scss';

// <div class="generate-cars">
//   <div class="field-create">
//     <input class="generate-input_text text-create" type="text" autocomplete placeholder="Enter name сar...">
//     <input class="generate-input_color color-create" type="color">
//     <button class="buttons btn-create">create</button>
//   </div>
//   <div class="field-update">
//     <input class="generate-input_text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
//     <input class="generate-input_color color-update" type="color" disabled="true">
//     <button class="buttons btn-update" disabled="true">update</button>
//   </div>
//   <div class="field-control">
//     <button class="buttons btn-race">race</button>
//     <button class="buttons btn-reset" disabled>reset</button>
//     <button class="buttons btn-generate_cars">generate cars</button>
//   </div>
// </div>

export default class Garage extends BaseComponent {
  private pageNumber: number = 1;

  private totalCarsElement = span(['total-cars'], '');

  private carsWrapper = div([styles['cars-wrapper'], 'test-car-wrapper']);

  private createCarInputText = input(
    [styles['input-text']],
    'create-car-text',
    'create-car=text',
    'text',
    'Enter Car Name',
  );

  private createCarInputColor = input(['input-color'], 'create-car-color', 'create-car-color', 'color');

  private updateCarInputText = input(
    [styles['input-text']],
    'update-car-text',
    'update-car=text',
    'text',
    'Enter New Car Name',
  );

  private updateCarInputColor = input(['input-color'], 'update-car-color', 'update-car-color', 'color');

  private updateButton = button(['btn', styles.button], 'Update Car');

  private updatedID: number = 0;

  private model: Model = new Model();

  private view: View = new View();

  private controller: Controller = new Controller();

  constructor() {
    super({
      tag: 'div',
      classNames: ['garage', 'page'],
    });

    this.setContent();
    this.addListener('click', this.handleCarOptionsClick);
  }

  private setContent() {
    const title = h1([styles.title], 'Garage  ');
    this.totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
    title.append(this.totalCarsElement);

    const pageNumberTitle = h2(['page-number-title'], 'Page ');
    const pageNumberCount = span(['page-number-count'], `#${this.pageNumber}`);
    pageNumberTitle.append(pageNumberCount);

    const generateCarsBlock = this.setGenerateCarBlock();

    this.appendChildren([generateCarsBlock, title, pageNumberTitle, this.carsWrapper]);

    this.model.getAllCars(this.pageNumber);
    this.renderCars();
  }

  private setGenerateCarBlock() {
    const generateCarBlockWrapper = div([styles['generate-wrapper']]);
    const controlCarBlockWrapper = div(['control-wrapper']);

    // create block
    const createCarBlockWrapper = div([styles['create-wrapper']]);
    const createButton = button(['btn', styles.button], 'Create Car', this.handleCreateButtonClick);

    createCarBlockWrapper.appendChildren([this.createCarInputText, this.createCarInputColor, createButton]);

    // update block
    const updateCarBlockWrapper = div([styles['update-wrapper']]);
    this.updateCarInputText.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateCarInputColor.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateButton.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateButton.addListener('click', this.handleUpdateButton);

    updateCarBlockWrapper.appendChildren([this.updateCarInputText, this.updateCarInputColor, this.updateButton]);

    generateCarBlockWrapper.appendChildren([createCarBlockWrapper, updateCarBlockWrapper, controlCarBlockWrapper]);

    return generateCarBlockWrapper;
  }

  private renderCars() {
    this.model
      .getAllCars(this.pageNumber)
      .then((cars: CarData[]) => {
        this.carsWrapper.destroyChildren();

        cars.forEach((car) => {
          const carProps: CarData = {
            id: car.id,
            name: car.name,
            color: car.color,
          };
          const carBlock = new CarBlock(carProps);

          this.carsWrapper.append(carBlock);
        });

        this.totalCarsElement.setTextContent(`(${this.model.totalCarsValue})`);
      })
      .catch((error: Error) => {
        console.error('Error occurred while rendering cars on the page:', error);
        throw error;
      });
  }

  private handleCarOptionsClick = (event: Event) => {
    const currentButton = event.target as HTMLButtonElement;

    if (currentButton.classList.contains('remove') && currentButton.closest(`.${carsBlockStyles['car-options']}`)) {
      const currentID = currentButton.dataset.remove;
      // this.model
      //   .deleteCar(Number(currentID))
      //   .then(() => this.renderCars())
      //   .catch((error) => {
      //     console.error('Error occurred while deleting the car:', error);
      //     throw error;
      //   });

      this.controller.handleDeleteButton(Number(currentID), this.carsWrapper, this.pageNumber);
    }

    if (currentButton.classList.contains('update') && currentButton.closest(`.${carsBlockStyles['car-options']}`)) {
      const currentID = currentButton.dataset.update;
      this.updatedID = Number(currentID);

      this.model.getCar(Number(currentID)).then((car: CarData) => {
        (this.updateCarInputText.getNode() as HTMLInputElement).value = car.name;
        (this.updateCarInputColor.getNode() as HTMLInputElement).value = car.color;
      });

      this.updateCarInputText.removeAttribute(FormAttribute.DISABLED);
      this.updateCarInputColor.removeAttribute(FormAttribute.DISABLED);
      this.updateButton.removeAttribute(FormAttribute.DISABLED);
    }
  };

  private handleCreateButtonClick = () => {
    const newName = (this.createCarInputText.getNode() as HTMLInputElement).value;
    const newColor = (this.createCarInputColor.getNode() as HTMLInputElement).value;

    if (!newName) return;

    const carsBody: CarData = {
      name: newName,
      color: newColor,
      id: this.model.totalCarsValue + 1,
    };

    this.model
      .addCar(carsBody)
      .then(() => this.renderCars())
      .catch((error: Error) => {
        console.error('Error occurred while creating the car:', error);
        throw error;
      });

    // this.controller.handleCreateButton(carsBody, this.carsWrapper, this.pageNumber);

    (this.createCarInputText.getNode() as HTMLInputElement).value = '';
    (this.createCarInputColor.getNode() as HTMLInputElement).value = '#000000';
  };

  private handleUpdateButton = () => {
    const updatedName = (this.updateCarInputText.getNode() as HTMLInputElement).value;
    const updatedColor = (this.updateCarInputColor.getNode() as HTMLInputElement).value;

    this.model
      .updateCar({ name: updatedName, color: updatedColor, id: this.updatedID })
      .then(() => this.renderCars())
      .catch((error) => {
        console.error('Error occurred while updating the car:', error);
        throw error;
      })
      .finally(() => {
        this.updateButton.setAttribute(FormAttribute.DISABLED, 'true');
        this.updateCarInputText.setAttribute(FormAttribute.DISABLED, 'true');
        this.updateCarInputColor.setAttribute(FormAttribute.DISABLED, 'true');
        (this.updateCarInputText.getNode() as HTMLInputElement).value = '';
        (this.updateCarInputColor.getNode() as HTMLInputElement).value = '#000000';
      });
  };
}
