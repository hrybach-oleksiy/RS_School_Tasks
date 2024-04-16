import UserModel from '../model/UserModel';
import LoginView from '../view/login/LoginView';
import ChatView from '../view/chat/ChatView';
import Modal from '../components/modal/Modal';

import {
  UserLoginResponsePayload,
  ServerRequest,
  PayloadType,
  ErrorPayload,
  UsersPayload,
  MessagePayload,
  MessagesPayload,
  MessageDeleteResponsePayload,
  MessageEditResponsePayload,
} from '../../types/interfaces';
// import { UserRequestType } from '../../types/enums';
import BaseComponent from '../components/BaseComponent';
import { UserRequestType, MessageRequestType } from '../../types/enums';

import Router from '../router/Router';
import { assertIsDefined } from '../../utilities/utils';

export default class AuthController {
  private model: UserModel;

  private authView: LoginView;

  private chatView: ChatView;

  private router: Router;

  constructor(model: UserModel, authView: LoginView, chatView: ChatView, router: Router) {
    this.model = model;
    this.authView = authView;
    this.chatView = chatView;
    this.router = router;
  }

  public handleResponse = (response: ServerRequest) => {
    let currentPayload: PayloadType;

    switch (response.type) {
      case UserRequestType.LOGIN:
        currentPayload = response.payload as UserLoginResponsePayload;
        this.userLoginResponse(currentPayload);
        break;

      case UserRequestType.LOGOUT:
        currentPayload = response.payload as UserLoginResponsePayload;
        AuthController.userLogoutResponse(currentPayload);
        break;

      case UserRequestType.ACTIVE:
        currentPayload = response.payload as UsersPayload;
        this.getActiveUsersResponse(currentPayload);
        break;

      case UserRequestType.INACTIVE:
        currentPayload = response.payload as UsersPayload;
        this.getInActiveUsersResponse(currentPayload);
        break;

      case MessageRequestType.SEND:
        currentPayload = response.payload as MessagePayload;
        this.messageSendResponse(currentPayload);
        break;

      case MessageRequestType.FROM:
        currentPayload = response.payload as MessagesPayload;
        this.messageFromResponse(currentPayload);
        break;

      case MessageRequestType.DELETE:
        currentPayload = response.payload as MessageDeleteResponsePayload;
        AuthController.messageDeleteResponse(currentPayload);
        break;

      case MessageRequestType.EDIT:
        currentPayload = response.payload as MessageEditResponsePayload;
        AuthController.messageEditResponse(currentPayload);
        break;

      case UserRequestType.ERROR:
        currentPayload = response.payload as ErrorPayload;
        AuthController.handleError(currentPayload);
        break;

      default:
        console.error('Unknown payload type:', response.payload);
    }
  };

  private userLoginResponse = (payload: UserLoginResponsePayload) => {
    const logOutBlock = document.querySelector('.header-block');
    console.log(`User ${payload.user.login} logged in successfully`);
    window.location.hash = 'chat';
    this.model.getActiveUser();
    this.model.getInActiveUser();

    logOutBlock?.classList.remove('hidden');
  };

  static userLogoutResponse = (payload: UserLoginResponsePayload) => {
    console.log(`User ${payload.user.login} logged out successfully`);
    window.location.hash = 'login';
  };

  private getActiveUsersResponse = (payload: UsersPayload) => {
    this.chatView.renderUsers(payload.users);

    // Redirect or perform further actions upon successful login

    // else if (response.type === UserRequestType.ERROR) {
    //   // this.authView.displayErrorMessage(response.payload.error);
    //   console.log('Error');
    // }
  };

  private getInActiveUsersResponse = (payload: UsersPayload) => {
    this.chatView.renderUsers(payload.users);
  };

  private messageSendResponse = (payload: MessagePayload) => {
    console.log(`Message ${payload.message.text} to the user ${payload.message.to} was successfully sent`);
    this.chatView.renderMessage(payload);
  };

  private messageFromResponse = (payload: MessagesPayload) => {
    // console.log(`Messages from ${payload.messages} were successfully displayed`);
    this.chatView.renderAllMessages(payload.messages);
  };

  static messageDeleteResponse = (payload: MessageDeleteResponsePayload) => {
    console.log(`Message with ID ${payload.message.id} is with the Status ${payload.message.status?.isDeleted}`);
    ChatView.deleteMessage(payload.message.id);
  };

  static messageEditResponse = (payload: MessageEditResponsePayload) => {
    const { status, id, text } = payload.message;
    assertIsDefined(text);
    assertIsDefined(status);
    console.log(`Message with ID ${id} is with the Status ${status.isEdited}`);
    ChatView.renderEditedMessage(id, text, status.isEdited);
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
