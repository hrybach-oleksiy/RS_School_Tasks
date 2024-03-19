import BaseComponent from '../BaseComponent';
import { select, option, label } from '../HTMLComponents';

import { FormAttribute } from '../../../types/enums';

import styles from './GameSelect.module.scss';

export default class GameSelect extends BaseComponent {
    title: string;

    optionsCount: number;

    optionValue: number;

    constructor(title: string, optionsCount: number, optionValue: number) {
        super({
            tag: 'div',
            classNames: [styles.levels],
        });

        this.title = title;
        this.optionsCount = optionsCount;
        this.optionValue = optionValue;
        this.setBlock();
    }

    private setBlock() {
        const selectLabel = label(['select-label'], this.title);
        const selectElement = select(['select']);

        for (let i = 1; i <= this.optionsCount; i += 1) {
            const optionElement = option([`${this.title.toLowerCase()}-option`], `${i}`);

            optionElement.setAttribute(FormAttribute.VALUE, `${i}`);

            if (i === this.optionValue) {
                optionElement.setAttribute(FormAttribute.SELECTED, `true`);
            }
            selectElement.append(optionElement);
        }

        this.appendChildren([selectLabel, selectElement]);
    }
}
