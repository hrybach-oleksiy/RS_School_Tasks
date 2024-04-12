import UserModel from '../model/UserModel';
import LoginView from '../view/login/LoginView';
import ChatView from '../view/chat/ChatView';
import Modal from '../components/modal/Modal';

import {
  UserLoginResponsePayload,
  ServerRequest,
  PayloadType,
  UserLoginErrorPayload,
  GetAllUsersPayload,
} from '../../types/interfaces';
// import { UserRequestType } from '../../types/enums';
import BaseComponent from '../components/BaseComponent';
import { UserRequestType } from '../../types/enums';

import Router from '../router/Router';

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
        this.userLogoutResponse(currentPayload);
        break;

      case UserRequestType.ACTIVE:
        currentPayload = response.payload as GetAllUsersPayload;
        this.getActiveUsersResponse(currentPayload);
        break;

      case UserRequestType.INACTIVE:
        currentPayload = response.payload as GetAllUsersPayload;
        this.getInActiveUsersResponse(currentPayload);
        break;

      case UserRequestType.ERROR:
        currentPayload = response.payload as UserLoginErrorPayload;
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

  private userLogoutResponse = (payload: UserLoginResponsePayload) => {
    console.log(`User ${payload.user.login} logged out successfully`);
    window.location.hash = 'login';
    console.log(this);
  };

  private getActiveUsersResponse = (payload: GetAllUsersPayload) => {
    this.chatView.renderUsers(payload.users);

    // Redirect or perform further actions upon successful login

    // else if (response.type === UserRequestType.ERROR) {
    //   // this.authView.displayErrorMessage(response.payload.error);
    //   console.log('Error');
    // }
  };

  private getInActiveUsersResponse = (payload: GetAllUsersPayload) => {
    this.chatView.renderUsers(payload.users);
  };

  static handleError = (payload: UserLoginErrorPayload) => {
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

  // public handleUserLogin() {
  //   const userDataJSON = localStorage.getItem('userData');
  //   if (userDataJSON) {
  //     const { login, password } = JSON.parse(userDataJSON);
  //     this.model.loginUser(login, password);
  //   }
  // }
}
