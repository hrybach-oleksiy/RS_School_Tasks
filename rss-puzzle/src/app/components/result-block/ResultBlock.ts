import BaseComponent from '../BaseComponent';
import { FormAttribute } from '../../../types/enums';
import { div } from '../HTMLComponents';

import styles from './ResultBlock.module.scss';

export default class ResultBlock extends BaseComponent {
    stringLength: number;

    rows: number = 10;

    constructor(stringLength: number) {
        super({
            tag: 'div',
            classNames: [styles['result-block']],
        });
        this.setAttribute(FormAttribute.ID, 'result');
        this.stringLength = stringLength;
        this.setPage();
    }

    private setPage() {
        const templates = this.setRow();

        for (let i = 0; i < this.rows; i += 1) {
            const row = div([styles['result-row']]);
            row.setAttribute(FormAttribute.ID, `row-${i + 1}`);

            if (i === 0) {
                row.appendChildren(templates);
            }
            this.append(row);
        }
    }

    private setRow() {
        const templates = [];
        for (let i = 0; i < this.stringLength; i += 1) {
            const template = div(['result-template']);
            template.setAttribute(FormAttribute.ID, `template-${String(i + 1)}`);
            templates.push(template);
        }
        return templates;
    }
}
