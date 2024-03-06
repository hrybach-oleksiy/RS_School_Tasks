// import assertIsDefined from '../../utilities/assertIsDefined';

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

    // private createElement(params: BaseComponentProps) {
    //     const node = document.createElement(params.tag);
    //     node.className = params.className;
    //     node.textContent = params.text;
    //     this.node = node;
    // }

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

    public setAttribute(attribute: string, value: string) {
        this.node.setAttribute(attribute, value);
    }

    public removeAttribute(attribute: string) {
        this.node.removeAttribute(attribute);
    }

    public toggleClass(className: string) {
        this.node.classList.toggle(className);
    }

    public addListener(
        event: string,
        listener: EventListenerOrEventListenerObject,
        options: boolean | AddEventListenerOptions = false,
    ) {
        this.node.addEventListener(event, listener, options);
    }

    public removeListener(
        event: string,
        listener: EventListenerOrEventListenerObject,
        options: boolean | EventListenerOptions = false,
    ) {
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
