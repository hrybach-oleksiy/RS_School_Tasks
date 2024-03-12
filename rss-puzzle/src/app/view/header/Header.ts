import BaseComponent from '../../components/BaseComponent';
import { p, button } from '../../components/HTMLComponents';
// import LoginForm from '../../components/login-form/LoginForm';
import { AppPage } from '../../../types/enums';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
    private setAppState: (page: string) => void;

    private currentPage: string;

    constructor(setAppState: (page: string) => void, currentPage: string) {
        super(
            {
                tag: 'header',
                classNames: [styles.header],
            },
            p(['header-title'], 'RSS Puzzle'),
        );

        this.setAppState = setAppState;
        this.currentPage = currentPage;
        this.setContent();
    }

    setContent() {
        const logoutButton = button(['btn', styles.button], 'Log out', () => {
            document.body.classList.remove('background');
            localStorage.clear();
            this.setAppState(AppPage.LOGIN);
        });

        if (this.currentPage !== AppPage.LOGIN) {
            this.append(logoutButton);
        }
    }
}
