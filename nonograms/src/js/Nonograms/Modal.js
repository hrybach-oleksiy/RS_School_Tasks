import ElementCreator from '../ElementCreator';

export default class Modal {
  constructor(gameHandler, content) {
    this.modalElement = null;
    this.isOpen = false;
    this.closeButton = null;
    this.gameHandler = gameHandler;
    this.content = content;

    this.initModal();
  }

  initModal() {
    this.modalElement = ElementCreator.create('modal');
    this.modalElement.classList.add('hidden');

    this.modalElement.innerHTML = `
      <div class="modal__content">
        ${this.content}      
      </div>
    `;

    this.closeButton = this.modalElement.querySelector('.play');
    this.closeButton?.addEventListener('click', () => {
      this.close();
      this.gameHandler.showInitPage();
    });

    const rootElement = document.querySelector('.game');

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
