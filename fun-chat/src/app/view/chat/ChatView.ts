// import { assertIsDefined } from '../../../utilities/utils';
import BaseComponent from '../../components/BaseComponent';
import { div, ul, li } from '../../components/HTMLComponents';

// import { LinkAttribute, ImageAttribute } from '../../../types/enums';
// import { GetAllUsersPayload } from '../../../types/interfaces';

// import courseLogo from '../../../assets/images/school-logo.svg';
// import gitHubLogo from '../../../assets/images/github-logo.svg';

import styles from './ChatView.module.scss';

// import Router from '../../router/Router';

export default class ChatView extends BaseComponent {
  // private router: Router;

  private userListWrapperElem = div([styles['user-list-wrapper']]);

  private userList = ul(['user-list']);

  constructor() {
    super({
      tag: 'div',
      classNames: [styles.chat],
    });

    // this.router = router;
    // this.setPage();
  }

  public setPage() {
    const messageFieldWrapperElem = div([styles['message-field-wrapper']]);

    this.userListWrapperElem.append(this.userList);

    this.appendChildren([this.userListWrapperElem, messageFieldWrapperElem]);
  }

  public renderUsers = (users: { login: string; isLogined: boolean }[]) => {
    // this.userList.destroyChildren();
    // const userListElement = document.querySelector('.user-list');
    // assertIsDefined(userListElement);
    // console.log(userListElement);
    // console.log(this);

    users.forEach((user) => {
      const liElem = li(['list-item'], user.login);
      this.userList.append(liElem);
    });

    // this.userListWrapperElem.append(this.userList);
  };
}
