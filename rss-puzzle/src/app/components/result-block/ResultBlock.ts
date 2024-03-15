import BaseComponent from '../BaseComponent';
import { FormAttribute } from '../../../types/enums';
import { div, span } from '../HTMLComponents';

// import styles from './ResultBlock.module.scss';

export default class ResultBlock extends BaseComponent {
    // const ROWS_NUMBER = 10;rss
    private stringLength: number;

    private rows: number = 10;

    private guessedSentences: string[][];

    constructor(stringLength: number, guessedSentences: string[][]) {
        super({
            tag: 'div',
            classNames: ['result-block'],
        });
        this.setAttribute(FormAttribute.ID, 'result');
        this.stringLength = stringLength;
        this.guessedSentences = guessedSentences;
        this.setPage();
    }

    private setPage() {
        const templates = this.createTemplates();

        for (let i = 0; i < this.rows; i += 1) {
            const row = div(['result-row']);
            row.setAttribute(FormAttribute.ID, `row-${i + 1}`);

            if (i === this.guessedSentences.length) {
                row.appendChildren(templates);
            } else {
                this.addGuessedSentence(row, i);
            }

            this.append(row);
        }
    }

    private createTemplates() {
        const templates = [];

        for (let i = 0; i < this.stringLength; i += 1) {
            const template = div(['result-template']);

            template.setAttribute(FormAttribute.ID, `template-${String(i + 1)}`);
            templates.push(template);
        }

        return templates;
    }

    private createParts(index: number) {
        return this.guessedSentences[index]?.map((word) => {
            const part = span(['part'], word);
            return part;
        });
    }

    private addGuessedSentence(row: BaseComponent, index: number) {
        const parts = this.createParts(index);

        for (let i = 0; i < this.guessedSentences[index]?.length; i += 1) {
            const template = div(['result-template']);
            parts[i].addClass('match');

            template.setAttribute(FormAttribute.ID, `template-${String(i + 1)}`);
            template.append(parts[i]);
            row.append(template);
        }
    }
}
