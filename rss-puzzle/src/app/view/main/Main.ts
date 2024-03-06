import BaseComponent from '../../components/BaseComponent';

export default class Main extends BaseComponent {
    constructor() {
        super({
            tag: 'main',
            classNames: ['main'],
            text: 'main',
        });
    }
}
