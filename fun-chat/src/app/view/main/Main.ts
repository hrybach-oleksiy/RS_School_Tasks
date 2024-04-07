import BaseComponent from '../../components/BaseComponent';
// import Router from '../../router/Router';

// import LoginForm from '../../components/login-form/LoginForm';
// import Chat from '../chat/Chat';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      classNames: [styles.main, 'container'],
    });
    // this.setPage();
  }

  // private setPage(): void {
  //   this.destroyChildren();
  //   const path = window.location.pathname;
  //   const login = new LoginForm(this.router);
  //   const chat = new Chat(this.router);
  //   const currentView = path === '/login' ? login : chat;
  //   this.append(currentView);
  // }
}
