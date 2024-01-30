import ElementCreator from '../ElementCreator';
export default class Modal {
  constructor(gameHandler, content) {
    this.modalElement = ElementCreator.create('div', { class: 'modal hidden' });
    this.isOpen = false;
    this.closeButton = null;
    this.gameHandler = gameHandler;
    this.content = content;

    this.initModal();
  }

  initModal() {
    const rootElement = document.querySelector('.game');
    const modalContent = ElementCreator.create('div', {
      class: 'modal__content',
    });

    if (this.content instanceof HTMLElement) {
      modalContent.append(this.content);
    } else {
      modalContent.innerHTML = this.content;
    }

    this.modalElement.append(modalContent);

    this.closeButton = this.modalElement.querySelector('.play');

    this.closeButton?.addEventListener('click', () => {
      this.close();
      this.gameHandler.showInitPage();
    });

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
}
