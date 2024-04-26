import Model from '../../model/Model';
import Controller from '../../controller/Controller';

import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span, div, input, button } from '../../components/HTMLComponents';
import Pagination from '../../components/pagination/Pagination';
import getRandomName from '../../../utilities/getRandomName';
import getRandomColor from '../../../utilities/getRandomColor';

import { CarData } from '../../../types/interfaces';
import { FormAttribute } from '../../../types/enums';

import styles from './Garage.module.scss';
import carsBlockStyles from '../../components/car-block/CarBlock.module.scss';

export default class Garage extends BaseComponent {
  private controller: Controller = new Controller();

  private model: Model = new Model();

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

  private pageNumberCountElement = span(['page-number-count'], `#${this.pageNumber}`);

  private updatedID: number = 0;

  private carPerPage = 7;

  constructor() {
    super({
      tag: 'div',
      classNames: [styles.garage, 'page'],
    });

    this.init();
    this.addListener('click', this.handleCarOptionsClick);
  }

  private async init(): Promise<void> {
    await this.model.updateTotalCarsValue();
    await this.controller.handleRenderCars(this.carsWrapper, this.pageNumber, this.totalCarsElement);
    this.setContent();
  }

  private setContent(): void {
    const title = h1([styles.title], 'Garage  ');
    title.append(this.totalCarsElement);

    const pageNumberTitle = h2(['page-number-title'], 'Page ');
    pageNumberTitle.append(this.pageNumberCountElement);

    const generateCarsBlock = this.setGenerateCarBlock();
    const isNextBtnActive = this.model.totalCarsValue > this.pageNumber * this.carPerPage;
    const paginationBlock = new Pagination(this.handlePrevButtonClick, this.handleNextButtonClick, isNextBtnActive);
    const winnerMessageBlock = div([styles['winner-message'], 'winner-message-js']);

    this.appendChildren([
      generateCarsBlock,
      title,
      pageNumberTitle,
      this.carsWrapper,
      paginationBlock,
      winnerMessageBlock,
    ]);
  }

  private setGenerateCarBlock(): BaseComponent {
    const generateCarBlockWrapper = div([styles['generate-wrapper']]);

    // create block
    const createCarBlockWrapper = div([styles['create-wrapper']]);
    const createButton = button(['btn', styles.button], 'Create Car', this.handleCreateButtonClick);

    createCarBlockWrapper.appendChildren([this.createCarInputText, this.createCarInputColor, createButton]);

    // update block
    const updateCarBlockWrapper = div([styles['update-wrapper']]);
    this.updateCarInputText.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateCarInputColor.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateButton.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateButton.addListener('click', this.handleUpdateButtonClick);

    updateCarBlockWrapper.appendChildren([this.updateCarInputText, this.updateCarInputColor, this.updateButton]);

    // controls block
    const controlCarBlockWrapper = div([styles['controls-wrapper']]);
    const raceButton = button(['btn', styles.button, 'btn-race'], 'Start Race', this.handleRaceButtonClick);
    const resetButton = button(['btn', styles.button, 'btn-reset'], 'Reset Race', this.handleResetButtonClick);
    const generateButton = button(['btn', styles.button], 'Generate Cars', this.handleGenerateButtonClick);

    resetButton.setAttribute(FormAttribute.DISABLED, 'true');

    controlCarBlockWrapper.appendChildren([raceButton, resetButton, generateButton]);

    generateCarBlockWrapper.appendChildren([createCarBlockWrapper, updateCarBlockWrapper, controlCarBlockWrapper]);

    return generateCarBlockWrapper;
  }

