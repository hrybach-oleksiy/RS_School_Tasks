import BaseComponent from './BaseComponent';
import Input from './input/Input';
import Button from './button/Button';

type EventCallback = EventListenerOrEventListenerObject;

const div = (classNames: string[], ...children: BaseComponent[]) =>
    new BaseComponent({ tag: 'div', classNames }, ...children);

const p = (classNames: string[], text: string) => new BaseComponent({ tag: 'p', classNames, text });

const h1 = (classNames: string[], text: string) => new BaseComponent({ tag: 'h1', classNames, text });

const input = (
    classNames: string[],
    id: string,
    name: string,
    placeholder: string,
    required: string,
    onChange?: EventCallback,
) => new Input({ classNames, id, name, placeholder, required, onChange });

const label = (classNames: string[], text: string) => new BaseComponent({ tag: 'label', classNames, text });

const button = (classNames: string[], text?: string, onClick?: EventCallback) =>
    new Button({ classNames, text, onClick });

export { div, p, h1, input, button, label };
