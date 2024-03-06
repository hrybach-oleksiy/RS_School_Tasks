import BaseComponent from './BaseComponent';
import Input from './input/Input';

type EventCallback = EventListenerOrEventListenerObject;

const div = (classNames: string[], ...children: BaseComponent[]) =>
    new BaseComponent({ tag: 'div', classNames }, ...children);

const p = (classNames: string[], text: string) => new BaseComponent({ tag: 'p', classNames, text });

const h1 = (classNames: string[], text: string) => new BaseComponent({ tag: 'h1', classNames, text });

const input = (classNames: string[], text: string, onChange: EventCallback) =>
    new Input({ classNames, text, onChange });

export { div, p, h1, input };
