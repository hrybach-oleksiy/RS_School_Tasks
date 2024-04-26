import ElementCreator from '../ElementCreator';
export default class Modal {
  constructor(gameHandler, content) {
    this.modalElement = ElementCreator.create('div', { class: 'modal hidden' });
    this.isOpen = false;
    this.closeButton = null;
    this.gameHandler = gameHandler;
    this.content = content;
    this.modalContentElement = ElementCreator.create('div', {
      class: 'modal__content',
    });

    this.initModal();
  }

  initModal() {
    const rootElement = document.querySelector('.game');
    // const modalContent = ElementCreator.create('div', {
    //   class: 'modal__content',
    // });

    if (this.content instanceof HTMLElement) {
      this.modalContentElement.append(this.content);
    } else {
      this.modalContentElement.innerHTML = this.content;
    }

    this.modalElement.append(this.modalContentElement);

    rootElement.append(this.modalElement);
  }

  open() {
    if (!this.isOpen) {
      this.modalElement.classList.remove('hidden');
      this.isOpen = true;
    }
  }

  close() {
    if (this.isOpen) {
      this.modalElement.classList.add('hidden');
      this.isOpen = false;
    }
  }

  addCloseBtn(text, isNewGame = false) {
    const closeBtn = ElementCreator.create(
      'button',
      { class: 'btn close' },
      `${text}`,
    );

    closeBtn.addEventListener('click', () => {
      this.close();
      if (isNewGame) {
        this.gameHandler.showInitPage();
      }
    });

    this.modalContentElement.append(closeBtn);
  }
}
