// import { assertIsDefined } from '../../../utilities/utils';
import { UserData, MessagePayload, UserMessagePayload, MessageData } from '../../../types/interfaces';
import BaseComponent from '../../components/BaseComponent';
import { div, ul, li, input, button, p, span } from '../../components/HTMLComponents';

import MessageBlock from '../../components/message/MessageBlock';

import styles from './ChatView.module.scss';

import messageStyles from '../../components/message/MessageBlock.module.scss';
import { assertIsDefined } from '../../../utilities/utils';
import ContextMenu from '../../components/context-menu/ContextMenu';

export default class ChatView extends BaseComponent {
  private messageFieldWrapperElem = div([styles['message-field-wrapper']]);

  private userListWrapperElem = div([styles['user-list-wrapper']]);

  private userList = ul(['user-list']);

  private messageInputElem = input(
    [styles['message-input'], 'message-input-js'],
    'message',
    'message',
    'text',
    'Type the Message',
  );

  private messageForm = new BaseComponent({ tag: 'form', classNames: [styles['message-form']] });

  private messagesWrapper = div([styles['message-wrapper']]);

  private sendMessageCallback: (receiver: string, text: string) => void;

  private receiveMessageCallback: (sender: string) => void;

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
    receiveMessageCallback: (sender: string) => void,
    removeMessageCallback: (id: string) => void,
    changeMessageCallback: (id: string, text: string) => void,
  ) {
    super({
      tag: 'div',
      classNames: [styles.chat],
    });

    this.sendMessageCallback = sendMessageCallback;
    this.receiveMessageCallback = receiveMessageCallback;
    this.removeMessageCallback = removeMessageCallback;
    this.changeMessageCallback = changeMessageCallback;
  }

  public setPage() {
    const messageFieldPlaceHolder = p([styles['message-field-placeholder']], 'Select the user to send a message');
    this.messageFieldWrapperElem.append(messageFieldPlaceHolder);
    this.userListWrapperElem.append(this.userList);
    this.appendChildren([this.userListWrapperElem, this.messageFieldWrapperElem]);
  }

  public renderUsers = (users: { login: string; isLogined: boolean }[]) => {
    this.currentUser = ChatView.getUserData()?.login;

    users
      .filter((user) => user.login !== this.currentUser)
      .forEach((user) => {
        const liElem = li(['list-item'], user.login);

        if (user.isLogined) {
          liElem.addClass(styles['active-user']);
        } else {
          liElem.addClass(styles['inactive-user']);
        }

        liElem.addListener('click', () => {
          this.addMessageField(user.login, user.isLogined);
          this.messageData.message.to = user.login;
          this.receiveMessageCallback(user.login);
        });

        this.userList.append(liElem);
      });
  };

  public renderMessage = (messageData: MessagePayload) => {
    const receiver = messageData.message.to;
    const author = receiver === this.currentUser ? messageData.message.from : 'You';
    assertIsDefined(author);

    const messageBlock = new MessageBlock(messageData.message, author);

    if (receiver === this.currentUser) {
      messageBlock.addClass(messageStyles['align-right']);
    }
    this.messagesWrapper.append(messageBlock);
    this.messagesWrapper.getNode().scrollTo({
      top: this.messagesWrapper.getNode().scrollHeight,
      behavior: 'smooth',
    });
  };

  public renderAllMessages = (messages: MessageData[]) => {
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

  static getUserData = (): UserData | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };

  private setMessageField = (userName: string, userStatus: boolean): void => {
    const messageFieldHeader = div([styles['message-field-header']]);

    const userNameElem = span([styles['user-name']], userName);
    const userStatusElem = span(
      [styles['user-status'], userStatus ? styles['user-online'] : styles['user-offline']],
      userStatus ? 'online' : 'offline',
    );

    this.messageForm.addListener('submit', this.sendMessageHandler);

    messageFieldHeader.appendChildren([userNameElem, userStatusElem]);
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

  private sendMessageHandler = (event: Event) => {
    event.preventDefault();
    this.setMessageData();

    const receiver = this.messageData.message.to;
    const messageText = this.messageData.message.text;

    this.sendMessageCallback(receiver, messageText);
    (this.messageForm.getNode() as HTMLFormElement).reset();
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
}
