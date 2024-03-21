import BaseComponent from '../../components/BaseComponent';
// import { button, div } from '../../components/HTMLComponents';

// import styles from './Header.module.scss';

export default class Winners extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classNames: ['winners', 'page'],
            text: 'Winners',
        });

        // this.setContent();
    }

    // private setContent() {
    //     const buttonsWrapper = div(['wrapper']);
    //     const garageButton = button(['btn'], 'Garage', () => {
    //         console.log('Garage Button Clicked');
    //     });

    //     const winnersButton = button(['btn'], 'Winners', () => {
    //         console.log('Winners Button Clicked');
    //     });

    //     buttonsWrapper.appendChildren([garageButton, winnersButton]);
    //     this.append(buttonsWrapper);
    // }
}
