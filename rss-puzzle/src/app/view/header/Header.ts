import BaseComponent from '../../components/BaseComponent';

export default class Header extends BaseComponent {
    constructor() {
        super({
            tag: 'header',
            classNames: ['header'],
            text: 'header',
        });
    }
}
