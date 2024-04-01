import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Footer from './view/footer/Footer';
import Main from './view/main/Main';

export default class App {
  private root: BaseComponent = div(['app', 'container']);

  constructor() {
    document.body.append(this.root.getNode());
    document.body.setAttribute('data-theme', 'light');
  }

  public createLayout() {
    this.root.destroyChildren();
    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.root.appendChildren([header, main, footer]);
  }
}
