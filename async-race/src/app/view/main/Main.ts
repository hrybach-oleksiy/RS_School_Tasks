import BaseComponent from '../../components/BaseComponent';

import { UserData } from '../../../types/interfaces';
import { AppPage } from '../../../types/enums';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
    private userData: UserData | null;

    private setAppState: (page: string) => void;

    private page: string;

    constructor(userData: UserData | null, setAppState: (page: string) => void, page: string) {
        super({
            tag: 'main',
            classNames: [styles.main],
        });
        this.userData = userData;
        this.setAppState = setAppState;
        this.page = page;
        this.setPage();
    }

    private setPage() {
        this.destroyChildren();

        if (this.page === AppPage.START_PAGE) {
            // const startScreen = new StartScreen(this.userData, this.setAppState);
            // this.append(startScreen);
        }

        if (this.page === AppPage.LOGIN) {
            // const loginPage = new LoginForm(this.setAppState);
            // this.append(loginPage);
        }

        if (this.page === AppPage.MAIN_PAGE) {
            // const mainPage = new MainPage(this.setAppState);
            // this.append(mainPage);
        }

        if (this.page === AppPage.STATISTIC_PAGE) {
            // const statisticPage = new StatisticPage(this.setAppState);
            // this.append(statisticPage);
        }
    }
}
