import BaseComponent from '../../components/BaseComponent';
import { div, h2, ul, li, span, button, img } from '../../components/HTMLComponents';
import { AppPage, ImageAttribute } from '../../../types/enums';
import { LevelData } from '../../../types/interfaces';

import styles from './StatisticPage.module.scss';
// import { AppPage } from '../../../types/enums';

export default class StatisticPage extends BaseComponent {
    private setAppState?: (page: string) => void;

    private guessedSentences: string[][] = [];

    private notGuessedSentences: string[][] = [];

    private artworkData: LevelData | null = null;

    constructor(setAppState?: (page: string) => void) {
        super({
            tag: 'section',
            classNames: [styles.statistic],
        });

        this.setAppState = setAppState;
        this.getGameState();
        this.SetPage();
    }

    private SetPage() {
        // artwork block
        const artworkBlock = div([styles['artwork-block']]);
        const miniatureBlock = div([styles.miniature]);
        const miniatureImg = img(['img']);
        const textBlock = div(['text-block']);
        const authorName = span(['author-name'], `${this.artworkData?.author} - `);
        const miniatureName = span(['miniature-name'], `${this.artworkData?.name} `);
        const year = span(['year'], `(${this.artworkData?.year})`);
        miniatureImg.setAttribute(
            ImageAttribute.SRC,
            `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${this.artworkData?.cutSrc}`,
        );
        miniatureImg.setAttribute(ImageAttribute.ALT, `${this.artworkData?.name} Miniature`);
        miniatureBlock.append(miniatureImg);
        textBlock.appendChildren([authorName, miniatureName, year]);
        artworkBlock.appendChildren([miniatureBlock, textBlock]);

        // not guessed block
        const notGuessedBlock = div([styles['not-guessed']]);
        const notGuessedBlockTitle = h2(['title'], "I don't know");
        const notGuessedCount = span([styles.count, styles.red], String(this.notGuessedSentences.length));
        const notGuessedTitleWrapper = div([styles['title-wrapper']]);
        const notGuessedSentencesList = StatisticPage.createSentencesList(this.notGuessedSentences);
        notGuessedTitleWrapper.appendChildren([notGuessedBlockTitle, notGuessedCount]);
        notGuessedBlock.appendChildren([notGuessedTitleWrapper, notGuessedSentencesList]);

        // guessed block
        const guessedBlock = div([styles.guessed]);
        const guessedBlockTitle = h2(['title'], 'I know');
        const guessedCount = span([styles.count, styles.green], String(this.guessedSentences.length));
        const guessedTitleWrapper = div([styles['title-wrapper']]);
        const guessedSentencesList = StatisticPage.createSentencesList(this.guessedSentences);
        guessedTitleWrapper.appendChildren([guessedBlockTitle, guessedCount]);
        guessedBlock.appendChildren([guessedTitleWrapper, guessedSentencesList]);

        // continue button block
        const continueButton = button(['btn', styles.button], 'Continue Game', this.continueGame);

        document.body.classList.add('background');
        this.appendChildren([artworkBlock, notGuessedBlock, guessedBlock, continueButton]);
    }

    private getGameState() {
        const gameStateJSON = localStorage.getItem('gameState');

        if (gameStateJSON) {
            const gameState = JSON.parse(gameStateJSON);

            this.guessedSentences = gameState.guessedToStatistic;
            this.notGuessedSentences = gameState.notGuessedToStatistic;
            this.artworkData = gameState.artwork;
        } else {
            this.guessedSentences = [];
            this.notGuessedSentences = [];
            this.artworkData = null;
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

    private continueGame = () => {
        if (this.setAppState) {
            this.setAppState(AppPage.MAIN_PAGE);
        }
    };
}
