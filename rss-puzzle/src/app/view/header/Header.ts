import BaseComponent from '../../components/BaseComponent';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
    constructor() {
        super({
            tag: 'header',
            classNames: [styles.header],
            text: 'RSS Puzzle',
        });
    }
}
