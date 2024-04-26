import BaseComponent from '../../components/BaseComponent';
import { button, div, span } from '../../components/HTMLComponents';

import ResultBlock from '../../components/result-block/ResultBlock';
import SourceDataBlock from '../../components/source-data-block/SourceDataBlock';
import GameHeader from '../../components/game-header/GameHeader';

import { GameData, HintsState, LevelData } from '../../../types/interfaces';
import { FormAttribute, AppPage } from '../../../types/enums';

import styles from './MainPage.module.scss';

export default class MainPage extends BaseComponent {
    private gameData!: GameData;

    private level: number = 1;

    private round: number = 1;

    private sentence: number = 0;

    private roundsCount: number = 0;

    private words: string[] = [];

    private resultBlock?: BaseComponent;

    private sourceBlock?: BaseComponent;

    private stringLength: number = 0;

    private correctWordOrder: string[] = [];

    private guessedWordOrder: string[] = [];

    private isOrderCorrect: boolean = false;

    private guessedSentences: string[][] = [];

    private checkButton: BaseComponent = button(['check-btn', 'btn'], 'Check Answer');

    private autocompleteButton: BaseComponent = button(['complete-btn', 'btn'], 'Complete Sentence');

    private resultsButton: BaseComponent = button(['results-btn', 'btn', styles.hidden], 'Results');

    private guessedElements: HTMLElement[] = [];

    private translation: string = '';

    private audioExample: string = '';

    private guessedAudioExamples: string[] = [];

    private noteGuessedAudioExamples: string[] = [];

    private hintsState: HintsState = {
        translation: true,
        pronunciation: true,
    };

    private levelData!: LevelData;

    private guessedToStatistic: string[][] = [];

    private notGuessedToStatistic: string[][] = [];

    private setAppState: (page: string) => void;

    private isSentenceAutocompleted: boolean = false;

    private completedRounds: number[] = [];

    private completedLevels: number[] = [];

    constructor(setAppState: (page: string) => void) {
        super({
            tag: 'section',
            classNames: [styles['main-page']],
        });

        this.setAppState = setAppState;
        this.getGameState();
        this.addListener('click', this.handleWordClick);
    }

    private setPage() {
        this.destroyChildren();

        const btnWrapper = div([styles['btn-wrapper']]);
        const gameHeader = new GameHeader(
            this.translation,
            this.hintsState,
            this.audioExample,
            this.handleLevelSelect,
            this.handleRoundSelect,
            this.level,
            this.roundsCount,
            this.round,
        );

        this.resultBlock = new ResultBlock(this.stringLength, this.guessedSentences);
        this.sourceBlock = new SourceDataBlock(this.words);

        this.checkButton.setAttribute(FormAttribute.DISABLED, 'true');
        this.checkButton.setTextContent('Check Answer');
        this.checkButton.addListener('click', this.checkGuess);
        this.autocompleteButton.addListener('click', this.autocompleteSentence);
        this.autocompleteButton.removeAttribute(FormAttribute.DISABLED);
        this.resultsButton.addListener('click', this.openStatisticPage);
        this.resultsButton.addClass(styles.hidden);
        this.isSentenceAutocompleted = false;

        btnWrapper.appendChildren([this.checkButton, this.autocompleteButton, this.resultsButton]);
        this.appendChildren([gameHeader, this.resultBlock, this.sourceBlock, btnWrapper]);
    }

    private getWords(roundNumber: number, sentenceNumber: number) {
        const { rounds, roundsCount } = this.gameData;
        const round = rounds[roundNumber];
        const sentence = round.words[sentenceNumber];
        const words = sentence.textExample;
        const translation = sentence.textExampleTranslate;
        const audio = sentence.audioExample;

        this.correctWordOrder = words.split(' ');
        this.translation = translation;
        this.roundsCount = roundsCount;
        this.audioExample = audio;
        this.levelData = {
            name: round.levelData.name,
            cutSrc: round.levelData.cutSrc,
            author: round.levelData.author,
            year: round.levelData.year,
            imageSrc: round.levelData.imageSrc,
        };
        console.log(this.correctWordOrder);

        return words;
    }

    private shuffleWords() {
        const words = this.getWords(this.round - 1, this.sentence).split(' ');

        for (let i = words.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = words[i];
            words[i] = words[j];
            words[j] = temp;
        }

        this.words = words;
        this.stringLength = words.length;
    }

