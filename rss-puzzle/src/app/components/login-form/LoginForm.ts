import BaseComponent from '../BaseComponent';
import { h1, input, button, div, label } from '../HTMLComponents';
import FormAttribute from '../../../types/enums';

import styles from './LoginForm.module.scss';

export default class LoginForm extends BaseComponent {
    private loginButton: BaseComponent = button(['button', 'btn'], 'Login');

    private nameInputValue: string = '';

    private surnameInputValue: string = '';

    constructor() {
        super({
            tag: 'form',
            classNames: [styles.form],
        });
        this.setAttribute(FormAttribute.ACTION, '');
        this.setForm();
    }

    private setForm() {
        const title = h1(['form__title', 'title'], 'Login');
        const nameLabel = label([styles.label], 'Name');
        const surnameLabel = label([styles.label], 'Surname');
        const nameInput = input([styles.input], 'name', 'name', 'Enter your Name', 'true', (event) => {
            this.nameInputValue = (event.target as HTMLInputElement).value;
            this.toggleButtonState();
        });
        const surnameInput = input([styles.input], 'surname', 'surname', 'Enter your Surname', 'true', (event) => {
            this.surnameInputValue = (event.target as HTMLInputElement).value;
            this.toggleButtonState();
        });

        nameLabel.setAttribute(FormAttribute.FOR, 'name');
        surnameLabel.setAttribute(FormAttribute.FOR, 'surname');

        const nameTextField = div([styles['text-field']], nameLabel, nameInput);
        const surnameTextField = div([styles['text-field']], surnameLabel, surnameInput);

        this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');

        this.appendChildren([title, nameTextField, surnameTextField, this.loginButton]);
    }

    toggleButtonState() {
        if (this.nameInputValue !== '' && this.surnameInputValue !== '') {
            this.loginButton.removeAttribute(FormAttribute.DISABLED);
        } else {
            this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');
        }
    }
}

// https://itchief.ru/html-and-css/styling-text-input

// private enableButton() {
//     // const loginButton = document.querySelector<HTMLButtonElement>('.button');

//     // assertIsDefined(loginButton);

//     if (this.nameInputValueLength && this.surnameInputValueLength) {
//         this.loginButton.removeAttribute(FormAttribute.DISABLED);
//     } else {
//         this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');
//     }
// }

// private validateForm() {
//     const loginButton = document.querySelector<HTMLButtonElement>('.button');

//     assertIsDefined(loginButton);

//     if (this.nameInputValueLength && this.surnameInputValueLength) {
//         loginButton.removeAttribute(FormAttribute.DISABLED);
//     } else {
//         loginButton.setAttribute(FormAttribute.DISABLED, 'true');
//     }
// }
