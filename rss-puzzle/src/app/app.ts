import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Footer from './view/footer/Footer';
import Main from './view/main/Main';

import { UserData, AppState } from '../types/interfaces';
import { AppPage } from '../types/enums';

export default class App {
    private root: BaseComponent = div(['app', 'container']);

    private userData: UserData | null = null;

    private appState: AppState = { currentPage: AppPage.LOGIN };

    constructor() {
        document.body.append(this.root.getNode());
        document.body.setAttribute('data-theme', 'light');
        this.getUserData();

        if (this.userData) {
            this.appState.currentPage = AppPage.START_PAGE;
        }

        // if (this.userData) {
        //     this.appState.currentPage = AppPage.STATISTIC_PAGE;
        // }
    }

    public createLayout() {
        this.root.destroyChildren();
        const header = new Header(this.handleAppState, this.appState.currentPage);
        const main = new Main(this.userData, this.handleAppState, this.appState.currentPage);
        const footer = new Footer(App.handleFooterButtonClick);

        this.root.appendChildren([header, main, footer]);
    }

    private getUserData() {
        const userDataJSON = localStorage.getItem('userData');

        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON);
            this.userData = {
                name: userData.name,
                surname: userData.surname,
            };
        } else {
            this.userData = null;
        }
    }

    static handleFooterButtonClick() {
        console.log('Кнопка в футері була натиснута');
    }

    private handleAppState = (page: string) => {
        this.appState.currentPage = page;
        this.getUserData();
        this.createLayout();
    };
}
