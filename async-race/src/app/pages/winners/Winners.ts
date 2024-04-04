import Controller from '../../controller/Controller';
import Model from '../../model/Model';

import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span, div } from '../../components/HTMLComponents';
import WinnersTable from '../../components/winners-table/WinnersTable';
import Pagination from '../../components/pagination/Pagination';

import { FormAttribute } from '../../../types/enums';
import assertIsDefined from '../../../utilities/assertIsDefined';

import styles from './Winners.module.scss';

export default class Winners extends BaseComponent {
  private controller: Controller = new Controller();

  private model: Model = new Model();

  private pageNumber: number = 1;

  private winnersWrapper = div([styles['winners-wrapper']]);

  private totalWinnersElement = span(['total-winners'], ``);

  private pageNumberCountElement = span(['page-number-count'], `#${this.pageNumber}`);

  private carPerPage = 10;

  constructor() {
    super({
      tag: 'div',
      classNames: ['winners', 'page'],
    });

    this.init();

    document.addEventListener('click', (event: Event) => {
      this.handleWinnersPageClick(event);
    });
  }

  private async init(): Promise<void> {
    await this.model.updateTotalWinnersValue();
    this.setContent();
  }

  private setContent(): void {
    const title = h1([styles.title], 'Winners  ');
    const pageNumberTitle = h2(['page-number-title'], 'Page ');
    const isNextBtnActive = this.model.totalWinnersValue > this.pageNumber * this.carPerPage;
    const paginationBlock = new Pagination(this.handlePrevButtonClick, this.handleNextButtonClick, isNextBtnActive);
    const winnersTable = new WinnersTable();

    title.append(this.totalWinnersElement);
    pageNumberTitle.append(this.pageNumberCountElement);

    this.appendChildren([title, pageNumberTitle, this.winnersWrapper, winnersTable, paginationBlock]);
  }

  private handleWinnersPageClick = (event: Event): void => {
    const currentTarget = event.target as HTMLElement;

    if (currentTarget.classList.contains('winner-btn')) {
      const winnerParentElem = document.querySelector('.table-container') as HTMLElement;
      assertIsDefined(winnerParentElem);
      this.controller.handleRenderWinners(winnerParentElem, this.pageNumber, this.totalWinnersElement);
    }
  };

  private handlePrevButtonClick = (event: Event): void => {
    const btn = event.target as HTMLButtonElement;
    const nextBtn = document.querySelector('.winners .nextBtn');
    const winnerParentElem = document.querySelector('.table-container') as HTMLElement;

    assertIsDefined(winnerParentElem);
    console.log('winners next');
    nextBtn?.removeAttribute(FormAttribute.DISABLED);

    btn.removeAttribute(FormAttribute.DISABLED);
    this.pageNumber -= 1;
    this.pageNumberCountElement.setTextContent(`#${this.pageNumber}`);

    if (this.pageNumber === 1) {
      btn.setAttribute(FormAttribute.DISABLED, 'true');
    }

    this.controller.handleRenderWinners(winnerParentElem, this.pageNumber, this.totalWinnersElement);
  };

  private handleNextButtonClick = async (event: Event): Promise<void> => {
    const btn = event.target as HTMLButtonElement;
    const winnerParentElem = document.querySelector('.table-container') as HTMLElement;
    const prevBtn = document.querySelector('.winners .prevBtn');

    assertIsDefined(winnerParentElem);

    await this.model.updateTotalCarsValue();

    console.log('winners prev');
    prevBtn?.removeAttribute(FormAttribute.DISABLED);
    btn.removeAttribute(FormAttribute.DISABLED);
    this.pageNumber += 1;
    this.pageNumberCountElement.setTextContent(`#${this.pageNumber}`);

    if (this.pageNumber * this.carPerPage >= this.model.totalWinnersValue) {
      btn.setAttribute(FormAttribute.DISABLED, 'true');
    }

    this.controller.handleRenderWinners(winnerParentElem, this.pageNumber, this.totalWinnersElement);
  };
}
