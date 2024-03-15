import BaseComponent from '../BaseComponent';
import data from '../../../api/wordsCollectionLevel1.json';
import { GameData } from '../../../types/interfaces';
import { span, div } from '../HTMLComponents';
import { FormAttribute } from '../../../types/enums';
// import assertIsDefined from '../../../utilities/assertIsDefined';

// import styles from './SourceDataBlock.module.scss';

export default class SourceDataBlock extends BaseComponent {
    private gameData: GameData = data;

    // level: number = 0;

    // sentence: number = 0;

    private words: string[];

    constructor(words: string[]) {
        super({
            tag: 'div',
            classNames: ['source-data'],
        });

        this.setAttribute(FormAttribute.ID, 'source');
        this.words = words;
        this.addTemplates();
    }

    private createParts() {
        return this.words.map((word, index) => {
            const part = span(['part'], word);
            part.setAttribute(FormAttribute.ID, `part-${String(index + 1)}`);
            return part;
        });
    }

    private addTemplates() {
        const parts = this.createParts();

        for (let i = 0; i < this.words.length; i += 1) {
            const template = div(['source-template']);
            template.setAttribute(FormAttribute.ID, `template-${String(i + 1)}`);
            template.append(parts[i]);
            this.append(template);
        }
    }
}
