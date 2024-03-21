import BaseComponent from './BaseComponent';
// import Input from './input/Input';
import Button from './button/Button';

type EventCallback = EventListener;

const div = (classNames: string[], ...children: BaseComponent[]) =>
    new BaseComponent({ tag: 'div', classNames }, ...children);

const p = (classNames: string[], text: string) => new BaseComponent({ tag: 'p', classNames, text });

const h1 = (classNames: string[], text: string) => new BaseComponent({ tag: 'h1', classNames, text });
const h2 = (classNames: string[], text: string) => new BaseComponent({ tag: 'h2', classNames, text });

const span = (classNames: string[], text: string) => new BaseComponent({ tag: 'span', classNames, text });

// const input = (
//     classNames: string[],
//     id: string,
//     name: string,
//     placeholder: string,
//     required: string,
//     onChange?: EventCallback,
// ) => new Input({ classNames, id, name, placeholder, required, onChange });

const label = (classNames: string[], text: string) => new BaseComponent({ tag: 'label', classNames, text });

const select = (classNames: string[]) => new BaseComponent({ tag: 'select', classNames });

const option = (classNames: string[], text: string) => new BaseComponent({ tag: 'option', classNames, text });

const button = (classNames: string[], text?: string, onClick?: EventCallback) =>
    new Button({ classNames, text, onClick });

const img = (classNames: string[]) => new BaseComponent({ tag: 'img', classNames });

const ul = (classNames: string[]) => new BaseComponent({ tag: 'ul', classNames });

const li = (classNames: string[], text: string) => new BaseComponent({ tag: 'li', classNames, text });
const a = (classNames: string[]) => new BaseComponent({ tag: 'a', classNames });

export { div, p, h1, button, label, span, h2, img, select, option, ul, li, a };
