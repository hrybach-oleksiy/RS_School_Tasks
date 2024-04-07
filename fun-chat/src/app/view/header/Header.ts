import BaseComponent from '../../components/BaseComponent';
import { p, button, div } from '../../components/HTMLComponents';

import Router from '../../router/Router';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
  private router: Router;

  constructor(router: Router) {
    super(
      {
        tag: 'header',
        classNames: [styles.header],
      },
      p([styles['header-title']], 'Fun Chat'),
    );
    this.router = router;
    this.setContent();
  }

  private setContent(): void {
    const buttonsWrapper = div([styles.wrapper]);
    const logoutButton = button(['btn', 'header-btn'], 'Log Out', this.handleLogoutButtonClick);

    // garageButton.addClass(styles.active);

    buttonsWrapper.appendChildren([logoutButton]);
    this.append(buttonsWrapper);
  }

  private handleLogoutButtonClick = () => {
    this.router.navigate('login');
  };
}
