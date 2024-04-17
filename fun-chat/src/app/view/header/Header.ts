import BaseComponent from '../../components/BaseComponent';
import { p, button, div, h2 } from '../../components/HTMLComponents';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
  private buttonsWrapper = div([styles.wrapper, 'header-block']);

  private logoutButton = button(['btn', 'header-btn'], 'Log Out');

  private aboutButton = button(['btn'], 'About');

  private userNameElem = h2(['user-name'], '');

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
    this.setContent();
  }

  private setContent(): void {
    this.logoutButton.addListener('click', this.handleUserLogout);
    this.aboutButton.addListener('click', Header.handleAboutButtonClick);
    this.buttonsWrapper.append(this.aboutButton);
    this.append(this.buttonsWrapper);
  }

  public addHeaderBlocks = (name: string): void => {
    this.userNameElem.setTextContent(`User: ${name}`);
    this.buttonsWrapper.appendChildren([this.logoutButton, this.userNameElem]);
  };

  private handleUserLogout = (): void => {
    this.userNameElem.destroy();
    this.logoutButton.getNode().remove();
    this.logoutCallback();

    sessionStorage.setItem('currentLocation', 'login');
  };

  static handleAboutButtonClick = (): void => {
    window.location.hash = 'about';
  };
}
