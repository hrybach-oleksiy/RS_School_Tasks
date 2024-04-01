import BaseComponent from '../BaseComponent';

import Controller from '../../controller/Controller';

import styles from './WinnersTable.module.scss';

export default class WinnersTable extends BaseComponent {
  private controller: Controller = new Controller();

  private isWinsAscending: boolean = false;

  private isTimeAscending: boolean = false;

  private tableContainer: BaseComponent = new BaseComponent({ tag: 'tbody', classNames: ['table-container'] });

  constructor() {
    super({
      tag: 'table',
      classNames: [styles['winners-table']],
    });

    this.setContent();
  }

  private setContent() {
    const theadElement = new BaseComponent({ tag: 'thead' });
    const trElement = new BaseComponent({ tag: 'tr' });
    const numberElement = new BaseComponent({ tag: 'th', text: '#' });
    const carElement = new BaseComponent({ tag: 'th', text: 'Car' });
    const nameElement = new BaseComponent({ tag: 'th', text: 'Name' });
    const winsElement = new BaseComponent({ tag: 'th', text: 'Wins' });
    const timeElement = new BaseComponent({ tag: 'th', text: 'Best Time' });

    winsElement.addListener('click', this.handleWinsClick);
    timeElement.addListener('click', this.handleTimeClick);

    trElement.appendChildren([numberElement, carElement, nameElement, winsElement, timeElement]);
    theadElement.append(trElement);

    this.appendChildren([theadElement, this.tableContainer]);
  }

  // public setHandlers() {
  //   const winsColElement = document.querySelector('.wins-col');
  //   const timeColElement = document.querySelector('.time-col');
  //   console.log(winsColElement);
  //   console.log(timeColElement);
  //   if (winsColElement && timeColElement) {
  //     winsColElement.addEventListener('click', this.handleWinsClick);
  //     timeColElement.addEventListener('click', this.handleTimeClick);
  //   }
  // }

  private handleWinsClick = () => {
    console.log('wins method works');
    if (this.isWinsAscending) {
      // false
      this.controller.handleSortWinners(this.isWinsAscending, this.tableContainer.getNode(), 'wins');
      this.isWinsAscending = true;
    } else {
      // ascending false
      this.controller.handleSortWinners(this.isWinsAscending, this.tableContainer.getNode(), 'wins');
      this.isWinsAscending = false;
    }
  };

  private handleTimeClick = () => {
    console.log('time method works');
    if (this.isTimeAscending) {
      this.controller.handleSortWinners(this.isTimeAscending, this.tableContainer.getNode(), 'time');
      this.isTimeAscending = true;
    } else {
      this.controller.handleSortWinners(this.isTimeAscending, this.tableContainer.getNode(), 'time');
      this.isTimeAscending = false;
    }
  };
}
