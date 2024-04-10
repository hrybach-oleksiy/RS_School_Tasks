import BaseComponent from '../../components/BaseComponent';
import { h1, input, button, div, label } from '../../components/HTMLComponents';

import { FormAttribute } from '../../../types/enums';
// import { UserLoginData } from '../../../types/interfaces';
import { assertIsDefined, isFirstLetterUppercase } from '../../../utilities/utils';

import styles from './LoginView.module.scss';

import { UserData } from '../../../types/interfaces';

export default class LoginView extends BaseComponent {
  private nameInput?: BaseComponent;

  private passwordInput?: BaseComponent;

  private loginButton: BaseComponent = button(['button', 'btn', 'login-btn'], 'Login');

  private isNameValid: boolean = false;

  private isPasswordValid: boolean = false;

  private loginCallback: (login: string, password: string) => void;

  private setUserDataCallback: (userData: UserData) => void;

  constructor(
    loginCallback: (login: string, password: string) => void,
    setUserDataCallback: (userData: UserData) => void,
  ) {
    super({
      tag: 'form',
      classNames: [styles.form, 'form'],
    });

    this.loginCallback = loginCallback;
    this.setUserDataCallback = setUserDataCallback;

    this.setAttribute(FormAttribute.ACTION, '');

    this.addListener('submit', (event) => {
      event.preventDefault();
      this.saveUserData();
    });

    document.addEventListener('keydown', this.handleKeyDown);
  }

  public setForm() {
    const title = h1(['form__title', 'title'], 'Login');
    const nameLabel = label([styles.label], 'Name');
    const passwordLabel = label([styles.label], 'Password');
    const nameErrorMessageElement = div([styles['name-error'], styles.hidden]);
    const surnameErrorMessageElement = div([styles['password-error'], styles.hidden]);

    this.nameInput = input(
      [styles.input, 'name-input'],
      'name',
      'name',
      'text',
      'Enter your Name',
      'true',
      (event: Event) => {
        this.validateName(event);
      },
    );
    this.passwordInput = input(
      [styles.input],
      'password',
      'password',
      'password',
      'Enter your Password',
      'true',
      (event: Event) => {
        this.validatePassword(event);
      },
    );

    nameLabel.setAttribute(FormAttribute.FOR, 'name');
    passwordLabel.setAttribute(FormAttribute.FOR, 'password');

    const nameTextField = div([styles['text-field']], nameLabel, this.nameInput, nameErrorMessageElement);
    const surnameTextField = div([styles['text-field']], passwordLabel, this.passwordInput, surnameErrorMessageElement);

    this.loginButton.setAttribute(FormAttribute.DISABLED, 'true');

    this.appendChildren([title, nameTextField, surnameTextField, this.loginButton]);
  }

  private toggleLoginButtonState() {
    if (this.isNameValid && this.isPasswordValid) {
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

    if (inputName === 'password') {
      this.isPasswordValid = isValid;
    }

    if (inputElement.value.length === 0) {
      inputElement.classList.remove(styles.valid);
      inputElement.classList.remove(styles.invalid);

      if (inputName === 'name') {
        this.isNameValid = false;
      }

      if (inputName === 'password') {
        this.isPasswordValid = false;
      }
    }

    this.toggleLoginButtonState();
  }

  private validateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isValid = LoginView.validateTextField(inputElement);

    this.toggleInputState(isValid, inputElement, inputElement.name);
  }

  private validatePassword(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isValid = LoginView.validatePasswordField(inputElement);

    this.toggleInputState(isValid, inputElement, inputElement.name);
  }

  static validateTextField(inputElement: HTMLInputElement) {
    const inputValue = inputElement.value;
    const errorMessageElement = document.querySelector<HTMLElement>(`.${styles['name-error']}`);
    const nameRegex = /^[A-Za-z-]+$/;
    const MIN_TEXT_LENGTH = 3;

    assertIsDefined(errorMessageElement);

    if (inputValue.trim() === '') {
      LoginView.hideErrorMessage(errorMessageElement);
      return false;
    }

    if (!nameRegex.test(inputValue)) {
      LoginView.showErrorMessage(
        errorMessageElement,
        'Field only accept English alphabet letters and the hyphen (" - ") symbol',
      );
      return false;
    }

    if (!isFirstLetterUppercase(inputValue)) {
      LoginView.showErrorMessage(errorMessageElement, 'First letter of the name must be in uppercase');
      return false;
    }

    if (inputValue.length < MIN_TEXT_LENGTH) {
      const errorMessage = `Minimum length of the name is ${MIN_TEXT_LENGTH} characters`;
      LoginView.showErrorMessage(errorMessageElement, errorMessage);
      return false;
    }

    LoginView.hideErrorMessage(errorMessageElement);
    return true;
  }

  static validatePasswordField(inputElement: HTMLInputElement) {
    const inputValue = inputElement.value;
    const errorMessageElement = document.querySelector<HTMLElement>(`.${styles['password-error']}`);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;

    assertIsDefined(errorMessageElement);

    if (inputValue.trim() === '') {
      LoginView.hideErrorMessage(errorMessageElement);
      return false;
    }

    if (!passwordRegex.test(inputValue)) {
      LoginView.showErrorMessage(
        errorMessageElement,
        'Password must be at least 8 characters long and contain at least one uppercase letter and one number',
      );
      return false;
    }

    // if (inputValue.length < MIN_PASSWORD_LENGTH) {
    //   const errorMessage = `Minimum length of the password is ${MIN_PASSWORD_LENGTH} characters`;
    //   LoginForm.showErrorMessage(errorMessageElement, errorMessage);
    //   return false;
    // }

    LoginView.hideErrorMessage(errorMessageElement);
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

  private saveUserData(): void {
    const nameInput = this.nameInput?.getNode() as HTMLInputElement;
    const passwordInput = this.passwordInput?.getNode() as HTMLInputElement;

    assertIsDefined(nameInput);
    assertIsDefined(passwordInput);

    const userData = { login: nameInput.value, password: passwordInput.value };
    const userDataJSON = JSON.stringify(userData);

    sessionStorage.setItem('userData', userDataJSON);

    this.loginCallback(userData.login, userData.password);
    this.setUserDataCallback(userData);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.isNameValid && this.isPasswordValid) {
      event.preventDefault();
      this.saveUserData();
    }
  };

  // displayErrorMessage(message: string) {
  //   alert(message);
  // }

  // private clearForm() {
  //   (this.getNode() as HTMLFormElement).reset();
  //   this.nameInput?.removeClass(styles.valid);
  //   this.passwordInput?.removeClass(styles.valid);
  // }
}
