import BaseComponent from '../BaseComponent';

// import { div, button, h3 } from '../HTMLComponents';
import createCarImage from '../../../utilities/cerateCarImage';
import { WinnerData } from '../../../types/interfaces';
// import styles from './CarBlock.module.scss';

export default class WinnerBlock extends BaseComponent {
  private winnerProps: WinnerData;

  constructor(winnerProps: WinnerData) {
    super({
      tag: 'tr',
      classNames: ['winner-row'],
    });

    this.winnerProps = winnerProps;
    this.setBlock();
  }

  private setBlock() {
    const { time, wins, name, color, winnerNumber } = this.winnerProps;

    const numberCol = new BaseComponent({ tag: 'td', classNames: ['col'], text: String(winnerNumber) });
    const carCol = new BaseComponent({ tag: 'td', classNames: ['col'] });
    const nameCol = new BaseComponent({ tag: 'td', classNames: ['col'], text: name });
    const timeCol = new BaseComponent({ tag: 'td', classNames: ['col'], text: String(time) });
    const winsCol = new BaseComponent({ tag: 'td', classNames: ['col'], text: String(wins) });

    carCol.getNode().insertAdjacentHTML('beforeend', createCarImage(color));

    this.appendChildren([numberCol, carCol, nameCol, winsCol, timeCol]);
  }
}
