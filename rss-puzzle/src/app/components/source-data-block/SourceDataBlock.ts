import BaseComponent from '../BaseComponent';
import { span, div } from '../HTMLComponents';

import { FormAttribute } from '../../../types/enums';

export default class SourceDataBlock extends BaseComponent {
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
