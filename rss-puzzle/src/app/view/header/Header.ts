import BaseComponent from '../../components/BaseComponent';
import { p, button } from '../../components/HTMLComponents';
import LoginForm from '../../components/login-form/LoginForm';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
    private onButtonClick: (page: BaseComponent) => void;

    constructor(onButtonClick: (page: BaseComponent) => void) {
        super(
            {
                tag: 'header',
                classNames: [styles.header],
            },
            p(['header-title'], 'RSS Puzzle'),
        );

        this.onButtonClick = onButtonClick;
        this.setContent();
    }

    setContent() {
        const logoutButton = button(['btn', styles.button], 'Log out', () => {
            document.body.classList.remove('background');
            this.onButtonClick(new LoginForm());
        });

        this.append(logoutButton);
    }
}
