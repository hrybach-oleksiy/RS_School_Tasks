import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';
import Modal from './components/modal/Modal';
import AboutView from './view/about/AboutView';

import Router from './router/Router';

import AuthController from './controller/AuthController';
import UserModel from './model/UserModel';

import { UserData } from '../types/interfaces';

// import { ServerRequest } from '../types/interfaces';

import LoginView from './view/login/LoginView';
import ChatView from './view/chat/ChatView';
import NotFoundView from './view/not-found/NotFoundView';
// import { assertIsDefined } from '../utilities/utils';

export default class App {
  private ws: WebSocket;

  private userModel: UserModel;

  private header: Header;

  private authView: LoginView;

  private chatView: ChatView;

  private aboutView: AboutView;

  private authController: AuthController;

  private notFoundView: NotFoundView;

  private root: BaseComponent = div(['app']);

  private router: Router;

  private main: Main = new Main();

  private userData: UserData | null = null;

  // private currentLocation: string | null = 'login';

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');

    this.ws = new WebSocket('ws://127.0.0.1:4000');

    this.userModel = new UserModel(this.ws);
    this.header = new Header(this.handleUserLogout);
    this.authView = new LoginView(this.userModel.loginUser, this.setUserData);
    this.chatView = new ChatView(
      this.userModel.sendMessage,
      this.userModel.receiveMessage,
      this.userModel.removeMessage,
      this.userModel.changeMessage,
    );
    this.notFoundView = new NotFoundView();
    this.aboutView = new AboutView();
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.authController = new AuthController(this.userModel, this.authView, this.chatView, this.router);

    sessionStorage.setItem('currentLocation', 'login');

    // this.ws.onmessage = (event) => {
    //   const response = JSON.parse(event.data);
    //   console.log(response);
    //   this.authController.handleResponse(response);
    // };

    // this.userData = App.getUserData();

    // this.ws.onopen = () => {
    //   if (this.userData) {
    //     this.userModel.loginUser(this.userData.login, this.userData.password);
    //     this.header.addUserName(this.userData.login);
    //   }
    // };

    // this.ws.onclose = () => {
    //   console.log('Server is down');
    //   this.handleServerDisconnect();
    // };

    this.setupWebSocketEventHandlers();

    this.userData = App.getUserData();

    // this.currentLocation = App.getCurrentLocation();

    this.ws.onopen = () => {
      if (this.userData) {
        this.userModel.loginUser(this.userData.login, this.userData.password);
        this.header.addHeaderBlocks(this.userData.login);
      }
    };

    this.ws.onclose = () => {
      this.handleServerDisconnect();
      const modalContent = new BaseComponent({
        tag: 'p',
        classNames: [],
        text: 'Connection to the server lost. Attempting to reconnect...',
      });
      const modal = new Modal(modalContent);
      modal.render();
      modal.open();
      this.root.append(modal);
    };
  }

  public createLayout() {
    const footer = new Footer();

    this.root.appendChildren([this.header, this.main, footer]);
  }

  private createRoutes() {
    return [
      {
        path: '/',
        render: () => {
          this.main.destroyChildren();
          this.authView.setForm();
          this.main.append(this.authView);
        },
      },
      {
        path: 'chat',
        render: () => {
          this.main.destroyChildren();
          this.chatView.setPage();
          this.main.append(this.chatView);

          if (this.userData) {
            this.header.addHeaderBlocks(this.userData.login);
          }

          this.ws.onopen = () => {
            this.userModel.getActiveUser();
            this.userModel.getInActiveUser();
          };
        },
      },
      {
        path: 'login',
        render: () => {
          this.main.destroyChildren();
          this.authView.setForm();
          this.main.append(this.authView);
        },
      },
      {
        path: 'about',
        render: () => {
          this.main.destroyChildren();
          this.aboutView.setPage();
          this.main.append(this.aboutView);
        },
      },
      {
        path: '404',
        render: () => {
          this.main.destroyChildren();
          this.notFoundView.setPage();
          this.main.append(this.notFoundView);
        },
      },
    ];
  }

  private handleUserLogout = () => {
    if (this.userData) {
      const { login, password } = this.userData;
      this.userModel.logoutUser(login, password);
      sessionStorage.removeItem('userData');
      this.userData = null;
    }
  };

  // public handleAboutPageClose = () => {
  //   const { currentLocation } = this;
  //   assertIsDefined(currentLocation);
  //   window.location.hash = currentLocation;
  // };

  public setUserData = (newUserData: UserData) => {
    this.userData = newUserData;
  };

  static getUserData = (): UserData | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };

  // static getCurrentLocation = (): string | null => {
  //   return sessionStorage.getItem('currentLocation');
  // };

  private handleServerDisconnect() {
    const reconnectInterval = 3000;

    // console.log('Connection to the server lost. Attempting to reconnect...');

    setTimeout(() => {
      this.ws = new WebSocket('ws://127.0.0.1:4000');
      this.setupWebSocketEventHandlers();
    }, reconnectInterval);
  }

  private setupWebSocketEventHandlers() {
    this.ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      this.authController.handleResponse(response);
    };

    this.ws.onopen = () => {
      const modal = document.querySelector('.modal-js');
      modal?.remove();
    };

    this.ws.onclose = () => {
      this.handleServerDisconnect();
    };
  }
}
