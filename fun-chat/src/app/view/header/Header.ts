import BaseComponent from '../../components/BaseComponent';
import { p, button, div, h2 } from '../../components/HTMLComponents';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
  private buttonsWrapper = div([styles.wrapper, 'header-block']);

  private logoutButton = button(['btn', 'header-btn'], 'Log Out');

  private logoutCallback: () => void;

  constructor(logoutCallback: () => void) {
    super(
      {
        tag: 'header',
        classNames: [styles.header],
      },
      p([styles['header-title']], 'Fun Chat'),
    );
    this.logoutCallback = logoutCallback;
    this.logoutButton.removeClass('hidden');
    this.setContent();
  }

  private setContent(): void {
    this.logoutButton.addListener('click', this.handleLogoutButtonClick);
    this.logoutButton.addListener('click', this.handleUserLogout);

    if (window.location.hash !== '#chat') {
      this.buttonsWrapper.addClass('hidden');
    }

    this.append(this.buttonsWrapper);
  }

  private handleLogoutButtonClick = () => {
    this.buttonsWrapper.addClass('hidden');
  };

  public addUserName = (name: string): void => {
    const userNameElem = h2(['user-name'], `User: ${name}`);

    this.buttonsWrapper.appendChildren([userNameElem, this.logoutButton]);
  };

  // static getUserData = (): UserLoginData | undefined => {
  //   const userDataJson = localStorage.getItem('userData');

  //   if (userDataJson) {
  //     const userData = JSON.parse(userDataJson);
  //     return userData;
  //   }

  //   return undefined;
  // };

  private handleUserLogout = (): void => {
    this.logoutCallback();
  };
}
