import BaseComponent from '../../components/BaseComponent';
import { h1, h2, span } from '../../components/HTMLComponents';

import { Endpoint } from '../../../types/enums';

import styles from './Winners.module.scss';

export default class Garage extends BaseComponent {
  private totalWinners: number = 0;

  private pageNumber: number = 1;

  private winnersLink: string = `http://127.0.0.1:3000/${Endpoint.WINNERS}`;

  constructor() {
    super({
      tag: 'div',
      classNames: ['winners', 'page'],
    });

    this.getWinners(this.pageNumber);
  }

  private setContent() {
    const title = h1([styles.title], 'Winners  ');
    const totalCarsElement = span(['total-winners'], `(${this.totalWinners})`);
    title.append(totalCarsElement);

    const pageNumberTitle = h2(['page-number-title'], 'Page ');
    const pageNumberCount = span(['page-number-count'], `#${this.pageNumber}`);
    pageNumberTitle.append(pageNumberCount);

    this.appendChildren([title, pageNumberTitle]);
  }

  private getWinners = async (page: number, limit = 10) => {
    try {
      const response = await fetch(`${this.winnersLink}?_page=${page}&_limit=${limit}`, { method: 'GET' });
      this.totalWinners = Number(response.headers.get('X-Total-count'));
      this.setContent();
      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching the list of winners:', error);
      throw error;
    }
  };
}
