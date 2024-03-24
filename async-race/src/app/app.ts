import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Footer from './view/footer/Footer';
import Main from './view/main/Main';

// import { UserData, AppState } from '../types/interfaces';
// import { AppPage } from '../types/enums';

export default class App {
  private root: BaseComponent = div(['app', 'container']);

  // private appState: AppState = { currentPage: AppPage.LOGIN };

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');

    // if (this.userData) {
    //     this.appState.currentPage = AppPage.START_PAGE;
    // }

    // if (this.userData) {
    //     this.appState.currentPage = AppPage.STATISTIC_PAGE;
    // }
  }

  public createLayout() {
    this.root.destroyChildren();
    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.root.appendChildren([header, main, footer]);
  }

  // private handleAppState = (page: string) => {
  //     this.appState.currentPage = page;
  //     this.getUserData();
  //     this.createLayout();
  // };
}
