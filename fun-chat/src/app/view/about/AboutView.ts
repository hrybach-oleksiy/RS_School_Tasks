import { assertIsDefined } from '../../../utilities/utils';
import BaseComponent from '../../components/BaseComponent';
import { p, a, button } from '../../components/HTMLComponents';
import { LinkAttribute } from '../../../types/enums';

import styles from './AboutView.module.scss';

export default class AboutView extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classNames: [styles.about],
    });
  }

  public setPage(): void {
    this.getNode().innerHTML = '';
    const text =
      'What could be better than chatting with your friends using a chat app? The app developed using WebSockets, and vanilla JavaScript (Typescript)';
    const textElement = p([styles.text], text);
    // const authorNameElement = span(['author-name'], 'Created by');
    const backBtn = button(['btn'], 'Back');
    const gitHubLink = a([styles.link]);
    gitHubLink.setTextContent('Created by Oleksiy Hrybach');
    gitHubLink.setAttribute(LinkAttribute.HREF, 'https://github.com/hrybach-oleksiy');
    gitHubLink.setAttribute(LinkAttribute.TARGET, '_blank');

    backBtn.addListener('click', AboutView.handleCloseButton);

    this.appendChildren([textElement, gitHubLink, backBtn]);
  }

  static handleCloseButton = () => {
    const currentLocation = sessionStorage.getItem('currentLocation');

    assertIsDefined(currentLocation);

    window.location.hash = currentLocation;
  };
}
