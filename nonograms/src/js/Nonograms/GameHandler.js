import ElementCreator from '../ElementCreator';
import Game from './Game';
import Modal from './Modal';
import templates from './templates';
import GameStateManager from './GameStateManager';
import ThemeSwitcher from './ThemeSwitcher';
export default class GameHandler {
  constructor(...sizes) {
    this.sizes = sizes;
    this.rootElement = ElementCreator.create('div', {
      class: 'game',
    });
    document.body.append(this.rootElement);
    this.templates = [...templates];
    this.themeSwitcher = new ThemeSwitcher();
    this.size = null;
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
    const playRandomBtn = ElementCreator.create(
      'button',
      { class: 'btn' },
      'Play Random Game',
    );

    loadGameBtn.addEventListener('click', this.loadGame);
    playRandomBtn.addEventListener('click', () => {
      this.startRandomGame();
    });

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
      playRandomBtn,
      changeThemeBtn,
    );
  }

  createMenu() {
    const menuElement = ElementCreator.create('ul', { class: 'menu' });

    for (const size of this.sizes) {
      const menuItemElement = ElementCreator.create('li', {
        class: 'menu-item',
        ['data-size']: size,
      });

      menuItemElement.innerHTML = `
      <div class="menu-text">Templates for the game</div>
      <div class="menu-sizes"> ${size} &times ${size}</div>
      `;

      menuItemElement.addEventListener('click', (event) => {
        this.size = Number(event.currentTarget.dataset.size);
        this.chooseTemplate();
      });
      menuElement.append(menuItemElement);
    }

    return menuElement;
  }

  createTemplatesMenu() {
    const templatesMenu = ElementCreator.create('ul', {
      class: 'templates-menu',
    });

    this.templates
      .filter((template) => {
        return template.size === this.size;
      })
      .forEach((template) => {
        const templateItem = ElementCreator.create(
          'li',
          { class: 'templates-menu__item', ['data-id']: template.id },
          template.name,
        );
        templatesMenu.append(templateItem);
      });

    return templatesMenu;
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

    menuItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const itemID = event.target.dataset.id;
        const currentItem = this.templates[itemID - 1];
        const template = currentItem.template;

        this.startGame(this.size, template, this);
      });
    });
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

  startRandomGame() {
    const availableSizes = [5, 10, 15];
    const randomSizeIndex = Math.floor(Math.random() * availableSizes.length);
    const randomSize = availableSizes[randomSizeIndex];
    const templates = this.templates.filter(
      (template) => template.size === randomSize,
    );
    const randomTemplateIndex = Math.floor(Math.random() * templates.length);
    const randomTemplate = templates[randomTemplateIndex].template;

    this.startGame(randomSize, randomTemplate, this);
  }

  startGame(size, template, gameHandler) {
    new Game(size, template, gameHandler);
  }
}
