import BaseComponent from '../BaseComponent';
import { button } from '../HTMLComponents';

import { FormAttribute } from '../../../types/enums';

import styles from './Pagination.module.scss';

type PaginationHandler = (event: Event) => void;

export default class Pagination extends BaseComponent {
  private onPrevBtnClick: PaginationHandler;

  private onNextBtnClick: PaginationHandler;

  private isNextBtnActive: boolean;

  constructor(onPrevBtnClick: PaginationHandler, onNextBtnClick: PaginationHandler, isNextBtnActive: boolean) {
    super({
      tag: 'div',
      classNames: [styles.pagination],
    });

    this.onPrevBtnClick = onPrevBtnClick;
    this.onNextBtnClick = onNextBtnClick;
    this.isNextBtnActive = isNextBtnActive;
    this.setBlock();
  }

  private setBlock(): void {
    const prevButton = button(['btn', styles.button, 'prevBtn'], 'Previous Page', (event) => {
      this.onPrevBtnClick(event);
    });
    const nextButton = button(['btn', styles.button, 'nextBtn'], 'Next Page', (event) => {
      this.onNextBtnClick(event);
    });

    prevButton.setAttribute(FormAttribute.DISABLED, 'true');

    if (this.isNextBtnActive) {
      nextButton.removeAttribute(FormAttribute.DISABLED);
    } else {
      nextButton.setAttribute(FormAttribute.DISABLED, 'true');
    }

    this.appendChildren([prevButton, nextButton]);
  }
}
