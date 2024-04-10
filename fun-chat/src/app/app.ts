import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';

import Router from './router/Router';

import AuthController from './controller/AuthController';
import UserModel from './model/UserModel';

import { UserData } from '../types/interfaces';

// import { ServerRequest } from '../types/interfaces';

import LoginView from './view/login/LoginView';
import ChatView from './view/chat/ChatView';

export default class App {
  private ws: WebSocket;

  private userModel: UserModel;

  private authView: LoginView;

  private chatView: ChatView;

  private authController: AuthController;

  private root: BaseComponent = div(['app']);

  private router: Router;

  private main: Main = new Main();

  private userData: UserData | null = null;

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');

    this.ws = new WebSocket('ws://127.0.0.1:4000');
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.userModel = new UserModel(this.ws);
    this.authView = new LoginView(this.userModel.loginUser, this.setUserData);
    this.chatView = new ChatView();
    this.authController = new AuthController(this.userModel, this.authView, this.chatView, this.router);

    this.ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      this.authController.handleResponse(response);
    };

    this.userData = App.getUserData();
  }

  public createLayout() {
    // this.root.destroyChildren();
    const header = new Header(this.handleUserLogout);
    // const main = new Main(this.router);
    const footer = new Footer();

    this.root.appendChildren([header, this.main, footer]);
  }

  private createRoutes() {
    return [
      {
        path: '',
        callback: () => {
          this.main.destroyChildren();
          const loginPage = new LoginView(this.userModel.loginUser, this.setUserData);
          loginPage.setForm();
          this.main.append(loginPage);
        },
      },
      {
        path: 'chat',
        callback: () => {
          this.main.destroyChildren();
          const chatPage = new ChatView();
          chatPage.setPage();
          this.main.append(chatPage);
        },
      },
      {
        path: 'login',
        callback: () => {
          this.main.destroyChildren();
          const loginPage = new LoginView(this.userModel.loginUser, this.setUserData);
          loginPage.setForm();
          this.main.append(loginPage);
        },
      },
    ];
  }

  private handleUserLogout = () => {
    if (this.userData) {
      const { login, password } = this.userData;
      this.userModel.logoutUser(login, password);
      sessionStorage.removeItem('userData');
    }
  };

  public setUserData = (newUserData: UserData) => {
    this.userData = newUserData;
  };

  static getUserData = (): UserData | null => {
    const userDataJSON = sessionStorage.getItem('userData');
    console.log(userDataJSON);

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      console.log(userData);

      return userData;
    }

    return null;
  };
}
