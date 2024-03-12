import BaseComponent from '../BaseComponent';
import { FormAttribute } from '../../../types/enums';

import styles from './ResultBlock.module.scss';

export default class ResultBlock extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classNames: [styles['result-block']],
        });
        this.setAttribute(FormAttribute.ID, 'result');
        this.setupEventListener();
    }

    private setupEventListener() {
        this.addListener('wordClick', (event: Event) => {
            const customEvent = event as CustomEvent;
            const clickedWord = customEvent.detail;
            this.append(clickedWord);
        });
        // document.addEventListener('wordClick', (event: Event) => {
        //     const customEvent = event as CustomEvent;
        //     const clickedWord = customEvent.detail;
        //     this.append(clickedWord);
        // });
    }
}
