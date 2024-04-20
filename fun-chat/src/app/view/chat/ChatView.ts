// import { assertIsDefined } from '../../../utilities/utils';
import { User, UserMessagePayload, Message, UserStatus } from '../../../types/interfaces';
import BaseComponent from '../../components/BaseComponent';
import { div, ul, li, input, button, p, span } from '../../components/HTMLComponents';

import MessageBlock from '../../components/message/MessageBlock';

import styles from './ChatView.module.scss';

import messageStyles from '../../components/message/MessageBlock.module.scss';
import { assertIsDefined } from '../../../utilities/utils';
import ContextMenu from '../../components/context-menu/ContextMenu';
import { FormAttribute } from '../../../types/enums';

export default class ChatView extends BaseComponent {
  private messageFieldWrapperElem = div([styles['message-field-wrapper']]);

  private userListWrapperElem = div([styles['user-list-wrapper']]);

  public activeUserList = ul([styles['active-user-list']]);

  public inActiveUserList = ul([styles['inactive-user-list']]);

  private messageInputElem = input(
    [styles['message-input'], 'message-input-js'],
    'message',
    'message',
    'text',
    'Type the Message',
  );

  private searchInput = input([styles['search-input']], 'search-input', 'search-input', 'text', 'Search User');

  private messageForm = new BaseComponent({ tag: 'form', classNames: [styles['message-form']] });

  private messagesWrapper = div([styles['message-wrapper']]);

  private sendMessageCallback: (receiver: string, text: string) => void;

  private fetchMessagesCallback: (sender: string) => void;

  private removeMessageCallback: (id: string) => void;

  private changeMessageCallback: (id: string, text: string) => void;

  private currentUser: string | undefined = '';

  private messageData: UserMessagePayload = {
    message: {
      id: '',
      to: '',
      text: '',
    },
  };

  private messageBtnElem = button(['btn', styles['message-btn']], 'Send');

  constructor(
    sendMessageCallback: (receiver: string, text: string) => void,
    fetchMessagesCallback: (sender: string) => void,
    removeMessageCallback: (id: string) => void,
    changeMessageCallback: (id: string, text: string) => void,
  ) {
    super({
      tag: 'div',
      classNames: [styles.chat],
    });

    this.sendMessageCallback = sendMessageCallback;
    this.fetchMessagesCallback = fetchMessagesCallback;
    this.removeMessageCallback = removeMessageCallback;
    this.changeMessageCallback = changeMessageCallback;

    this.messageBtnElem.setAttribute(FormAttribute.DISABLED, 'true');
  }

  public setPage() {
    const messageFieldPlaceHolder = p([styles['message-field-placeholder']], 'Select the user to send a message');

    this.searchInput.addListener('input', (event: Event) => {
      ChatView.searchUsers(event);
    });

    this.messageInputElem.addListener('input', (event: Event) => {
      this.handleMessageInput(event);
    });

    this.messageFieldWrapperElem.append(messageFieldPlaceHolder);
    this.userListWrapperElem.appendChildren([this.searchInput, this.activeUserList, this.inActiveUserList]);
    this.appendChildren([this.userListWrapperElem, this.messageFieldWrapperElem]);
    console.log('chatview rendered');
  }

  private setMessageField = (userName: string, userStatus: boolean): void => {
    const messageFieldHeader = div([styles['message-field-header']]);
    const messageFieldPlaceHolder = p([styles['first-message-placeholder']], 'Enter your first message');

    const userNameElem = span([styles['user-name']], userName);
    const userStatusElem = span(
      [styles['user-status'], userStatus ? styles['user-online'] : styles['user-offline']],
      userStatus ? 'online' : 'offline',
    );

    this.messageForm.addListener('submit', this.sendMessageHandler);

    messageFieldHeader.appendChildren([userNameElem, userStatusElem]);
    this.messagesWrapper.append(messageFieldPlaceHolder);
    this.messageForm.appendChildren([this.messageInputElem, this.messageBtnElem]);
    this.messageFieldWrapperElem.appendChildren([messageFieldHeader, this.messagesWrapper, this.messageForm]);
  };

  private addMessageField = (userName: string, userStatus: boolean): void => {
    this.messageFieldWrapperElem.destroyChildren();
    this.setMessageField(userName, userStatus);
  };

  private setMessageData = () => {
    const messageInput = this.messageInputElem.getNode() as HTMLInputElement;
    const messageText = messageInput.value;

    this.messageData.message.text = messageText;
  };

  public renderActiveUsers = (users: UserStatus[]) => {
    this.currentUser = ChatView.getUserData()?.login;
    this.activeUserList.getNode().innerHTML = '';
    // this.inActiveUserList.getNode().innerHTML = '';
    console.log('active users rendered');
    console.log(this.activeUserList);

    users
      .filter((user) => user.login !== this.currentUser)
      .forEach((user) => {
        const liElem = li(['list-item'], user.login);
        liElem.addClass(styles['active-user']);

        // if (user.isLogined) {
        //   liElem.addClass(styles['active-user']);
        // } else {
        //   liElem.addClass(styles['inactive-user']);
        // }

        liElem.addListener('click', () => {
          assertIsDefined(user.isLogined);
          this.addMessageField(user.login, user.isLogined);
          this.messageData.message.to = user.login;
          this.fetchMessagesCallback(user.login);
        });

        this.activeUserList.append(liElem);
      });
  };

