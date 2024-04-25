import { RouteHash } from '../../../types/enums';
import BaseComponent from '../../components/BaseComponent';
import { h1, button } from '../../components/HTMLComponents';

import styles from './NotFound.module.scss';

export default class NotFoundView extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classNames: [styles['not-found']],
    });
  }

  public setPage(): void {
    this.getNode().innerHTML = '';
    const title = h1(['title'], 'Page not found');
    const backBtn = button(['btn'], 'Back to the Main page');

    backBtn.addListener('click', () => {
      const isUserLogin = sessionStorage.getItem('userData');
      if (isUserLogin) {
        window.location.hash = RouteHash.CHAT;
      } else {
        window.location.hash = RouteHash.ROOT;
      }
    });
    this.appendChildren([title, backBtn]);
  }
}
