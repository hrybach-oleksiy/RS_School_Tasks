import BaseComponent from '../../components/BaseComponent';
import { div, h2, ul, li, span } from '../../components/HTMLComponents';
// import assertIsDefined from '../../../utilities/assertIsDefined';
// import MainPage from '../main-page/MainPage';

import styles from './StatisticPage.module.scss';
// import { AppPage } from '../../../types/enums';

export default class StatisticPage extends BaseComponent {
    // private setAppState?: (page: string) => void;

    private guessedSentences: string[][] = [];

    private notGuessedSentences: string[][] = [];

    constructor() {
        super({
            tag: 'section',
            classNames: [styles.statistic],
        });

        // this.setAppState = setAppState;
        this.getGameState();
        this.SetPage();
    }

    private SetPage() {
        const artworkBlock = div(['artwork-block']);
        const notGuessedBlock = div([styles['not-guessed']]);
        const guessedBlock = div([styles.guessed]);
        const notGuessedBlockTitle = h2(['title'], "I don't know");
        const guessedBlockTitle = h2(['title'], 'I know');
        const notGuessedCount = span([styles.count, styles.red], String(this.notGuessedSentences.length));
        const guessedCount = span([styles.count, styles.green], String(this.guessedSentences.length));
        const notGuessedTitleWrapper = div([styles['title-wrapper']]);
        const guessedTitleWrapper = div([styles['title-wrapper']]);
        const notGuessedSentencesList = StatisticPage.createSentencesList(this.notGuessedSentences);
        const guessedSentencesList = StatisticPage.createSentencesList(this.guessedSentences);

        notGuessedTitleWrapper.appendChildren([notGuessedBlockTitle, notGuessedCount]);
        guessedTitleWrapper.appendChildren([guessedBlockTitle, guessedCount]);
        notGuessedBlock.appendChildren([notGuessedTitleWrapper, notGuessedSentencesList]);
        guessedBlock.appendChildren([guessedTitleWrapper, guessedSentencesList]);
        // const startGameButton = button(['btn', styles.button], 'Start Game', () => {
        //     this.startGame();
        // });
        document.body.classList.add('background');
        this.appendChildren([artworkBlock, notGuessedBlock, guessedBlock]);
    }

    private getGameState() {
        const gameStateJSON = localStorage.getItem('gameState');

        if (gameStateJSON) {
            const gameState = JSON.parse(gameStateJSON);

            this.guessedSentences = gameState.guessedToStatistic;
            this.notGuessedSentences = gameState.notGuessedToStatistic;
        } else {
            this.guessedSentences = [];
            this.notGuessedSentences = [];
        }
    }

    static createSentencesList(sentencesList: string[][]) {
        const ulElement = ul([styles.list]);

        if (sentencesList) {
            sentencesList.forEach((sentence) => {
                const liElement = li(['list-item'], sentence.join(' '));
                ulElement.append(liElement);
            });
        } else {
            ulElement.append(li(['list-item'], ''));
        }

        return ulElement;
    }

    // private startGame() {
    //     if (this.setAppState) {
    //         this.setAppState(AppPage.MAIN_PAGE);
    //     }
    // }
}
