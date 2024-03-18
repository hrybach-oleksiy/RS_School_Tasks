import BaseComponent from '../../components/BaseComponent';
import { div, h2, ul, li, span, button, img } from '../../components/HTMLComponents';

import { ImageAttribute } from '../../../types/enums';
import { LevelData } from '../../../types/interfaces';

import audioIconImage from '../../../assets/images/audio-icon-statistic.svg';
import playingIconImage from '../../../assets/images/audio-icon-statistic-playing.svg';

import styles from './StatisticPage.module.scss';

export default class StatisticPage extends BaseComponent {
    private setAppState?: (page: string) => void;

    private guessedSentences: string[][] = [];

    private notGuessedSentences: string[][] = [];

    private artworkData: LevelData | null = null;

    private guessedAudioExamples: string[] = [];

    private notGuessedAudioExamples: string[] = [];

    private isPlaying: boolean = false;

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
        const notGuessedSentencesList = this.createSentencesList(
            this.notGuessedSentences,
            this.notGuessedAudioExamples,
        );
        notGuessedTitleWrapper.appendChildren([notGuessedBlockTitle, notGuessedCount]);
        notGuessedBlock.appendChildren([notGuessedTitleWrapper, notGuessedSentencesList]);

        // guessed block
        const guessedBlock = div([styles.guessed]);
        const guessedBlockTitle = h2(['title'], 'I know');
        const guessedCount = span([styles.count, styles.green], String(this.guessedSentences.length));
        const guessedTitleWrapper = div([styles['title-wrapper']]);
        const guessedSentencesList = this.createSentencesList(this.guessedSentences, this.guessedAudioExamples);
        guessedTitleWrapper.appendChildren([guessedBlockTitle, guessedCount]);
        guessedBlock.appendChildren([guessedTitleWrapper, guessedSentencesList]);

        // continue button block
        const continueButton = button(['btn', styles.button], 'Continue Game');

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
            this.guessedAudioExamples = gameState.guessedAudioExamples;
            this.notGuessedAudioExamples = gameState.notGuessedAudioExamples;
        } else {
            this.guessedSentences = [];
            this.notGuessedSentences = [];
            this.artworkData = null;
            this.guessedAudioExamples = [];
            this.notGuessedAudioExamples = [];
        }
    }

    private createSentencesList(sentencesList: string[][], audioExamples: string[]) {
        const ulElement = ul([styles.list]);

        if (sentencesList) {
            sentencesList.forEach((sentence, index) => {
                const liElement = li([styles['list-item']], sentence.join(' '));
                const audioIconWrapper = div([styles['audio-icon-wrapper']]);
                const audioIcon = img([styles['audio-img']]);

                audioIcon.setAttribute(ImageAttribute.SRC, audioIconImage);
                audioIconWrapper.addListener('click', () => {
                    this.handleAudioIconClick(audioExamples[index], audioIcon);
                });
                audioIconWrapper.append(audioIcon);
                liElement.append(audioIconWrapper);
                ulElement.append(liElement);
            });
        } else {
            ulElement.append(li([styles['list-item']], ''));
        }

        return ulElement;
    }

    // private continueGame = () => {
    //     if (this.setAppState) {
    //         this.setAppState(AppPage.MAIN_PAGE);
    //     }
    // };

    private handleAudioIconClick = (example: string, iconElement: BaseComponent) => {
        const audio = new Audio();

        if (!this.isPlaying) {
            iconElement.setAttribute(ImageAttribute.SRC, playingIconImage);
            audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${example}`;
            audio.play();
            this.isPlaying = true;
            audio.onended = () => {
                this.isPlaying = false;
                iconElement.setAttribute(ImageAttribute.SRC, audioIconImage);
            };
        }
    };
}
