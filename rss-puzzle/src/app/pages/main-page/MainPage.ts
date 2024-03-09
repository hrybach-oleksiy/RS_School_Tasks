import styles from './MainPage.module.scss';
import BaseComponent from '../../components/BaseComponent';

export default class MainPage extends BaseComponent {
    constructor() {
        super({
            tag: 'section',
            classNames: [styles['main-page']],
            text: 'Main Page',
        });
    }
}
