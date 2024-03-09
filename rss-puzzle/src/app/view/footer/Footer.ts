import BaseComponent from '../../components/BaseComponent';

// import styles from './footer.module.scss';

export default class Footer extends BaseComponent {
    constructor() {
        super({
            tag: 'footer',
            classNames: ['footer'],
            text: 'Footer',
        });
    }
}
