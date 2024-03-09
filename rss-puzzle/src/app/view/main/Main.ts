import BaseComponent from '../../components/BaseComponent';
import LoginForm from '../../components/login-form/LoginForm';
import StartScreen from '../../pages/start-screen/StartScreen';
import { UserData } from '../../../types/interfaces';

// import styles from './Main.module.scss';

export default class Main extends BaseComponent {
    private userData;

    // private currentPage: BaseComponent = new LoginForm();

    constructor(userData: UserData | null) {
        super({
            tag: 'main',
            classNames: ['main'],
        });
        this.userData = userData;
        this.setPage();
    }

    public setPage() {
        if (this.userData) {
            const startScreen = new StartScreen(this.userData);
            this.append(startScreen);
        } else {
            const form = new LoginForm();
            this.append(form);
        }
    }
}
