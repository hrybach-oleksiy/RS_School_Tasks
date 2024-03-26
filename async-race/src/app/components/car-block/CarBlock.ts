// `<div class="car">
//     <div class="car-options">
//       <button class="buttons car-options_select" data-select=${id}>Select</button>
//       <button class="buttons car-options_remove" data-remove=${id}>Remove</button>
//       <h4 class="car-options_title">${name}</h4>
//     </div>
//     <div class="car-control">
//       <button class="car-control_start" id="start-${id}" data-start=${id} >Start</button>
//       <button class="car-control_stop" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
//       <div class="car-img" id="car-${id}" data-car=${id}>${createImageCarUI(color)}</div>
//       <div class="flag"></div>
//     </div>
//   </div>
// `;

import BaseComponent from '../BaseComponent';

import { div, button, h3 } from '../HTMLComponents';
import createCarImage from '../../../utilities/cerateCarImage';
import { CarData } from '../../../types/interfaces';

import styles from './CarBlock.module.scss';
// import { FormAttribute } from '../../../types/enums';

export default class CarBlock extends BaseComponent {
  private carProps: CarData;

  constructor(carProps: CarData) {
    super({
      tag: 'div',
      classNames: [styles['car-wrapper']],
    });

    this.carProps = carProps;
    this.setBlock();
  }

  private setBlock() {
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
    const startButton = button(['btn', styles.button], 'Start');
    const stopButton = button(['btn', styles.button], 'Stop');
    // const carImage = span(['car-img'], createCarImage(color));
    const imgWrapper = div([styles['img-wrapper']]);
    const finishFlag = div(['finish-flag']);

    imgWrapper.getNode().insertAdjacentHTML('beforeend', createCarImage(color));
    startButton.setAttribute('data-start', String(id));
    stopButton.setAttribute('data-stop', String(id));
    imgWrapper.setAttribute('data-car', String(id));
    carControls.appendChildren([startButton, stopButton, imgWrapper, finishFlag]);

    this.appendChildren([carOptions, carControls]);
  }
}
