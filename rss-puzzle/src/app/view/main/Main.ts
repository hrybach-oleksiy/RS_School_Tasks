import BaseComponent from '../../components/BaseComponent';
import LoginForm from '../../components/login-form/LoginForm';

export default class Main extends BaseComponent {
    constructor() {
        super({
            tag: 'main',
            classNames: ['main'],
        });
        const form = new LoginForm();
        this.append(form);
    }
}
