import BaseComponent from '../../components/BaseComponent';
import { p, button, div } from '../../components/HTMLComponents';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
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
    const buttonsWrapper = div([styles.wrapper]);
    this.logoutButton.addListener('click', this.handleLogoutButtonClick);
    this.logoutButton.addListener('click', this.handleUserLogout);

    if (window.location.hash !== '#chat') {
      this.logoutButton.addClass('hidden');
    }

    buttonsWrapper.appendChildren([this.logoutButton]);
    this.append(buttonsWrapper);
  }

  private handleLogoutButtonClick = () => {
    this.logoutButton.addClass('hidden');
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
