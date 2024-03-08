import BaseComponent from '../components/BaseComponent';
import { h1, p, div } from '../components/HTMLComponents';
import { UserData } from '../../types/interfaces';

import styles from './StartScreen.module.scss';

export default class StartScreen extends BaseComponent {
    userData?: UserData | null;

    constructor(userData?: UserData | null) {
        super({
            classNames: [styles['start-screen']],
        });
        this.userData = userData;
        this.SetPage();
    }

    private SetPage() {
        const descriptionText =
            'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.';
        const title = h1([styles.title], 'RSS PUZZLE GAME');
        const description = p([styles.description], descriptionText);
        const user = this.getUserData();
        const userTitle = p([styles['user-title'], styles['fade-in']], `Hello ${user.surname} ${user.name}!`);
        const wrapperElement = div([styles.wrapper], title, description);

        document.body.classList.add(styles.background);

        this.appendChildren([wrapperElement, userTitle]);
    }

    private getUserData() {
        const userName = this.userData?.name;
        const userSurname = this.userData?.surname;

        return {
            name: userName,
            surname: userSurname,
        };
    }
}
