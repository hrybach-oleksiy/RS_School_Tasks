// import assertIsDefined from '../../utilities/assertIsDefined';
import FormAttribute from '../../types/enums';

interface BaseComponentProps {
    tag?: string;
    classNames?: string[];
    text?: string;
}

export default class BaseComponent {
    private children: BaseComponent[] = [];

    private node: HTMLElement;

    constructor({ tag = 'div', classNames = [], text = '' }: BaseComponentProps, ...children: BaseComponent[]) {
        const node = document.createElement(tag);
        node.classList.add(...classNames);
        node.textContent = text;
        this.node = node;

        if (children) {
            this.appendChildren(children);
        }
    }

    public append(child: BaseComponent) {
        this.children.push(child);
        this.node.append(child.getNode());
    }

    public appendChildren(children: BaseComponent[]) {
        children.forEach((el) => {
            this.append(el);
        });
    }

    public getNode(): HTMLElement {
        return this.node;
    }

    public getChildren(): BaseComponent[] {
        return this.children;
    }

    public setTextContent(content: string) {
        this.node.textContent = content;
    }

    public setAttribute(attribute: FormAttribute, value: string) {
        this.node.setAttribute(attribute, value);
    }

    public removeAttribute(attribute: string) {
        this.node.removeAttribute(attribute);
    }

    public addClass(className: string): void {
        this.node.classList.add(className);
    }

    public removeClass(className: string): void {
        this.node.classList.remove(className);
    }

    public toggleClass(className: string) {
        this.node.classList.toggle(className);
    }

    public addListener(event: string, listener: EventListener, options: boolean | AddEventListenerOptions = false) {
        this.node.addEventListener(event, listener, options);
    }

    public removeListener(event: string, listener: EventListener, options: boolean | EventListenerOptions = false) {
        this.node.removeEventListener(event, listener, options);
    }

    public destroyChildren() {
        this.children.forEach((child) => {
            child.destroy();
        });
        this.children.length = 0;
    }

    public destroy() {
        this.destroyChildren();
        this.node.remove();
    }
}
