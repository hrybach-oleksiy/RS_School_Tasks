import BaseComponent from '../BaseComponent';

interface InputProps {
    classNames?: string[];
    text?: string;
    onChange?: EventListenerOrEventListenerObject;
}

export default class Input extends BaseComponent {
    private onChange?: EventListenerOrEventListenerObject;

    constructor({ classNames, text, onChange }: InputProps) {
        super({ tag: 'input', classNames, text });

        if (onChange) {
            this.onChange = onChange;
            this.addListener('change', this.onChange);
        }
    }

    destroy() {
        if (this.onChange) {
            this.removeListener('change', this.onChange);
            super.destroy();
        }
    }
}
