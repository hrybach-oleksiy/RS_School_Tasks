import BaseComponent from '../../components/BaseComponent';

import LoginForm from '../../components/login-form/LoginForm';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      classNames: [styles.main, 'container'],
    });
    this.setPage();
  }

  private setPage(): void {
    this.destroyChildren();
    const loginForm = new LoginForm();

    this.append(loginForm);
  }
}
