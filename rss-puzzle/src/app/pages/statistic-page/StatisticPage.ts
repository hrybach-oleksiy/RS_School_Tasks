import BaseComponent from '../../components/BaseComponent';
// import { h1, p, div, button } from '../../components/HTMLComponents';
// import assertIsDefined from '../../../utilities/assertIsDefined';
// import MainPage from '../main-page/MainPage';

// import styles from './StartScreen.module.scss';
// import { AppPage } from '../../../types/enums';

export default class StatisticPage extends BaseComponent {
    // private setAppState?: (page: string) => void;

    constructor() {
        super({
            classNames: ['statistic'],
            text: 'Statistic Page',
        });

        // this.setAppState = setAppState;
        // this.SetPage();
    }

    // private SetPage() {
    //     const descriptionText =
    //         'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.';
    //     const title = h1([styles.title], 'RSS PUZZLE GAME');
    //     const startGameButton = button(['btn', styles.button], 'Start Game', () => {
    //         this.startGame();
    //     });
    //     const description = p([styles.description], descriptionText);
    //     const wrapperElement = div([styles.wrapper], title, description);

    //     document.body.classList.add('background');

    //     this.appendChildren([wrapperElement, startGameButton]);
    // }

    // private startGame() {
    //     if (this.setAppState) {
    //         this.setAppState(AppPage.MAIN_PAGE);
    //     }
    // }
}
