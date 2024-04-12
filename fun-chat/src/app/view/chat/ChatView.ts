// import { assertIsDefined } from '../../../utilities/utils';
import { UserData } from '../../../types/interfaces';
import BaseComponent from '../../components/BaseComponent';
import { div, ul, li } from '../../components/HTMLComponents';

import styles from './ChatView.module.scss';

export default class ChatView extends BaseComponent {
  private userListWrapperElem = div([styles['user-list-wrapper']]);

  private userList = ul(['user-list']);

  constructor() {
    super({
      tag: 'div',
      classNames: [styles.chat],
    });
  }

  public setPage() {
    const messageFieldWrapperElem = div([styles['message-field-wrapper']]);

    this.userListWrapperElem.append(this.userList);

    this.appendChildren([this.userListWrapperElem, messageFieldWrapperElem]);
  }

  public renderUsers = (users: { login: string; isLogined: boolean }[]) => {
    const currentUser = ChatView.getUserData()?.login;

    users
      .filter((user) => user.login !== currentUser)
      .forEach((user) => {
        const liElem = li(['list-item'], user.login);

        if (user.isLogined) {
          liElem.addClass(styles['active-user']);
        } else {
          liElem.addClass(styles['inactive-user']);
        }

        this.userList.append(liElem);
      });
  };

  static getUserData = (): UserData | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };
}
