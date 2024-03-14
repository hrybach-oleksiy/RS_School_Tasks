import styles from './MainPage.module.scss';
import BaseComponent from '../../components/BaseComponent';
import data from '../../../api/wordsCollectionLevel1.json';
import { GameData } from '../../../types/interfaces';
import ResultBlock from '../../components/result-block/ResultBlock';
import SourceDataBlock from '../../components/source-data-block/SourceDataBlock';
import assertIsDefined from '../../../utilities/assertIsDefined';
import { FormAttribute } from '../../../types/enums';
import { button } from '../../components/HTMLComponents';

export default class MainPage extends BaseComponent {
    gameData: GameData = data;

    level: number = 0;

    sentence: number = 0;

    words: string[] = [];

    resultBlock?: BaseComponent;

    sourceBlock?: BaseComponent;

    stringLength: number = 0;

    correctWordOrder: string[] = [];

    guessedWordOrder: string[] = [];

    isOrderCorrect: boolean = false;

    guessedSentences: string[][] = [];

    continueButton: BaseComponent = button(['continue-btn', 'btn'], 'Continue');

    constructor() {
        super({
            tag: 'section',
            classNames: [styles['main-page']],
        });

        this.shuffleWords();
        this.setPage();
        this.addListener('click', this.handleWordClick);
    }

    private setPage() {
        this.destroyChildren();
        this.continueButton.setAttribute(FormAttribute.DISABLED, 'true');
        this.continueButton.addListener('click', this.handleContinueButton);
        this.resultBlock = new ResultBlock(this.stringLength, this.guessedSentences);
        this.sourceBlock = new SourceDataBlock(this.words);

        this.appendChildren([this.resultBlock, this.sourceBlock, this.continueButton]);
    }

    private getWords(levelNumber: number, sentenceNumber: number) {
        const { rounds } = this.gameData;
        const level = rounds[levelNumber];
        const sentence = level.words[sentenceNumber];
        const words = sentence.textExample;

        this.correctWordOrder = words.split(' ');
        console.log(this.correctWordOrder);

        return words;
    }

    private shuffleWords() {
        const words = this.getWords(this.level, this.sentence).split(' ');

        for (let i = words.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = words[i];
            words[i] = words[j];
            words[j] = temp;
        }

        this.words = words;
        this.stringLength = words.length;
    }

    private handleWordClick = (event: Event) => {
        const currentWord = event.target as HTMLElement;
        const resultBlock = this.resultBlock?.getNode();
        const sourceBlock = this.sourceBlock?.getNode();
        const resultBlockTemplates = document.querySelectorAll(`#row-${this.sentence + 1} .result-template`);
        const sourceBlockTemplates = document.querySelectorAll('.source-template');
        const currentTemplateId = Number(currentWord.getAttribute(FormAttribute.ID)?.slice(-1));
        let count = 0;

        assertIsDefined(resultBlock);
        assertIsDefined(sourceBlock);

        if (currentWord.closest('#result') && currentWord.classList.contains('part')) {
            currentWord.classList.add(styles['remove-animation']);

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

        this.checkWin();
    };

    private addWordsToGuessed(word: HTMLElement) {
        const wordText = word.textContent as string;
        this.guessedWordOrder.push(wordText);
    }

    private removeWordsFromGuessed(word: HTMLElement) {
        const wordText = word.textContent as string;
        const wordIndex = this.guessedWordOrder.indexOf(wordText);

        if (wordIndex >= 0) {
            this.guessedWordOrder.splice(wordIndex, 1);
        }
    }

    private checkWin() {
        if (this.correctWordOrder.length !== this.guessedWordOrder.length) {
            this.isOrderCorrect = false;
        }

        this.isOrderCorrect = this.correctWordOrder.every((value, index) => value === this.guessedWordOrder[index]);
        console.log(this.isOrderCorrect);
        this.addGuessedSentences();
        this.changeButtonState();
    }

    private addGuessedSentences() {
        if (this.isOrderCorrect) {
            this.guessedSentences.push(this.correctWordOrder);
        } else {
            this.guessedSentences.splice(this.sentence, 1);
        }
    }

    private changeButtonState() {
        if (this.isOrderCorrect) {
            this.continueButton.removeAttribute(FormAttribute.DISABLED);
        } else {
            this.continueButton.setAttribute(FormAttribute.DISABLED, 'true');
        }
    }

    private handleContinueButton = () => {
        this.sentence += 1;

        if (this.sentence === 10) {
            console.log('next level starts');
            this.level += 1;
            this.sentence = 0;
            this.guessedSentences = [];
        }

        this.guessedWordOrder = [];
        this.shuffleWords();
        this.setPage();
    };
}
