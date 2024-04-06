import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';

export default class App {
  private root: BaseComponent = div(['app']);

  // private container: BaseComponent = div(['container']);

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
