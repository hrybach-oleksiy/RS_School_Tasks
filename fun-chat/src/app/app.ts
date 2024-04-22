import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';
import Modal from './components/modal/Modal';
import AboutView from './view/about/AboutView';

import Router from './router/Router';

import Controller from './controller/Controller';
import Model from './model/Model';

import { User } from '../types/interfaces';

// import { ServerRequest } from '../types/interfaces';

import LoginView from './view/login/LoginView';
import ChatView from './view/chat/ChatView';
import NotFoundView from './view/not-found/NotFoundView';
// import { assertIsDefined } from '../utilities/utils';

export default class App {
  private ws: WebSocket;

  private model: Model;

  private header: Header;

  private loginView: LoginView;

  private chatView: ChatView;

  private aboutView: AboutView;

  private controller: Controller;

  private notFoundView: NotFoundView;

  private root: BaseComponent = div(['app']);

  private router: Router;

  private main: Main = new Main();

  private userData: User | null = null;

  // private currentLocation: string | null = 'login';

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');

    this.ws = new WebSocket('ws://127.0.0.1:4000');

    this.model = new Model(this.ws);
    this.header = new Header(this.handleUserLogout);
    this.loginView = new LoginView(this.model.loginUser, this.setUserData);
    this.chatView = new ChatView(
      this.model.sendMessage,
      this.model.fetchMessages,
      this.model.removeMessage,
      this.model.changeMessage,
      this.model.readMessage,
    );
    this.notFoundView = new NotFoundView();
    this.aboutView = new AboutView(this.updateUserList);
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.controller = new Controller(this.model, this.loginView, this.chatView, this.router);

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

    if (this.userData) {
      sessionStorage.setItem('currentLocation', 'chat');
    }

    // this.currentLocation = App.getCurrentLocation();

    this.ws.onopen = () => {
      if (this.userData) {
        this.model.loginUser(this.userData.login, this.userData.password);
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
          this.loginView.setForm();
          this.main.append(this.loginView);
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
            this.model.getActiveUser();
            this.model.getInActiveUser();
          };
        },
      },
      {
        path: 'login',
        render: () => {
          this.main.destroyChildren();
          this.loginView.setForm();
          this.main.append(this.loginView);
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
      this.model.logoutUser(login, password);
      sessionStorage.removeItem('userData');
      this.userData = null;
    }
  };

  // public handleAboutPageClose = () => {
  //   const { currentLocation } = this;
  //   assertIsDefined(currentLocation);
  //   window.location.hash = currentLocation;
  // };

  public setUserData = (newUserData: User) => {
    this.userData = newUserData;
  };

  static getUserData = (): User | null => {
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
      this.controller.handleResponse(response);
    };

    this.ws.onopen = () => {
      const modal = document.querySelector('.modal-js');
      modal?.remove();
    };

    this.ws.onclose = () => {
      this.handleServerDisconnect();
    };
  }

  private updateUserList = () => {
    this.model.getActiveUser();
    this.model.getInActiveUser();
  };
}
