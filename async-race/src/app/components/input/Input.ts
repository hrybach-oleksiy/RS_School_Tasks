import BaseComponent from '../BaseComponent';
import { FormAttribute } from '../../../types/enums';
import { InputProps } from '../../../types/interfaces';

export default class Input extends BaseComponent {
  private onChange?: EventListener;

  constructor({ classNames, id, type = 'text', name, placeholder, required, checked, onChange }: InputProps) {
    super({ tag: 'input', classNames });

    this.setAttribute(FormAttribute.ID, id);
    this.setAttribute(FormAttribute.TYPE, type);
    this.setAttribute(FormAttribute.NAME, name);

    if (placeholder) {
      this.setAttribute(FormAttribute.PLACEHOLDER, placeholder);
    }

    if (checked) {
      this.setAttribute(FormAttribute.CHECKED, checked);
    }

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
