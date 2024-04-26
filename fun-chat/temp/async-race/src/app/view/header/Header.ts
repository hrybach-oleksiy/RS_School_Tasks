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
      p([styles['header-title']], 'Async Race'),
    );

    this.setContent();
  }

  private setContent(): void {
    const buttonsWrapper = div([styles.wrapper]);
    const garageButton = button(['btn', 'header-btn'], 'Garage', Header.changeView);

    garageButton.addClass(styles.active);

    const winnersButton = button(['btn', 'header-btn', 'winner-btn'], 'Winners', Header.changeView);

    buttonsWrapper.appendChildren([garageButton, winnersButton]);
    this.append(buttonsWrapper);
  }

  static changeView = (event: Event): void => {
    const currentButton = event.target as HTMLButtonElement;
    const pages = document.querySelectorAll('.page');
    const buttonElements = document.querySelectorAll('.header-btn');
    const currentView = currentButton.textContent;

    if (currentView === 'Garage') {
      pages[1].classList.add('hidden');
      pages[0].classList.remove('hidden');
    }

    if (currentView === 'Winners') {
      pages[0].classList.add('hidden');
      pages[1].classList.remove('hidden');
    }

    // FIXME: fix button style change on double click
    buttonElements.forEach((buttonElement) => {
      if (buttonElement.classList.contains(styles.active)) {
        buttonElement.classList.remove(styles.active);
      } else {
        buttonElement.classList.add(styles.active);
      }
    });
  };
}
