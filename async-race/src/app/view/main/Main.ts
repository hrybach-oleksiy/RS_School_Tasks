import BaseComponent from '../../components/BaseComponent';

import Garage from '../../pages/garage/Garage';
import Winners from '../../pages/winners/Winners';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      classNames: [styles.main],
    });
    this.setPage();
  }

  private setPage(): void {
    this.destroyChildren();

    const garageBlock = new Garage();
    const winnersBlock = new Winners();

    winnersBlock.addClass('hidden');

    this.appendChildren([garageBlock, winnersBlock]);
  }
}
