import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span, div } from '../../components/HTMLComponents';
import WinnersTable from '../../components/winners-table/WinnersTable';

import assertIsDefined from '../../../utilities/assertIsDefined';

import Controller from '../../controller/Controller';

import styles from './Winners.module.scss';

export default class Winners extends BaseComponent {
  private controller: Controller = new Controller();

  private pageNumber: number = 1;

  private winnersWrapper = div([styles['winners-wrapper']]);

  private totalWinnersElement = span(['total-winners'], ``);

  private pageNumberCountElement = span(['page-number-count'], `#${this.pageNumber}`);

  private winnersTable: WinnersTable = new WinnersTable();

  constructor() {
    super({
      tag: 'div',
      classNames: ['winners', 'page'],
    });

    this.setContent();
    document.addEventListener('click', (event: Event) => {
      this.handleWinnersPageClick(event);
    });
  }

  private setContent() {
    const title = h1([styles.title], 'Winners  ');
    const pageNumberTitle = h2(['page-number-title'], 'Page ');

    title.append(this.totalWinnersElement);
    pageNumberTitle.append(this.pageNumberCountElement);

    this.appendChildren([title, pageNumberTitle, this.winnersWrapper, this.winnersTable]);
  }

  private handleWinnersPageClick = (event: Event) => {
    const currentTargt = event.target as HTMLElement;

    if (currentTargt.classList.contains('winner-btn')) {
      const winnerParentElem = document.querySelector('.table-container') as HTMLElement;
      assertIsDefined(winnerParentElem);
      this.controller.handleRenderWinners(winnerParentElem, this.pageNumber, this.totalWinnersElement);
    }
  };
}
