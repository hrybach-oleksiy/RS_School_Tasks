import { LinkAttribute, ImageAttribute, FormAttribute } from '../../types/enums';

interface BaseComponentProps {
  tag?: string;
  classNames?: string[];
  text?: string;
}

type AttributeType = LinkAttribute | ImageAttribute | FormAttribute;
type DataAttribute = `data-${string}`;

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

  public append(child: BaseComponent): void {
    this.children.push(child);
    this.node.append(child.getNode());
  }

  public appendChildren(children: BaseComponent[]): void {
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

  public setTextContent(content: string): void {
    this.node.textContent = content;
  }

  public setAttribute(attribute: AttributeType | DataAttribute, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public setAttributes(attributes: { [key in AttributeType]: string }): void {
    Object.keys(attributes).forEach((attribute) => {
      this.node.setAttribute(attribute as string, attributes[attribute as AttributeType]);
    });
  }

  public getAttribute(value: string): string | null {
    return this.node.getAttribute(value);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public addListener(event: string, listener: EventListener, options: boolean | AddEventListenerOptions = false): void {
    this.node.addEventListener(event, listener, options);
  }

  public removeListener(event: string, listener: EventListener, options: boolean | EventListenerOptions = false): void {
    this.node.removeEventListener(event, listener, options);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }
}