  private handleCarOptionsClick = async (event: Event): Promise<void> => {
    const currentButton = event.target as HTMLButtonElement;

    if (currentButton.classList.contains('remove') && currentButton.closest(`.${carsBlockStyles['car-options']}`)) {
      const currentID = currentButton.dataset.remove;

      await this.controller.handleDeleteButton(Number(currentID), this.carsWrapper, this.pageNumber);
      await this.model.deleteWinner(Number(currentID));
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

  private handleCreateButtonClick = async (): Promise<void> => {
    const newName = (this.createCarInputText.getNode() as HTMLInputElement).value;
    const newColor = (this.createCarInputColor.getNode() as HTMLInputElement).value;

    if (!newName) return;

    const carsProps: CarData = {
      name: newName,
      color: newColor,
    };

    await this.model.updateTotalCarsValue();
    await this.controller.handleCreateButton(carsProps, this.carsWrapper, this.pageNumber, this.totalCarsElement);

    if (this.model.totalCarsValue >= this.pageNumber * this.carPerPage) {
      const nextBtn = document.querySelector('.nextBtn');
      nextBtn?.removeAttribute(FormAttribute.DISABLED);
    }

    (this.createCarInputText.getNode() as HTMLInputElement).value = '';
    (this.createCarInputColor.getNode() as HTMLInputElement).value = '#000000';
  };

  private handleUpdateButtonClick = (): void => {
    const updatedName = (this.updateCarInputText.getNode() as HTMLInputElement).value;
    const updatedColor = (this.updateCarInputColor.getNode() as HTMLInputElement).value;

    const carsProps: CarData = {
      name: updatedName,
      color: updatedColor,
      id: this.updatedID,
    };

    this.controller.handleUpdateButton(carsProps, this.carsWrapper, this.pageNumber, this.totalCarsElement);

    this.updateButton.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateCarInputText.setAttribute(FormAttribute.DISABLED, 'true');
    this.updateCarInputColor.setAttribute(FormAttribute.DISABLED, 'true');
    (this.updateCarInputText.getNode() as HTMLInputElement).value = '';
    (this.updateCarInputColor.getNode() as HTMLInputElement).value = '#000000';
  };

  private handlePrevButtonClick = async (event: Event): Promise<void> => {
    const btn = event.target as HTMLButtonElement;
    const nextBtn = document.querySelector('.nextBtn');
    nextBtn?.removeAttribute(FormAttribute.DISABLED);

    btn.removeAttribute(FormAttribute.DISABLED);
    this.pageNumber -= 1;
    this.pageNumberCountElement.setTextContent(`#${this.pageNumber}`);

    if (this.pageNumber === 1) {
      btn.setAttribute(FormAttribute.DISABLED, 'true');
    }

    await this.controller.handleRenderCars(this.carsWrapper, this.pageNumber, this.totalCarsElement);
    await this.controller.handleStopRace(this.pageNumber);
  };

  private handleNextButtonClick = async (event: Event): Promise<void> => {
    const btn = event.target as HTMLButtonElement;
    const prevBtn = document.querySelector('.prevBtn');

    await this.model.updateTotalCarsValue();

    prevBtn?.removeAttribute(FormAttribute.DISABLED);
    btn.removeAttribute(FormAttribute.DISABLED);
    this.pageNumber += 1;
    this.pageNumberCountElement.setTextContent(`#${this.pageNumber}`);

    if (this.pageNumber * this.carPerPage >= this.model.totalCarsValue) {
      btn.setAttribute(FormAttribute.DISABLED, 'true');
    }

    await this.controller.handleRenderCars(this.carsWrapper, this.pageNumber, this.totalCarsElement);
    await this.controller.handleStopRace(this.pageNumber);
  };

  private handleGenerateButtonClick = async (): Promise<void> => {
    const MAX_CARS_AMOUNT = 100;
    const btnNext = document.querySelector('.nextBtn');
    const promises = [];

    for (let i = 0; i < MAX_CARS_AMOUNT; i += 1) {
      const carProps: CarData = {
        name: getRandomName(),
        color: getRandomColor(),
      };

      promises.push(this.model.addCar(carProps));
    }
    await Promise.all(promises);
    await this.controller.handleRenderCars(this.carsWrapper, this.pageNumber, this.totalCarsElement);
    btnNext?.removeAttribute(FormAttribute.DISABLED);
  };

  private handleRaceButtonClick = (): void => {
    this.controller.handleStartRace(this.pageNumber);
  };

  private handleResetButtonClick = () => {
    this.controller.handleStopRace(this.pageNumber);
  };
}
