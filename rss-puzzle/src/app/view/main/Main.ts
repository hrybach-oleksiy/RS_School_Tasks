import BaseComponent from '../../components/BaseComponent';
import LoginForm from '../../components/login-form/LoginForm';
import StartScreen from '../../pages/start-screen/StartScreen';
import MainPage from '../../pages/main-page/MainPage';
import { UserData } from '../../../types/interfaces';
import { AppPage } from '../../../types/enums';

// import styles from './Main.module.scss';

export default class Main extends BaseComponent {
    private userData;

    private setAppState: (page: string) => void;

    private page: string;

    constructor(userData: UserData | null, setAppState: (page: string) => void, page: string) {
        super({
            tag: 'main',
            classNames: ['main'],
        });
        this.userData = userData;
        this.setAppState = setAppState;
        this.page = page;
        this.setPage();
    }

    private setPage() {
        this.destroyChildren();

        if (this.page === AppPage.START_PAGE) {
            const startScreen = new StartScreen(this.userData, this.setAppState);
            this.append(startScreen);
        }

        if (this.page === AppPage.LOGIN) {
            const loginPage = new LoginForm(this.setAppState);
            this.append(loginPage);
        }

        if (this.page === AppPage.MAIN_PAGE) {
            const mainPage = new MainPage();
            this.append(mainPage);
        }
    }
}
