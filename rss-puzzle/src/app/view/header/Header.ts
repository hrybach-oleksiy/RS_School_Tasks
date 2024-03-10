import BaseComponent from '../../components/BaseComponent';
import { p } from '../../components/HTMLComponents';

import styles from './Header.module.scss';

export default class Header extends BaseComponent {
    constructor() {
        super(
            {
                tag: 'header',
                classNames: [styles.header],
            },
            p(['header-title'], 'RSS Puzzle'),
        );
    }
}
