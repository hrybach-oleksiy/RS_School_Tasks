import BaseComponent from '../BaseComponent';
import { span, label, h2 } from '../HTMLComponents';

import Input from '../input/Input';

import { InputProps } from '../../../types/interfaces';
import { FormAttribute } from '../../../types/enums';

import styles from './Hint.module.scss';

export default class Hint extends BaseComponent {
    title: string;

    inputState: boolean;

    props: InputProps;

    constructor(title: string, inputState: boolean, props: InputProps) {
        super({
            tag: 'div',
            classNames: [styles['hint-wrapper']],
        });

        this.title = title;
        this.inputState = inputState;
        this.props = props;
        this.setBlock();
    }

    private setBlock() {
        const title = h2([styles.title], this.title);
        const hintLabel = label([styles.switch], '');
        const hintInput = new Input(this.props);
        const hintSpan = span([styles.slider, styles.round], '');

        if (this.inputState) {
            hintInput.setAttribute(FormAttribute.CHECKED, 'true');
        } else {
            hintInput.removeAttribute(FormAttribute.CHECKED);
        }

        hintLabel.appendChildren([hintInput, hintSpan]);
        this.appendChildren([title, hintLabel]);
    }
}
