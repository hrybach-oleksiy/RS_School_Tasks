import BaseComponent from '../../components/BaseComponent';

// import styles from './footer.module.scss';

export default class Footer extends BaseComponent {
    onButtonClick: () => void;

    constructor(onButtonClick: () => void) {
        super({
            tag: 'footer',
            classNames: ['footer'],
            text: 'Footer',
        });

        this.onButtonClick = onButtonClick;
        this.addListener('click', () => {
            this.onButtonClick();
        });
    }
}
