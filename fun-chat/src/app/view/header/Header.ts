import BaseComponent from '../../components/BaseComponent';
import { p, button, div } from '../../components/HTMLComponents';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
  constructor() {
    super(
      {
        tag: 'header',
        classNames: [styles.header],
      },
      p([styles['header-title']], 'Fun Chat'),
    );

    this.setContent();
  }

  private setContent(): void {
    const buttonsWrapper = div([styles.wrapper]);
    const garageButton = button(['btn', 'header-btn'], 'First Button');

    garageButton.addClass(styles.active);

    const winnersButton = button(['btn', 'header-btn', 'winner-btn'], 'Second Button');

    buttonsWrapper.appendChildren([garageButton, winnersButton]);
    this.append(buttonsWrapper);
  }
}
