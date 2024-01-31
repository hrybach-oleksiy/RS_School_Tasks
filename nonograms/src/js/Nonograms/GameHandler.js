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
import GameStateManager from './GameStateManager';
import ThemeSwitcher from './ThemeSwitcher';
export default class GameHandler {
  constructor(...sizes) {
    this.sizes = sizes;
    this.rootElement = ElementCreator.create('div', {
      class: 'game',
    });
    document.body.append(this.rootElement);
    this.templates = [mMatrix, heartMatrix, starMatrix, sunMatrix, treeMatrix];
    this.themeSwitcher = new ThemeSwitcher();
    this.showInitPage();
  }

  showInitPage() {
    this.rootElement.innerHTML = '';

    const titleElement = ElementCreator.create(
      'h1',
      { class: 'title' },
      'Nonogram Puzzle',
    );
    const difficultyElement = ElementCreator.create(
      'p',
      { class: 'menu-choose' },
      'Choose the template for the game',
    );
    const menuElement = this.createMenu();
    const loadGameBtn = ElementCreator.create(
      'button',
      { class: 'btn' },
      'Load Last Game',
    );
    const changeThemeBtn = ElementCreator.create(
      'button',
      { class: 'btn', ['data-theme']: 'dark' },
      'Change Theme',
    );

    loadGameBtn.addEventListener('click', this.loadGame);

    changeThemeBtn.addEventListener('click', (event) => {
      let currentTheme = event.target.dataset.theme;
      this.themeSwitcher.changeTheme(currentTheme);

      if (currentTheme === 'light') {
        event.target.dataset.theme = 'dark';
      } else {
        event.target.dataset.theme = 'light';
      }
    });

    this.rootElement.append(
      titleElement,
      difficultyElement,
      menuElement,
      loadGameBtn,
      changeThemeBtn,
    );
  }

  createMenu() {
    const menuElement = ElementCreator.create('ul', { class: 'menu' });

    for (const size of this.sizes) {
      const menuItemElement = ElementCreator.create('li', {
        class: 'menu-item',
      });

      menuItemElement.innerHTML = `
      <div class="menu-text">Templates for the game</div>
      <div class="menu-sizes"> ${size} &times ${size}</div>
      `;

      menuItemElement.addEventListener('click', () => this.chooseTemplate());
      menuElement.append(menuItemElement);
    }

    return menuElement;
  }

  chooseTemplate() {
    // const modalContent = `
    // <ul class="templates-menu">
    //   ${this.templates
    //     .map(
    //       (template) =>
    //         `<li class="templates-menu__item">${template.name}</li>`,
    //     )
    //     .join('')}
    // </ul>
    // `;
    const modalContent = this.createTemplatesMenu();
    const modal = new Modal(this, modalContent);

    modal.open();

    const menuItems = document.querySelectorAll('.templates-menu__item');

    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const currentItem = this.templates[index];
        const size = currentItem.size;
        const template = currentItem.template;

        this.startGame(size, template, this);
      });
    });
  }

  createTemplatesMenu() {
    const templatesMenu = ElementCreator.create('ul', {
      class: 'templates-menu',
    });

    this.templates.forEach((template) => {
      const templateItem = ElementCreator.create(
        'li',
        { class: 'templates-menu__item' },
        template.name,
      );
      templatesMenu.append(templateItem);
    });

    return templatesMenu;
  }

  loadGame() {
    const gameData = GameStateManager.loadGameState();

    if (gameData) {
      const { template, size } = gameData.puzzleState;
      const { clicked, crossed } = gameData.cellsState;
      console.log(clicked);
      console.log(crossed);
      new Game(size, template, this);
      console.log('data loaded');
    } else {
      console.log('no data');
    }
  }

  startGame(size, template, gameHandler) {
    new Game(size, template, gameHandler);
  }
}
