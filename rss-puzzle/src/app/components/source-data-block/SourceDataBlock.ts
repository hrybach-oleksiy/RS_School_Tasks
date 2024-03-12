import BaseComponent from '../BaseComponent';
import data from '../../../api/wordsCollectionLevel1.json';
import { GameData } from '../../../types/interfaces';
import { span } from '../HTMLComponents';
import { FormAttribute } from '../../../types/enums';
// import assertIsDefined from '../../../utilities/assertIsDefined';

import styles from './SourceDataBlock.module.scss';

export default class SourceDataBlock extends BaseComponent {
    gameData: GameData = data;

    level: number = 0;

    sentence: number = 0;

    words: string[];

    constructor(words: string[]) {
        super({
            tag: 'div',
            classNames: [styles['source-data']],
        });

        this.setAttribute(FormAttribute.ID, 'source');
        this.words = words;
        this.addWordsToBlock();
    }

    private addWordsToBlock() {
        this.words.forEach((word) => {
            const sentencePartElement = span([styles.part, 'part'], word);
            this.append(sentencePartElement);
        });
    }

    // private moveWordsToResultBlock() {
    //     const sentencePartElements = this.getChildren();

    //     sentencePartElements.forEach((part) => {
    //         const singleWord = part.getNode();
    //         const wordClickEvent = new CustomEvent('wordClick', { detail: part, bubbles: true });

    //         singleWord.addEventListener('click', () => {
    //             singleWord.dispatchEvent(wordClickEvent);
    //         });
    //     });
    // }
}
