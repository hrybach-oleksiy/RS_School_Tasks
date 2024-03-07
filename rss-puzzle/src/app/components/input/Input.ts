import BaseComponent from '../BaseComponent';
import FormAttribute from '../../../types/enums';

interface InputProps {
    classNames?: string[];
    id: string;
    type?: string;
    name: string;
    placeholder: string;
    required?: string;
    onChange?: EventListenerOrEventListenerObject;
}
export default class Input extends BaseComponent {
    private onChange?: EventListenerOrEventListenerObject;

    constructor({ classNames, id, type = 'text', name, placeholder, required, onChange }: InputProps) {
        super({ tag: 'input', classNames });

        this.setAttribute(FormAttribute.ID, id);
        this.setAttribute(FormAttribute.TYPE, type);
        this.setAttribute(FormAttribute.NAME, name);
        this.setAttribute(FormAttribute.PLACEHOLDER, placeholder);

        if (required) {
            this.setAttribute(FormAttribute.REQUIRED, required);
        }

        if (onChange) {
            this.onChange = onChange;
            this.addListener('input', this.onChange);
        }
    }

    destroy() {
        if (this.onChange) {
            this.removeListener('input', this.onChange);
            super.destroy();
        }
    }
}
