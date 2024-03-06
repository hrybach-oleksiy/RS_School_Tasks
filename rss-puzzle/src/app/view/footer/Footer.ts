import BaseComponent from '../../components/BaseComponent';

export default class Footer extends BaseComponent {
    // private content: string = '';

    constructor() {
        super({
            tag: 'footer',
            classNames: ['footer'],
            text: 'Footer',
        });
        // Footer.createElement();
    }

    // static createElement() {
    //     const params = {
    //         tag: 'footer',
    //         classNames: ['footer'],
    //         text: 'Footer',
    //     };
    //     const element = new BaseComponent(params);
    // }
}