  public renderInActiveUsers = (users: UserStatus[]) => {
    this.currentUser = ChatView.getUserData()?.login;
    this.inActiveUserList.getNode().innerHTML = '';
    // this.activeUserList.getNode().innerHTML = '';
    console.log('nonactive users rendered');
    console.log(this.inActiveUserList);

    users
      .filter((user) => user.login !== this.currentUser)
      .forEach((user) => {
        const liElem = li(['list-item'], user.login);
        liElem.addClass(styles['inactive-user']);

        // if (user.isLogined) {
        //   liElem.addClass(styles['active-user']);
        // } else {
        //   liElem.addClass(styles['inactive-user']);
        // }

        liElem.addListener('click', () => {
          assertIsDefined(user.isLogined);
          this.addMessageField(user.login, user.isLogined);
          this.messageData.message.to = user.login;
          this.fetchMessagesCallback(user.login);
        });

        this.inActiveUserList.append(liElem);
      });
  };

  public renderMessage = (messageData: Message) => {
    const receiver = messageData.to;
    const author = receiver === this.currentUser ? messageData.from : 'You';
    assertIsDefined(author);

    const messageBlock = new MessageBlock(messageData, author);

    if (receiver === this.currentUser) {
      messageBlock.addClass(messageStyles['align-right']);
    } else {
      messageBlock.addListener('contextmenu', (event: Event) => {
        event.preventDefault();

        const allMenus = document.querySelectorAll('.context-menu-js');
        allMenus.forEach((menu) => {
          menu.remove();
        });

        const contextMenu = new ContextMenu(this.removeMessageCallback, this.editMessage);

        contextMenu.show(messageBlock);
      });
    }

    this.messagesWrapper.append(messageBlock);
    this.messagesWrapper.getNode().scrollTo({
      top: this.messagesWrapper.getNode().scrollHeight,
      behavior: 'smooth',
    });
  };

  public renderAllMessages = (messages: Message[]) => {
    if (messages.length) {
      this.messagesWrapper.destroyChildren();
    }

    messages.forEach((item) => {
      console.log(item);
      const receiver = item.to;
      const author = receiver === this.currentUser ? item.from : 'You';
      assertIsDefined(author);
      const messageBlock = new MessageBlock(item, author);

      if (receiver === this.currentUser) {
        messageBlock.addClass(messageStyles['align-right']);
      }

      if (receiver !== this.currentUser) {
        messageBlock.addListener('contextmenu', (event: Event) => {
          event.preventDefault();

          const allMenus = document.querySelectorAll('.context-menu-js');
          allMenus.forEach((menu) => {
            menu.remove();
          });

          const contextMenu = new ContextMenu(this.removeMessageCallback, this.editMessage);

          contextMenu.show(messageBlock);
        });
      }

      this.messagesWrapper.append(messageBlock);
    });
  };

  static renderEditedMessage = (id: string, text: string, status: boolean) => {
    const messages = document.querySelectorAll<HTMLElement>('.message-block-js');

    messages.forEach((message) => {
      const currentID = message.dataset.message;

      if (currentID === id) {
        const currentMessage = message;
        const textField = currentMessage.querySelector<HTMLElement>('.text');
        const statusField = currentMessage.querySelector<HTMLElement>('.message-edited');
        const editedStatus = status ? 'edited' : '';

        assertIsDefined(textField);
        assertIsDefined(statusField);
        statusField.textContent = editedStatus;
        textField.textContent = text;
      }
    });
  };

  static deleteMessage = (id: string) => {
    const messages = document.querySelectorAll<HTMLElement>('.message-block-js');

    messages.forEach((message) => {
      const currentID = message.dataset.message;

      if (currentID === id) {
        message.remove();
      }
    });
  };

  public editMessage = (id: string, text: string) => {
    const messages = document.querySelectorAll<HTMLElement>('.message-block-js');
    const messageInput = document.querySelector<HTMLInputElement>('.message-input-js');
    this.messageData.message.id = id;
    this.messageData.message.text = text;

    assertIsDefined(messageInput);

    messages.forEach((message) => {
      const currentID = message.dataset.message;

      if (currentID === id) {
        messageInput.value = text;
        this.messageBtnElem.setTextContent('Edit');
      }
    });

    this.messageForm.removeListener('submit', this.sendMessageHandler);
    this.messageForm.addListener('submit', this.editMessageHandler);
  };

  static getUserData = (): User | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };

  private sendMessageHandler = (event: Event) => {
    event.preventDefault();
    this.setMessageData();

    const receiver = this.messageData.message.to;
    const messageText = this.messageData.message.text;

    this.sendMessageCallback(receiver, messageText);
    (this.messageForm.getNode() as HTMLFormElement).reset();
    this.messageBtnElem.setAttribute(FormAttribute.DISABLED, 'true');
  };

  private editMessageHandler = (event: Event) => {
    event.preventDefault();
    this.setMessageData();
    const messageID = this.messageData.message.id;
    const messageText = this.messageData.message.text;

    this.changeMessageCallback(messageID, messageText);
    (this.messageForm.getNode() as HTMLFormElement).reset();
    this.messageBtnElem.setTextContent('Send');
    this.messageForm.removeListener('submit', this.editMessageHandler);
    this.messageForm.addListener('submit', this.sendMessageHandler);
  };

  static searchUsers = (event: Event): void => {
    const users = document.querySelectorAll<HTMLElement>('.list-item');
    const currentValue = (event.target as HTMLInputElement).value.toLowerCase();

    users?.forEach((user) => {
      const currentUser = user;
      const userName = user.textContent?.toLowerCase();
      const isMatch = userName?.includes(currentValue);

      currentUser.style.display = isMatch ? 'block' : 'none';
    });
  };

  private handleMessageInput = (event: Event): void => {
    const currentValue = (event.target as HTMLInputElement).value.trim();

    if (!currentValue) {
      this.messageBtnElem.setAttribute(FormAttribute.DISABLED, 'true');
    } else {
      this.messageBtnElem.removeAttribute(FormAttribute.DISABLED);
    }
  };
}
