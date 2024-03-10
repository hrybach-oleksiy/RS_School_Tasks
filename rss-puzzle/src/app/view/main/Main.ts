import BaseComponent from '../../components/BaseComponent';
import LoginForm from '../../components/login-form/LoginForm';
import StartScreen from '../../pages/start-screen/StartScreen';
// import MainPage from '../../pages/main-page/MainPage';
import { UserData } from '../../../types/interfaces';

// import styles from './Main.module.scss';

export default class Main extends BaseComponent {
    private userData;

    private currentPage: BaseComponent = new LoginForm();

    constructor(userData: UserData | null) {
        super({
            tag: 'main',
            classNames: ['main'],
        });
        this.userData = userData;
        this.setCurrentChild(this.currentPage);
        this.setPage();
    }

    private setPage() {
        if (this.userData) {
            this.currentPage = new StartScreen(this.userData, this.setCurrentChild.bind(this));
            this.setCurrentChild(this.currentPage);
        } else {
            this.currentPage = new LoginForm(this.setCurrentChild.bind(this));
            this.setCurrentChild(this.currentPage);
        }
    }

    private setCurrentChild(page: BaseComponent) {
        this.destroyChildren();
        this.currentPage = page;
        this.append(this.currentPage);
        // this.layoutCreator();
    }
}
