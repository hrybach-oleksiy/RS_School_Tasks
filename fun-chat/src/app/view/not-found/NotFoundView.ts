import BaseComponent from '../../components/BaseComponent';
import { h1, button } from '../../components/HTMLComponents';
// import Router from '../../router/Router';

// import LoginForm from '../../components/login-form/LoginForm';
// import Chat from '../chat/Chat';

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
      window.location.hash = '/';
    });
    this.appendChildren([title, backBtn]);
  }
}
