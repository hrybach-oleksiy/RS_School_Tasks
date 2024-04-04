import Controller from '../../controller/Controller';

import BaseComponent from '../BaseComponent';

import styles from './WinnersTable.module.scss';

export default class WinnersTable extends BaseComponent {
  private controller: Controller = new Controller();

  private isWinsAscending: boolean = false;

  private isTimeAscending: boolean = false;

  private tableContainer: BaseComponent = new BaseComponent({ tag: 'tbody', classNames: ['table-container'] });

  private winsElement = new BaseComponent({ tag: 'th', text: 'Wins', classNames: [styles.wins] });

  private timeElement = new BaseComponent({ tag: 'th', text: 'Best Time', classNames: [styles.time] });

  constructor() {
    super({
      tag: 'table',
      classNames: [styles['winners-table']],
    });

    this.setContent();
  }

  private setContent(): void {
    const theadElement = new BaseComponent({ tag: 'thead' });
    const trElement = new BaseComponent({ tag: 'tr' });
    const numberElement = new BaseComponent({ tag: 'th', text: '#' });
    const carElement = new BaseComponent({ tag: 'th', text: 'Car' });
    const nameElement = new BaseComponent({ tag: 'th', text: 'Name' });

    this.winsElement.addListener('click', this.handleWinsClick);
    this.timeElement.addListener('click', this.handleTimeClick);

    trElement.appendChildren([numberElement, carElement, nameElement, this.winsElement, this.timeElement]);
    theadElement.append(trElement);

    this.appendChildren([theadElement, this.tableContainer]);
  }

  private handleWinsClick = async (): Promise<void> => {
    this.timeElement.removeClass(styles.asc);
    this.winsElement.addClass(styles.asc);

    if (this.isWinsAscending) {
      await this.controller.handleSortWinners(this.isWinsAscending, this.tableContainer.getNode(), 'wins');
      this.winsElement.addClass(styles.clicked);
      this.isWinsAscending = false;
    } else {
      await this.controller.handleSortWinners(this.isWinsAscending, this.tableContainer.getNode(), 'wins');
      this.winsElement.removeClass(styles.clicked);
      this.isWinsAscending = true;
    }
  };

  private handleTimeClick = async (): Promise<void> => {
    this.winsElement.removeClass(styles.asc);
    this.timeElement.addClass(styles.asc);

    if (this.isTimeAscending) {
      await this.controller.handleSortWinners(this.isTimeAscending, this.tableContainer.getNode(), 'time');
      this.timeElement.addClass(styles.clicked);
      this.isTimeAscending = false;
    } else {
      await this.controller.handleSortWinners(this.isTimeAscending, this.tableContainer.getNode(), 'time');
      this.timeElement.removeClass(styles.clicked);
      this.isTimeAscending = true;
    }
  };
}
