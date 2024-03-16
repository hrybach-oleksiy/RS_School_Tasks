import BaseComponent from '../BaseComponent';
import { p } from '../HTMLComponents';

import styles from './GameHeader.module.scss';

export default class GameHeader extends BaseComponent {
    private translation: string;

    constructor(translation: string) {
        super({
            tag: 'div',
            classNames: ['game-header-wrapper'],
        });
        this.translation = translation;
        this.setBlock();
    }

    private setBlock() {
        const paragraph = p([styles.translation], this.translation);
        this.append(paragraph);
    }
}
