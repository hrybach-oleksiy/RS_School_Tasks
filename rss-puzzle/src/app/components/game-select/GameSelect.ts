import BaseComponent from '../BaseComponent';
import { select, option, label } from '../HTMLComponents';

import { FormAttribute } from '../../../types/enums';

import styles from './GameSelect.module.scss';

// <div class="levels">
//             <label for="level">Select Level:</label>
//             <select id="level">
//                 <option value="1">Level 1</option>
//                 <option value="2">Level 2</option>
//                 <option value="3">Level 3</option>
//                 <option value="4">Level 4</option>
//                 <option value="5">Level 5</option>
//                 <option value="6">Level 6</option>
//             </select>
// </div>

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
        const selectLabel = label([styles.label], this.title);
        const selectElement = select([styles.select]);

        for (let i = 1; i <= this.optionsCount; i += 1) {
            const optionElement = option([styles.option], `${i}`);
            optionElement.setAttribute(FormAttribute.VALUE, `${i}`);

            if (i === this.optionValue) {
                optionElement.setAttribute(FormAttribute.SELECTED, `true`);
            }
            selectElement.append(optionElement);
        }

        this.appendChildren([selectLabel, selectElement]);
    }
}
