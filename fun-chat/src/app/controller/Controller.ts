import BaseComponent from '../components/BaseComponent';

import Model from '../model/Model';
import ChatView from '../view/chat/ChatView';
import Modal from '../components/modal/Modal';

import {
  UserResponsePayload,
  ServerRequest,
  ErrorPayload,
  UsersPayload,
  MessagesPayload,
  MessagePayload,
  MessageResponsePayload,
} from '../../types/interfaces';
import { UserRequestType, MessageRequestType, RouteHash } from '../../types/enums';

import { assertIsDefined } from '../../utilities/utils';

export default class Controller {
  private model: Model;

  private chatView: ChatView;

  private isMessageFetchingByInitRender: boolean = true;

  constructor(model: Model, chatView: ChatView) {
    this.model = model;
    this.chatView = chatView;
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
        Controller.messageDeleteResponse(payload as MessageResponsePayload);
        break;

      case MessageRequestType.EDIT:
        Controller.messageEditResponse(payload as MessageResponsePayload);
        break;

      case MessageRequestType.DELIVER:
        this.messageDeliveryResponse(payload as MessageResponsePayload);
        break;

      case MessageRequestType.READ:
        Controller.messageReadResponse(payload as MessageResponsePayload);
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
    window.location.hash = RouteHash.CHAT;
    this.model.getActiveUser();
    this.model.getInActiveUser();
  };

  static userLogoutResponse = (payload: UserResponsePayload) => {
    const { login } = payload.user;
    console.log(`User ${login} logged out successfully`);
    window.location.hash = RouteHash.LOGIN;
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
    this.chatView.renderMessage(payload.message);
  };

  private fetchMessageResponse = (payload: MessagesPayload) => {
    this.chatView.renderAllMessages(payload.messages);
  };

  private initFetchMessageResponse = (payload: MessagesPayload) => {
    this.chatView.addUnreadMessages(payload.messages);
    this.isMessageFetchingByInitRender = false;
  };

  static messageDeleteResponse = (payload: MessageResponsePayload) => {
    const { id } = payload.message;

    ChatView.deleteMessage(id);
  };

  static messageEditResponse = (payload: MessageResponsePayload) => {
    const { status, id, text } = payload.message;

    assertIsDefined(text);
    assertIsDefined(status);
    ChatView.renderEditedMessage(id, text, status.isEdited);
  };

  private messageDeliveryResponse = (payload: MessageResponsePayload) => {
    const { id } = payload.message;

    this.chatView.changeDeliveryStatus(id);
  };

  static messageReadResponse = (payload: MessageResponsePayload) => {
    const { id } = payload.message;

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
}
