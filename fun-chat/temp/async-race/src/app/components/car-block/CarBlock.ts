import BaseComponent from '../BaseComponent';
import { div, button, h3 } from '../HTMLComponents';

import createCarImage from '../../../utilities/cerateCarImage';

import { CarData } from '../../../types/interfaces';
import { FormAttribute } from '../../../types/enums';

import styles from './CarBlock.module.scss';

export default class CarBlock extends BaseComponent {
  private carProps: CarData;

  private startRaceHandler: (id: number) => void;

  private stopRaceHandler: (id: number) => void;

  private startButton = button(['btn', styles.button], 'Start', (event: Event) => {
    this.handleStartCarClick(event);
  });

  private stopButton = button(['btn', styles.button], 'Stop', (event: Event) => {
    this.handleStopCarClick(event);
  });

  constructor(carProps: CarData, startRaceHandler: (id: number) => void, stopRaceHandler: (id: number) => void) {
    super({
      tag: 'div',
      classNames: [styles['car-wrapper'], 'car-wrapper-js'],
    });

    this.carProps = carProps;
    this.startRaceHandler = startRaceHandler;
    this.stopRaceHandler = stopRaceHandler;
    this.setBlock();
  }

  private setBlock(): void {
    const { id, name, color } = this.carProps;

    // car options
    const carOptions = div([styles['car-options']]);
    const updateButton = button(['btn', styles.button, 'update'], 'Update Car');
    const removeButton = button(['btn', styles.button, 'remove'], 'Remove Car');
    const carTitle = h3([styles['car-title']], name);

    updateButton.setAttribute('data-update', String(id));
    removeButton.setAttribute('data-remove', String(id));
    carOptions.appendChildren([updateButton, removeButton, carTitle]);

    // car controls
    const carControls = div([styles['car-controls']]);
    const imgWrapper = div([styles['img-wrapper']]);
    const finishFlag = div([styles['finish-flag']]);

    this.stopButton.setAttribute(FormAttribute.DISABLED, 'true');

    imgWrapper.getNode().insertAdjacentHTML('beforeend', createCarImage(color));
    this.startButton.setAttribute('data-start', String(id));
    this.stopButton.setAttribute('data-stop', String(id));
    imgWrapper.setAttribute('data-car', String(id));
    carControls.appendChildren([this.startButton, this.stopButton, imgWrapper, finishFlag]);

    this.appendChildren([carOptions, carControls]);
  }

  private handleStartCarClick = async (event: Event): Promise<void> => {
    const currentCar = event.target as HTMLButtonElement;
    const currentCarID = Number(currentCar.dataset.start);

    this.startButton.setAttribute(FormAttribute.DISABLED, 'true');
    this.stopButton.removeAttribute(FormAttribute.DISABLED);

    this.startRaceHandler(currentCarID);
  };

  private handleStopCarClick = async (event: Event): Promise<void> => {
    const currentCar = event.target as HTMLButtonElement;
    const currentCarID = Number(currentCar.dataset.stop);

    this.stopButton.setAttribute(FormAttribute.DISABLED, 'true');
    this.startButton.removeAttribute(FormAttribute.DISABLED);

    this.stopRaceHandler(currentCarID);
  };
}
