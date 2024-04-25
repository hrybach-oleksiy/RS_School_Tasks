import BaseComponent from '../../components/BaseComponent';
import { p, a, button } from '../../components/HTMLComponents';

import { LinkAttribute, RouteHash } from '../../../types/enums';

import { assertIsDefined } from '../../../utilities/utils';

import styles from './AboutView.module.scss';

export default class AboutView extends BaseComponent {
  private updateUserList: () => void;

  constructor(updateUserList: () => void) {
    super({
      tag: 'div',
      classNames: [styles.about],
    });

    this.updateUserList = updateUserList;
  }

  public setPage(): void {
    this.getNode().innerHTML = '';
    const text =
      'What could be better than chatting with your friends using a chat app? The app developed using WebSockets, and vanilla JavaScript (TypeScript)';
    const textElement = p([styles.text], text);
    const backBtn = button(['btn'], 'Back');
    const gitHubLink = a([styles.link]);
    gitHubLink.setTextContent('Created by Oleksiy Hrybach');
    gitHubLink.setAttribute(LinkAttribute.HREF, 'https://github.com/hrybach-oleksiy');
    gitHubLink.setAttribute(LinkAttribute.TARGET, '_blank');

    backBtn.addListener('click', this.handleCloseButton);

    this.appendChildren([textElement, gitHubLink, backBtn]);
  }

  private handleCloseButton = () => {
    const currentLocation = sessionStorage.getItem('currentLocation');
    console.log(currentLocation);

    assertIsDefined(currentLocation);

    window.location.hash = currentLocation;

    if (currentLocation === RouteHash.CHAT) {
      this.updateUserList();
    }
  };
}
