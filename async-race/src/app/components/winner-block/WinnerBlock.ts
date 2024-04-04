import BaseComponent from '../BaseComponent';

import createCarImage from '../../../utilities/cerateCarImage';

import { WinnerData } from '../../../types/interfaces';

import styles from './WinnerBlock.module.scss';

export default class WinnerBlock extends BaseComponent {
  private winnerProps: WinnerData;

  constructor(winnerProps: WinnerData) {
    super({
      tag: 'tr',
      classNames: [styles['winner-row']],
    });

    this.winnerProps = winnerProps;
    this.setBlock();
  }

  private setBlock(): void {
    const { time, wins, name, color, winnerNumber } = this.winnerProps;
    const numberCol = new BaseComponent({ tag: 'td', classNames: [styles.col], text: String(winnerNumber) });
    const carCol = new BaseComponent({ tag: 'td', classNames: [styles.col] });
    const nameCol = new BaseComponent({ tag: 'td', classNames: [styles.col], text: name });
    const timeCol = new BaseComponent({ tag: 'td', classNames: [styles.col], text: String(time) });
    const winsCol = new BaseComponent({ tag: 'td', classNames: [styles.col], text: String(wins) });

    carCol.getNode().insertAdjacentHTML('beforeend', createCarImage(color));

    this.appendChildren([numberCol, carCol, nameCol, winsCol, timeCol]);
  }
}
