import BaseComponent from '../BaseComponent';

interface ButtonProps {
  classNames?: string[];
  text?: string;
  onClick?: EventListener;
}
export default class Button extends BaseComponent {
  private onClick?: EventListener;

  constructor({ classNames, text, onClick }: ButtonProps) {
    super({ tag: 'button', classNames, text });

    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', this.onClick);
    }
  }

  destroy() {
    if (this.onClick) {
      this.removeListener('click', this.onClick);
      super.destroy();
    }
  }
}
