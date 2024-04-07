import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';

import Router from './router/Router';

import LoginForm from './components/login-form/LoginForm';
import Chat from './view/chat/Chat';

export default class App {
  private root: BaseComponent = div(['app']);

  private pathSegmentsToKeep: number = 2;

  private router: Router;

  private main: Main = new Main();

  // private container: BaseComponent = div(['container']);

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');
    const routes = this.createRoutes();
    this.router = new Router(routes, this.pathSegmentsToKeep);
  }

  public createLayout() {
    // this.root.destroyChildren();
    const header = new Header(this.router);
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
          this.main.append(new LoginForm(this.router));
        },
      },
      {
        path: 'chat',
        callback: () => {
          this.main.destroyChildren();
          this.main.append(new Chat(this.router));
        },
      },
      {
        path: 'login',
        callback: () => {
          this.main.destroyChildren();
          this.main.append(new LoginForm(this.router));
        },
      },
    ];
  }
}
