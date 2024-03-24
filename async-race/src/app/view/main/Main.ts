import BaseComponent from '../../components/BaseComponent';

import Garage from '../../pages/garage/Garage';
import Winners from '../../pages/winners/Winners';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      classNames: [styles.main],
    });
    this.setPage();
  }

  private setPage() {
    this.destroyChildren();

    const garageBlock = new Garage();
    const winnersBlock = new Winners();

    winnersBlock.addClass('hidden');

    this.appendChildren([garageBlock, winnersBlock]);

    // if (this.page === AppPage.START_PAGE) {
    //     // const startScreen = new StartScreen(this.userData, this.setAppState);
    //     // this.append(startScreen);
    // }

    // if (this.page === AppPage.LOGIN) {
    //     // const loginPage = new LoginForm(this.setAppState);
    //     // this.append(loginPage);
    // }

    // if (this.page === AppPage.MAIN_PAGE) {
    //     // const mainPage = new MainPage(this.setAppState);
    //     // this.append(mainPage);
    // }

    // if (this.page === AppPage.STATISTIC_PAGE) {
    //     // const statisticPage = new StatisticPage(this.setAppState);
    //     // this.append(statisticPage);
    // }
  }
}