    private async fetchData(level: number) {
        try {
            const response = await fetch(
                `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            this.gameData = await response.json();
            this.shuffleWords();
            this.getHintsState();
            this.setPage();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    private handleWordClick = (event: Event) => {
        const currentWord = event.target as HTMLElement;
        const resultBlockTemplates = document.querySelectorAll(`#row-${this.sentence + 1} .result-template`);
        const sourceBlockTemplates = document.querySelectorAll('.source-template');

        const currentTemplateId = Number(currentWord.getAttribute(FormAttribute.ID)?.slice(-1));
        let count = 0;

        if (currentWord.closest('#result') && currentWord.classList.contains('part')) {
            const resultParts = document.querySelectorAll('.result-template .part');

            currentWord.classList.add(styles['remove-animation']);

            resultParts.forEach((part) => {
                part.classList.remove('match');
                part.classList.remove('mismatch');
            });

            sourceBlockTemplates.forEach((template) => {
                const sourceBlockTemplateId = Number(template.getAttribute(FormAttribute.ID)?.slice(-1));

                if (currentTemplateId === sourceBlockTemplateId) {
                    sourceBlockTemplates[sourceBlockTemplateId - 1].append(currentWord);
                    this.removeWordsFromGuessed(currentWord);
                }
            });

            setTimeout(() => {
                currentWord.classList.remove(styles['remove-animation']);
            }, 0);
        } else if (currentWord.closest('#source') && currentWord.classList.contains('part')) {
            currentWord.classList.add(styles['remove-animation']);

            this.addWordsToGuessed(currentWord);

            resultBlockTemplates[count].append(currentWord);
            count += 1;

            if (count === this.stringLength) {
                count = 0;
            }

            setTimeout(() => {
                currentWord.classList.remove(styles['remove-animation']);
            }, 0);
        }

        if (!currentWord.classList.contains('btn') && !this.isOrderCorrect) {
            this.checkWin();
        }

        this.enableCheckButton();
    };

    private handleLevelSelect = (event: Event) => {
        const currentLevel = event.target as HTMLSelectElement;
        const currentLevelValue = Number(currentLevel.value);

        this.level = currentLevelValue;
        this.isOrderCorrect = false;
        this.guessedElements = [];
        this.guessedWordOrder = [];
        this.clearGuessedData();
        this.round = 1;
        this.sentence = 0;
        this.fetchData(this.level);
        this.saveLevelState(currentLevelValue);
        localStorage.removeItem('gameState');
    };

    private handleRoundSelect = (event: Event) => {
        const currentRound = event.target as HTMLSelectElement;
        const currentRoundValue = Number(currentRound.value);

        this.round = currentRoundValue;
        this.isOrderCorrect = false;
        this.guessedElements = [];
        this.guessedWordOrder = [];
        this.clearGuessedData();
        this.sentence = 0;
        this.fetchData(this.level);
        this.saveRoundState(currentRoundValue);
        localStorage.removeItem('gameState');
    };

    private addWordsToGuessed(word: HTMLElement) {
        const wordText = word.textContent as string;
        this.guessedWordOrder.push(wordText);
        this.guessedElements.push(word);
    }

    private removeWordsFromGuessed(word: HTMLElement) {
        const wordText = word.textContent as string;
        const wordIndex = this.guessedWordOrder.indexOf(wordText);
        const elementIndex = this.guessedElements.indexOf(word);

        if (wordIndex >= 0) {
            this.guessedWordOrder.splice(wordIndex, 1);
            this.guessedElements.splice(elementIndex, 1);
        }
    }

    private checkWin() {
        if (this.correctWordOrder.length !== this.guessedWordOrder.length) {
            this.isOrderCorrect = false;
        }

        this.isOrderCorrect = this.correctWordOrder.every((value, index) => value === this.guessedWordOrder[index]);
        this.addGuessedSentences();
    }

    private checkGuess = () => {
        const MAX_SENTENCE_INDEX = 9;

        for (let i = 0; i < this.correctWordOrder.length; i += 1) {
            const word1 = this.correctWordOrder[i];
            const word2 = this.guessedWordOrder[i];
            const currentElement = this.guessedElements[i];

            if (word1 === word2) {
                currentElement.classList.add('match');
                currentElement.classList.remove('mismatch');
            } else {
                currentElement.classList.remove('match');
                currentElement.classList.add('mismatch');
            }
        }

        if (this.isOrderCorrect) {
            this.checkButton.removeListener('click', this.checkGuess);
            this.checkButton.setTextContent('Continue');
            this.checkButton.addListener('click', this.handleContinueButton);
            MainPage.showTranslationByLevelComplete();
            this.autocompleteButton.setAttribute(FormAttribute.DISABLED, 'true');

            if (!this.isSentenceAutocompleted) {
                this.addGuessedToStatistic();
            }

            if (this.sentence === MAX_SENTENCE_INDEX) {
                const completeButton = this.autocompleteButton.getNode();
                completeButton.remove();
                this.resultsButton.removeClass(styles.hidden);

                MainPage.saveGameState(
                    this.guessedSentences,
                    this.guessedToStatistic,
                    this.notGuessedToStatistic,
                    this.sentence,
                    this.levelData,
                    this.guessedAudioExamples,
                    this.noteGuessedAudioExamples,
                    this.completedRounds,
                    this.completedLevels,
                );
            }
        }
    };

    private enableCheckButton() {
        const compareCondition = this.correctWordOrder.length === this.guessedWordOrder.length;
        MainPage.changeButtonState(this.checkButton, compareCondition);
    }

    private addGuessedSentences() {
        if (this.isOrderCorrect) {
            this.guessedSentences.push(this.correctWordOrder);
        } else {
            this.guessedSentences.splice(this.sentence, 1);
        }
    }

    private addNotGuessedToStatistic() {
        if (this.isOrderCorrect) {
            this.notGuessedToStatistic.push(this.correctWordOrder);
            this.noteGuessedAudioExamples.push(this.audioExample);
        } else {
            this.notGuessedToStatistic.splice(this.sentence, 1);
            this.noteGuessedAudioExamples.slice(this.sentence, 1);
        }
    }

    private addGuessedToStatistic() {
        if (this.isOrderCorrect) {
            this.guessedToStatistic.push(this.correctWordOrder);
            this.guessedAudioExamples.push(this.audioExample);
        } else {
            this.guessedToStatistic.splice(this.sentence, 1);
            this.guessedAudioExamples.slice(this.sentence, 1);
        }
    }

    static changeButtonState(btn: BaseComponent, condition: boolean) {
        if (condition) {
            btn.removeAttribute(FormAttribute.DISABLED);
        } else {
            btn.setAttribute(FormAttribute.DISABLED, 'true');
        }
    }

    private handleContinueButton = () => {
        const MAX_SENTENCE_INDEX = 10;
        const MAX_LEVEL_INDEX = 6;
        const PENULTIMATE_SENTENCE_INDEX = 9;

        this.sentence += 1;

        if (this.sentence === MAX_SENTENCE_INDEX) {
            console.log('next round starts');
            this.completedRounds.push(this.round);
            this.round += 1;
            this.sentence = 0;
            this.clearGuessedData();
        }

        if (this.round === this.roundsCount + 1) {
            console.log('next level starts');
            this.completedLevels.push(this.level);
            this.completedRounds = [];
            this.level += 1;
            this.round = 1;
            this.sentence = 0;
            this.clearGuessedData();
        }

        this.isOrderCorrect = false;
        this.guessedElements = [];
        this.guessedWordOrder = [];
        this.checkButton.removeListener('click', this.handleContinueButton);

        MainPage.saveGameState(
            this.guessedSentences,
            this.guessedToStatistic,
            this.notGuessedToStatistic,
            this.sentence,
            this.levelData,
            this.guessedAudioExamples,
            this.noteGuessedAudioExamples,
            this.completedRounds,
            this.completedLevels,
        );

        if (this.sentence === PENULTIMATE_SENTENCE_INDEX) {
            this.saveRoundState();
            this.saveLevelState();
        }

        if (this.level > MAX_LEVEL_INDEX) {
            this.completedLevels = [];
            this.level = 1;
        }

        this.fetchData(this.level);
    };

    private autocompleteSentence = () => {
        const resultBlockTemplates = document.querySelectorAll(`#row-${this.sentence + 1} .result-template`);
        const sourceTemplates = document.querySelectorAll('.source-template');

        this.guessedWordOrder = [];

        this.correctWordOrder.forEach((word) => {
            const part = span(['part'], word);

            this.addWordsToGuessed(part.getNode());
        });

        resultBlockTemplates.forEach((template, index) => {
            const templateElement = template;
            const part = span(['part'], this.correctWordOrder[index]);
            const partElement = part.getNode();

            part.addClass('match');
            partElement.classList.add(styles['remove-animation']);

            templateElement.innerHTML = '';
            template.append(partElement);

            setTimeout(() => {
                partElement.classList.remove(styles['remove-animation']);
            }, 0);
        });

        // clear source block after button click
        sourceTemplates.forEach((template) => {
            const templateElement = template;
            templateElement.innerHTML = '';
        });

        this.isSentenceAutocompleted = true;

        this.checkWin();
        this.checkGuess();
        this.enableCheckButton();
        this.isOrderCorrect = true;
        this.autocompleteButton.setAttribute(FormAttribute.DISABLED, 'true');
        MainPage.showTranslationByLevelComplete();
        MainPage.showAudioByLevelComplete();

        this.addNotGuessedToStatistic();
    };

    static showTranslationByLevelComplete() {
        const translationElement = document.querySelector('#translation-text');
        translationElement?.classList.remove('hidden');
    }

    static showAudioByLevelComplete() {
        const translationElement = document.querySelector('#audio-icon');
        translationElement?.classList.remove('hidden');
    }

    private getHintsState() {
        const hintsStateJSON = localStorage.getItem('hintsState');

        if (hintsStateJSON) {
            const hintsState = JSON.parse(hintsStateJSON);

            this.hintsState = {
                translation: hintsState.translation,
                pronunciation: hintsState.pronunciation,
            };
        }
    }

    private saveLevelState(value?: number) {
        const MAX_LEVEL_INDEX = 6;
        const currentLevelOptionElement = document.querySelector(`.level-option[selected='true']`) as HTMLOptionElement;
        let levelValue = Number(currentLevelOptionElement.value);

        if (levelValue === MAX_LEVEL_INDEX && this.round === this.roundsCount) {
            levelValue = 1;
        }

        if (this.round === this.roundsCount && this.level < MAX_LEVEL_INDEX) {
            levelValue += 1;
        }

        const levelState = { level: value || levelValue };
        const levelStateJSON = JSON.stringify(levelState);

        localStorage.setItem('levelState', levelStateJSON);
    }

    private saveRoundState(value?: number) {
        const currentRoundOptionElement = document.querySelector(`.round-option[selected='true']`) as HTMLOptionElement;
        let roundValue = Number(currentRoundOptionElement.value) + 1;

        if (roundValue === this.roundsCount + 1) {
            roundValue = 1;
        }

        const roundState = { round: value || roundValue };
        const roundStateJSON = JSON.stringify(roundState);

        localStorage.setItem('roundState', roundStateJSON);
    }

    static saveGameState(
        guessedSentencesValue: string[][],
        guessedToStatisticValue: string[][],
        notGuessedToStatisticValue: string[][],
        sentence: number,
        artworkData: LevelData,
        guessedAudio: string[],
        notGuessedAudio: string[],
        completedRounds: number[],
        completedLevels: number[],
    ) {
        const gameState = {
            guessedSentences: guessedSentencesValue,
            guessedToStatistic: guessedToStatisticValue,
            notGuessedToStatistic: notGuessedToStatisticValue,
            sentenceNumber: sentence,
            artwork: artworkData,
            guessedAudioExamples: guessedAudio,
            notGuessedAudioExamples: notGuessedAudio,
            completedRounds,
            completedLevels,
        };
        const gameStateJSON = JSON.stringify(gameState);

        localStorage.setItem('gameState', gameStateJSON);
    }

    private getGameState() {
        const levelStateJSON = localStorage.getItem('levelState');
        const roundStateJSON = localStorage.getItem('roundState');
        const gameStateJSON = localStorage.getItem('gameState');

        if (levelStateJSON) {
            const levelState = JSON.parse(levelStateJSON);

            this.level = levelState.level;
        } else {
            this.level = 1;
        }

        if (roundStateJSON) {
            const roundState = JSON.parse(roundStateJSON);

            this.round = roundState.round;
        } else {
            this.round = 1;
        }

        if (gameStateJSON) {
            const gameState = JSON.parse(gameStateJSON);

            this.guessedSentences = gameState.guessedSentences;
            this.guessedToStatistic = gameState.guessedToStatistic;
            this.notGuessedToStatistic = gameState.notGuessedToStatistic;
            this.sentence = gameState.sentenceNumber;
            this.completedRounds = gameState.completedRounds;
            this.completedLevels = gameState.completedLevels;
        } else {
            this.guessedSentences = [];
            this.guessedToStatistic = [];
            this.notGuessedToStatistic = [];
            this.sentence = 0;
            this.completedRounds = [];
            this.completedLevels = [];
        }

        this.fetchData(this.level);
    }

    private openStatisticPage = () => {
        MainPage.saveGameState(
            this.guessedSentences,
            this.guessedToStatistic,
            this.notGuessedToStatistic,
            this.sentence,
            this.levelData,
            this.guessedAudioExamples,
            this.noteGuessedAudioExamples,
            this.completedRounds,
            this.completedLevels,
        );

        if (this.setAppState) {
            this.setAppState(AppPage.STATISTIC_PAGE);
        }

        this.handleContinueButton();
    };

    private clearGuessedData() {
        this.guessedSentences = [];
        this.guessedToStatistic = [];
        this.notGuessedToStatistic = [];
        this.guessedAudioExamples = [];
        this.noteGuessedAudioExamples = [];
    }
}
