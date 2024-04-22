import Model from '../model/Model';
import LoginView from '../view/login/LoginView';
import ChatView from '../view/chat/ChatView';
import Modal from '../components/modal/Modal';

import {
  UserResponsePayload,
  ServerRequest,
  ErrorPayload,
  UsersPayload,
  MessagesPayload,
  MessagePayload,
  MessageDeleteResponsePayload,
  MessageEditResponsePayload,
  MessageDeliverResponsePayload,
  MessageReadResponsePayload,
} from '../../types/interfaces';
// import { UserRequestType } from '../../types/enums';
import BaseComponent from '../components/BaseComponent';
import { UserRequestType, MessageRequestType } from '../../types/enums';

import Router from '../router/Router';
import { assertIsDefined } from '../../utilities/utils';

export default class Controller {
  private model: Model;

  private authView: LoginView;

  private chatView: ChatView;

  private router: Router;

  private isMessageFetchingByInitRender: boolean = true;

  constructor(model: Model, authView: LoginView, chatView: ChatView, router: Router) {
    this.model = model;
    this.authView = authView;
    this.chatView = chatView;
    this.router = router;
  }

  public handleResponse = (response: ServerRequest) => {
    const { type, payload } = response;

    switch (type) {
      case UserRequestType.LOGIN:
        this.userLoginResponse(payload as UserResponsePayload);
        break;

      case UserRequestType.LOGOUT:
        Controller.userLogoutResponse(payload as UserResponsePayload);
        break;

      case UserRequestType.ACTIVE:
        this.getActiveUsersResponse(payload as UsersPayload);
        break;

      case UserRequestType.INACTIVE:
        this.getInActiveUsersResponse(payload as UsersPayload);
        break;

      case UserRequestType.EXTERNAL_LOGIN:
        // console.log('External User Login - ', (payload as UserResponsePayload).user.login);
        this.userExternalLoginResponse();
        break;

      case UserRequestType.EXTERNAL_LOGOUT:
        this.userExternalLogoutResponse();
        break;

      case MessageRequestType.SEND:
        this.messageSendResponse(payload as MessagePayload);
        break;

      case MessageRequestType.FROM:
        if (this.isMessageFetchingByInitRender) {
          this.initFetchMessageResponse(payload as MessagesPayload);
        } else {
          this.fetchMessageResponse(payload as MessagesPayload);
        }
        break;

      case MessageRequestType.DELETE:
        Controller.messageDeleteResponse(payload as MessageDeleteResponsePayload);
        break;

      case MessageRequestType.EDIT:
        Controller.messageEditResponse(payload as MessageEditResponsePayload);
        break;

      case MessageRequestType.DELIVER:
        // console.log(
        //   `The message width ID - ${(payload as MessageDeliverResponsePayload).message.id} has a status - ${(
        //     payload as MessageDeliverResponsePayload
        //   ).message.status?.isDelivered}`,
        // );
        this.messageDeliveryResponse(payload as MessageDeliverResponsePayload);
        break;

      case MessageRequestType.READ:
        console.log(
          `The message width ID - ${(payload as MessageReadResponsePayload).message.id} has a status - ${(
            payload as MessageReadResponsePayload
          ).message.status?.isReaded}`,
        );
        Controller.messageReadResponse(payload as MessageReadResponsePayload);
        break;

      case UserRequestType.ERROR:
        Controller.handleError(payload as ErrorPayload);
        break;

      default:
        console.error('Unknown payload type:', payload);
    }
  };

  private userLoginResponse = (payload: UserResponsePayload) => {
    const { login } = payload.user;
    console.log(`User ${login} logged in successfully`);
    window.location.hash = 'chat';
    this.model.getActiveUser();
    this.model.getInActiveUser();
  };

  static userLogoutResponse = (payload: UserResponsePayload) => {
    const { login } = payload.user;
    console.log(`User ${login} logged out successfully`);
    window.location.hash = 'login';
  };

  private getActiveUsersResponse = (payload: UsersPayload) => {
    this.chatView.renderActiveUsers(payload.users);
  };

  private getInActiveUsersResponse = (payload: UsersPayload) => {
    this.chatView.renderInActiveUsers(payload.users);
  };

  private userExternalLoginResponse = () => {
    this.handleExternalUserAction();
  };

  private userExternalLogoutResponse = () => {
    this.handleExternalUserAction();
  };

  private messageSendResponse = (payload: MessagePayload) => {
    const { text, to } = payload.message;
    console.log(`Message ${text} to the user ${to} was successfully sent`);
    this.chatView.renderMessage(payload.message);
  };

  private fetchMessageResponse = (payload: MessagesPayload) => {
    // console.log(`Messages from ${payload.messages} were successfully displayed`);
    this.chatView.renderAllMessages(payload.messages);
    // this.isMessageFetchingByInitRender = true;
  };

  private initFetchMessageResponse = (payload: MessagesPayload) => {
    this.chatView.addUnreadMessages(payload.messages);
    this.isMessageFetchingByInitRender = false;
  };

  static messageDeleteResponse = (payload: MessageDeleteResponsePayload) => {
    const { id } = payload.message;
    // console.log(`Message with ID ${id} is with the Status ${status?.isDeleted}`);
    ChatView.deleteMessage(id);
  };

  static messageEditResponse = (payload: MessageEditResponsePayload) => {
    const { status, id, text } = payload.message;
    assertIsDefined(text);
    assertIsDefined(status);
    console.log(`Message with ID ${id} is with the Status ${status.isEdited}`);
    ChatView.renderEditedMessage(id, text, status.isEdited);
  };

  private messageDeliveryResponse = (payload: MessageDeliverResponsePayload) => {
    const { id } = payload.message;

    this.chatView.changeDeliveryStatus(id);
  };

  static messageReadResponse = (payload: MessageReadResponsePayload) => {
    const { id } = payload.message;
    // console.log(`Message with ID ${id} is with the Status ${status?.isDeleted}`);
    ChatView.readMessage(id);
  };

  static handleError = (payload: ErrorPayload) => {
    const modalContent = new BaseComponent({
      tag: 'div',
      classNames: ['modal-error'],
      text: payload.error,
    });
    const modal = new Modal(modalContent);
    modal.render();
    modal.addCloseBtn('Close');
    modal.open();
  };

  private handleExternalUserAction = () => {
    this.chatView.activeUserList.destroyChildren();
    this.chatView.inActiveUserList.destroyChildren();
    this.model.getActiveUser();
    this.model.getInActiveUser();
  };

  // private handleSendMessage = () => {

  // }

  // public handleUserLogin() {
  //   const userDataJSON = localStorage.getItem('userData');
  //   if (userDataJSON) {
  //     const { login, password } = JSON.parse(userDataJSON);
  //     this.model.loginUser(login, password);
  //   }
  // }
}
