import BaseComponent from '../BaseComponent';
import { p } from '../HTMLComponents';
import Hint from '../hint/Hint';
import { HintsState } from '../../../types/interfaces';
import { FormAttribute } from '../../../types/enums';

import styles from './GameHeader.module.scss';

export default class GameHeader extends BaseComponent {
    private translation: string;

    private hintsState: HintsState;

    constructor(translation: string, hintsState: HintsState) {
        super({
            tag: 'div',
            classNames: [styles['game-header-wrapper']],
        });
        this.translation = translation;
        this.hintsState = hintsState;
        this.setBlock();
    }

    private setBlock() {
        this.destroyChildren();
        // const translationText = this.hintsState.translation ? this.translation : '';
        const paragraph = p([styles.translation], this.translation);
        const translationProps = {
            id: 'translation',
            name: 'translation',
            type: 'checkbox',
            onChange: this.handleHintChange,
        };
        const hint = new Hint('Translation', this.hintsState.translation, translationProps);

        if (this.hintsState.translation) {
            paragraph.removeClass('hidden');
        } else {
            paragraph.addClass('hidden');
        }

        paragraph.setAttribute(FormAttribute.ID, 'translation-text');

        this.appendChildren([hint, paragraph]);
    }

    private handleHintChange = (event: Event) => {
        const currentHint = event.target as HTMLInputElement;
        const isHintChecked = currentHint.checked;
        const hintName = currentHint.name;

        if (isHintChecked) {
            this.setHintState(hintName, true);
        } else {
            this.setHintState(hintName, false);
        }
    };

    private setHintState(hintName: keyof HintsState, value: boolean) {
        this.hintsState[hintName] = value;
        this.setBlock();
    }
}
