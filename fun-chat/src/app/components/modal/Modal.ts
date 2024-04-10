import BaseComponent from '../BaseComponent';
import { button } from '../HTMLComponents';

import { assertIsDefined } from '../../../utilities/utils';

import styles from './Modal.module.scss';

export default class Modal extends BaseComponent {
  private content: BaseComponent;

  private contentElement: BaseComponent = new BaseComponent({ tag: 'div', classNames: [styles.modal__content] });

  private isOpen: boolean = false;

  constructor(content: BaseComponent) {
    super({
      tag: 'div',
      classNames: [styles.modal, styles.hidden],
    });

    // this.modalElement = ElementCreator.create('div', { class: 'modal hidden' });
    // this.closeButton = null;
    // this.gameHandler = gameHandler;
    this.content = content;
    // this.modalContentElement = ElementCreator.create('div', {
    //   class: 'modal__content',
    // });
  }

  public render() {
    const rootElement = document.querySelector('main');
    // const modalContent = ElementCreator.create('div', {
    //   class: 'modal__content',
    // });
    assertIsDefined(rootElement);
    this.contentElement.append(this.content);

    // if (this.content instanceof HTMLElement) {
    //   this.modalContentElement.append(this.content);
    // } else {
    //   this.modalContentElement.innerHTML = this.content;
    // }

    this.append(this.contentElement);

    rootElement.append(this.getNode());
  }

  public open = () => {
    if (!this.isOpen) {
      this.removeClass(styles.hidden);
      this.isOpen = true;
    }
  };

  private close = () => {
    if (this.isOpen) {
      this.addClass(styles.hidden);
      this.isOpen = false;
      this.destroy();
    }
  };

  public addCloseBtn(text: string) {
    const closeBtn = button(['btn', 'close'], text);

    closeBtn.addListener('click', this.close);

    this.contentElement.append(closeBtn);
  }
}
