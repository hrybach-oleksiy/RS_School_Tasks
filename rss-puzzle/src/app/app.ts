import BaseComponent from './components/BaseComponent';
import { div } from './components/HTMLComponents';

import Header from './view/header/Header';
import Footer from './view/footer/Footer';
import Main from './view/main/Main';

import { UserData } from '../types/interfaces';

export default class App {
    private root: BaseComponent = div(['app', 'container']);

    private userData: UserData | null = null;

    constructor() {
        document.body.append(this.root.getNode());
        document.body.setAttribute('data-theme', 'light');
        this.getUserData();
        // this.createLayout();
    }

    public createLayout() {
        const header = new Header();
        const main = new Main(this.userData);
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
        }
    }

    static handleFooterButtonClick() {
        console.log('Кнопка в футері була натиснута');
    }
}
