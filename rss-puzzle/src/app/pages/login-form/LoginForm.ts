import BaseComponent from '../../components/BaseComponent';
import { h1, input, button, div, label } from '../../components/HTMLComponents';

import { FormAttribute, AppPage } from '../../../types/enums';
import assertIsDefined from '../../../utilities/assertIsDefined';

import styles from './LoginForm.module.scss';

export default class LoginForm extends BaseComponent {
    private nameInput?: BaseComponent;

    private surnameInput?: BaseComponent;

    private loginButton: BaseComponent = button(['button', 'btn'], 'Login');

    private isNameValid: boolean = false;

    private isSurnameValid: boolean = false;

    constructor(setAppState?: (page: string) => void) {
        super({
            tag: 'form',
            classNames: [styles.form],
        });
        this.setAttribute(FormAttribute.ACTION, '');

        this.setForm();
        this.addListener('submit', (event) => {
            event.preventDefault();
            this.saveFormData();
            this.clearForm();
            this.destroy();

            if (setAppState) {
                setAppState(AppPage.START_PAGE);
            }
        });
    }

    private setForm() {
        const title = h1(['form__title', 'title'], 'Login');
        const nameLabel = label([styles.label], 'Name');
        const surnameLabel = label([styles.label], 'Surname');
        const nameErrorMessageElement = div([styles['name-error'], styles.hidden]);
        const surnameErrorMessageElement = div([styles['surname-error'], styles.hidden]);

        this.nameInput = input([styles.input], 'name', 'name', 'Enter your Name', 'true', (event) => {
            this.validateName(event);
        });
        this.surnameInput = input([styles.input], 'surname', 'surname', 'Enter your Surname', 'true', (event) => {
            this.validateSurname(event);
        });

        nameLabel.setAttribute(FormAttribute.FOR, 'name');
        surnameLabel.setAttribute(FormAttribute.FOR, 'surname');

        const nameTextField = div([styles['text-field']], nameLabel, this.nameInput, nameErrorMessageElement);
        const surnameTextField = div(
            [styles['text-field']],
            surnameLabel,
            this.surnameInput,
            surnameErrorMessageElement,
        );

        this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');

        this.appendChildren([title, nameTextField, surnameTextField, this.loginButton]);
    }

    toggleButtonState() {
        if (this.isNameValid && this.isSurnameValid) {
            this.loginButton.removeAttribute(FormAttribute.DISABLED);
        } else {
            this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');
        }
    }

    private toggleInputState(isValid: boolean, inputElement: HTMLInputElement, inputName: string) {
        inputElement.classList.toggle(styles.valid, isValid);
        inputElement.classList.toggle(styles.invalid, !isValid);

        if (inputName === 'name') {
            this.isNameValid = isValid;
        }

        if (inputName === 'surname') {
            this.isSurnameValid = isValid;
        }

        if (inputElement.value.length === 0) {
            inputElement.classList.remove(styles.valid);
            inputElement.classList.remove(styles.invalid);

            if (inputName === 'name') {
                this.isNameValid = false;
            }

            if (inputName === 'surname') {
                this.isSurnameValid = false;
            }
        }

        this.toggleButtonState();
    }

    private validateName(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isValid = LoginForm.validateForm(inputElement, `.${styles['name-error']}`, 3);

        this.toggleInputState(isValid, inputElement, inputElement.name);
    }

    private validateSurname(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isValid = LoginForm.validateForm(inputElement, `.${styles['surname-error']}`, 4);

        this.toggleInputState(isValid, inputElement, inputElement.name);
    }

    static isFirstLetterUppercase(value: string) {
        return /^[A-Z]/.test(value);
    }

    static validateForm(inputElement: HTMLInputElement, errorMessageSelector: string, length: number) {
        const inputValue = inputElement.value;
        const errorMessageElement = document.querySelector<HTMLElement>(errorMessageSelector);
        const nameRegex = /^[A-Za-z-]+$/;

        assertIsDefined(errorMessageElement);

        if (inputValue.trim() === '') {
            LoginForm.hideErrorMessage(errorMessageElement);
            return false;
        }

        if (!nameRegex.test(inputValue)) {
            LoginForm.showErrorMessage(
                errorMessageElement,
                'Field only accept English alphabet letters and the hyphen (" - ") symbol',
            );
            return false;
        }

        if (!LoginForm.isFirstLetterUppercase(inputValue)) {
            LoginForm.showErrorMessage(errorMessageElement, 'First letter of the field must be in uppercase');
            return false;
        }

        if (inputValue.length < length) {
            const errorMessage = `Minimum length of the ${
                length === 3 ? 'first name' : 'surname'
            } is ${length} characters`;
            LoginForm.showErrorMessage(errorMessageElement, errorMessage);
            return false;
        }

        LoginForm.hideErrorMessage(errorMessageElement);
        return true;
    }

    static showErrorMessage(errorMessageElement: HTMLElement, message: string) {
        const messageElem = errorMessageElement;
        errorMessageElement.classList.remove(styles.hidden);
        messageElem.textContent = message;
    }

    static hideErrorMessage(errorMessageElement: HTMLElement) {
        const messageElem = errorMessageElement;
        errorMessageElement.classList.add(styles.hidden);
        messageElem.textContent = '';
    }

    private saveFormData() {
        const nameInput = this.nameInput?.getNode() as HTMLInputElement;
        const surnameInput = this.surnameInput?.getNode() as HTMLInputElement;

        assertIsDefined(nameInput);
        assertIsDefined(surnameInput);

        const userData = { name: nameInput.value, surname: surnameInput.value };
        const userDataJSON = JSON.stringify(userData);

        localStorage.setItem('userData', userDataJSON);
    }

    private clearForm() {
        (this.getNode() as HTMLFormElement).reset();
        this.nameInput?.removeClass(styles.valid);
        this.surnameInput?.removeClass(styles.valid);
    }
}
