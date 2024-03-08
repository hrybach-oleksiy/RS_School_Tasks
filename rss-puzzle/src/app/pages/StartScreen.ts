import BaseComponent from '../components/BaseComponent';
import { h1, p } from '../components/HTMLComponents';

import styles from './StartScreen.module.scss';

export default class StartScreen extends BaseComponent {
    constructor() {
        super({
            classNames: [styles['start-screen']],
        });
        this.SetPage();
    }

    private SetPage() {
        const descriptionText =
            'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.';
        const title = h1([styles.title], 'RSS PUZZLE GAME');
        const description = p([styles.description], descriptionText);

        document.body.classList.add(styles.background);

        this.appendChildren([title, description]);
    }
}
