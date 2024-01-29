import ElementCreator from '../ElementCreator';
import Game from './Game';
import Modal from './Modal';
import {
  mMatrix,
  heartMatrix,
  starMatrix,
  sunMatrix,
  treeMatrix,
} from './templates';
export default class GameHandler {
  constructor(...sizes) {
    this.sizes = sizes;
    this.rootElement = ElementCreator.create('game');
    document.body.append(this.rootElement);
    this.templates = [mMatrix, heartMatrix, starMatrix, sunMatrix, treeMatrix];
    this.showInitPage();
  }

  showInitPage() {
    const rootElement = document.querySelector('.game');

    rootElement.innerHTML = '';

    const titleElement = ElementCreator.create(
      'title',
      'Nonogram Puzzle',
      'h1',
    );
    const difficultyElement = ElementCreator.create(
      'menu-choose',
      'Choose the template for the game',
      'p',
    );
    const boardElement = ElementCreator.create('menu', '', 'ul');

    for (const size of this.sizes) {
      const menuElement = ElementCreator.create('menu-item', '', 'li');

      menuElement.innerHTML = `
      <div class="menu-text">Templates for the game</div>
      <div class="menu-sizes"> ${size} &times ${size}</div>
      `;
      // menuElement.addEventListener('click', () => this.startGame(size, this));
      menuElement.addEventListener('click', () => this.chooseTemplate());
      boardElement.append(menuElement);
    }

    rootElement.append(titleElement, difficultyElement, boardElement);
  }

  chooseTemplate() {
    const templates = this.templates;
    const modalContent = `
    <ul class="templates-menu">
      ${templates
        .map(
          (template) =>
            `<li class="templates-menu__item">${template.name}</li>`,
        )
        .join('')}
    </ul>
    `;

    const modal = new Modal(this, modalContent);
    modal.open();

    const menuElements = document.querySelectorAll('.templates-menu__item');
    menuElements.forEach((el, index) => {
      el.addEventListener('click', () => {
        const currentTemplate = this.templates[index];
        const size = currentTemplate.size;
        const template = currentTemplate.template;

        this.startGame(size, template, this);
      });
    });
  }

  startGame(size, template, gameHandler) {
    new Game(size, template, gameHandler);
  }
}
