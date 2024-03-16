import styles from './MainPage.module.scss';
import BaseComponent from '../../components/BaseComponent';
import { GameData, HintsState } from '../../../types/interfaces';
import ResultBlock from '../../components/result-block/ResultBlock';
import SourceDataBlock from '../../components/source-data-block/SourceDataBlock';
import GameHeader from '../../components/game-header/GameHeader';
import { FormAttribute } from '../../../types/enums';
import { button, div, span } from '../../components/HTMLComponents';

export default class MainPage extends BaseComponent {
    private gameData!: GameData;

    private level: number = 1;

    private round: number = 0;

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

    private guessedElements: HTMLElement[] = [];

    private translation: string = '';

    private hintsState: HintsState = {
        translation: false,
    };

    constructor() {
        super({
            tag: 'section',
            classNames: [styles['main-page']],
        });

        this.fetchData(1);
        this.addListener('click', this.handleWordClick);
    }

    private setPage() {
        const btnWrapper = div([styles['btn-wrapper']]);
        const gameHeader = new GameHeader(this.translation, this.hintsState);

        this.destroyChildren();
        this.checkButton.setAttribute(FormAttribute.DISABLED, 'true');
        this.checkButton.setTextContent('Check Answer');
        this.checkButton.addListener('click', this.checkGuess);
        this.autocompleteButton.addListener('click', this.autocompleteSentence);
        this.autocompleteButton.removeAttribute(FormAttribute.DISABLED);
        this.resultBlock = new ResultBlock(this.stringLength, this.guessedSentences);
        this.sourceBlock = new SourceDataBlock(this.words);

        btnWrapper.appendChildren([this.checkButton, this.autocompleteButton]);
        this.appendChildren([gameHeader, this.resultBlock, this.sourceBlock, btnWrapper]);
    }

    private getWords(roundNumber: number, sentenceNumber: number) {
        const { rounds, roundsCount } = this.gameData;
        const round = rounds[roundNumber];
        const sentence = round.words[sentenceNumber];
        const words = sentence.textExample;
        const translation = sentence.textExampleTranslate;

        this.correctWordOrder = words.split(' ');
        this.translation = translation;
        this.roundsCount = roundsCount;
        console.log(this.correctWordOrder);

        return words;
    }

    private shuffleWords() {
        const words = this.getWords(this.round, this.sentence).split(' ');

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
            this.setPage();
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${ссылка из JSON}
    }

    private handleWordClick = (event: Event) => {
        const currentWord = event.target as HTMLElement;
        const resultBlockTemplates = document.querySelectorAll(`#row-${this.sentence + 1} .result-template`);
        const sourceBlockTemplates = document.querySelectorAll('.source-template');

        const currentTemplateId = Number(currentWord.getAttribute(FormAttribute.ID)?.slice(-1));
        let count = 0;

        // currentWord.classList.remove('match');
        // currentWord.classList.remove('mismatch');

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
            if (count === this.stringLength) count = 0;

            setTimeout(() => {
                currentWord.classList.remove(styles['remove-animation']);
            }, 0);
        }

        if (!currentWord.classList.contains('btn') && !this.isOrderCorrect) {
            this.checkWin();
        }

        this.enableCheckButton();
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

    static changeButtonState(btn: BaseComponent, condition: boolean) {
        if (condition) {
            btn.removeAttribute(FormAttribute.DISABLED);
        } else {
            btn.setAttribute(FormAttribute.DISABLED, 'true');
        }
    }

    private handleContinueButton = () => {
        this.sentence += 1;

        if (this.sentence === 10) {
            console.log('next round starts');
            this.round += 1;
            this.sentence = 0;
            this.guessedSentences = [];
        }

        if (this.round === this.roundsCount) {
            console.log('next level starts');
            this.level += 1;
            this.round = 0;
            this.sentence = 0;
            this.guessedSentences = [];
        }

        this.isOrderCorrect = false;
        this.guessedElements = [];
        this.guessedWordOrder = [];
        this.checkButton.removeListener('click', this.handleContinueButton);
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
            part.addClass('match');
            const partElement = part.getNode();

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

        this.checkWin();
        this.checkGuess();
        this.enableCheckButton();
        this.isOrderCorrect = true;
        this.autocompleteButton.setAttribute(FormAttribute.DISABLED, 'true');
        MainPage.showTranslationByLevelComplete();
    };

    static showTranslationByLevelComplete() {
        const translationElement = document.querySelector('#translation-text');
        translationElement?.classList.remove('hidden');
    }
}
