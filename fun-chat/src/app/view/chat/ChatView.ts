import BaseComponent from '../../components/BaseComponent';
import { div, ul } from '../../components/HTMLComponents';

// import { LinkAttribute, ImageAttribute } from '../../../types/enums';

// import courseLogo from '../../../assets/images/school-logo.svg';
// import gitHubLogo from '../../../assets/images/github-logo.svg';

import styles from './ChatView.module.scss';

// import Router from '../../router/Router';

export default class ChatView extends BaseComponent {
  // private router: Router;

  constructor() {
    super({
      tag: 'div',
      classNames: [styles.chat],
    });

    // this.router = router;
  }

  public setPage() {
    const userListWrapperElem = div([styles['user-list-wrapper']]);
    const messageFieldWrapperElem = div([styles['message-field-wrapper']]);

    const userList = ul(['user-list']);
    userListWrapperElem.append(userList);

    this.appendChildren([userListWrapperElem, messageFieldWrapperElem]);
  }
}
