import ElementCreator from '../ElementCreator';
import Game from './Game';
import Modal from './Modal';
import templates from './templates';
import GameStateManager from './GameStateManager';
import ThemeSwitcher from './ThemeSwitcher';
import ResultsTable from './ResultsTable';
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
    this.templateName = this.templates[0].name;
    this.currentTemplate = null;
    this.difficulty = 'easy';
    this.results = new ResultsTable();
    this.gameState = new GameStateManager();
    this.isGameLoaded = false;
    this.loadBtnElement = ElementCreator.create(
      'button',
      {
        class: 'btn',
      },
      'Load Last Game',
    );
    this.showResultBtnElement = ElementCreator.create(
      'button',
      {
        class: 'btn',
      },
      'Show Results',
    );
    this.titleElement = ElementCreator.create(
      'h1',
      { class: 'title' },
      'Nonogram Puzzle',
    );
    this.loadBtnElement.disabled = localStorage.getItem('gameState')
      ? false
      : true;
    this.showResultBtnElement.disabled = this.results.results.length === 0;
  }

  showInitPage() {
    this.rootElement.innerHTML = '';

    const difficultyElement = ElementCreator.create(
      'p',
      { class: 'menu-choose' },
      'Choose the template for the game',
    );
    const menuElement = this.createMenu();
    const buttonContainer = ElementCreator.create('div', {
      class: 'btn-container',
    });
    const changeThemeBtn = ElementCreator.create(
      'button',
      { class: 'btn', ['data-theme']: 'dark' },
      'Change Theme',
    );
    const playRandomBtn = ElementCreator.create(
      'button',
      { class: 'btn' },
      'Random Game',
    );

    this.loadBtnElement.addEventListener('click', () => {
      this.loadGame();
    });
    playRandomBtn.addEventListener('click', () => {
      this.startRandomGame();
    });
    this.showResultBtnElement.addEventListener('click', () => {
      this.showGameResults();
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

    buttonContainer.append(
      playRandomBtn,
      this.loadBtnElement,
      changeThemeBtn,
      this.showResultBtnElement,
    );

    this.rootElement.append(
      this.titleElement,
      difficultyElement,
      menuElement,
      buttonContainer,
    );
  }

  createMenu() {
    const menuElement = ElementCreator.create('ul', { class: 'menu' });

    for (const size of this.sizes) {
      let difficulty = '';

      if (size === 5) {
        difficulty = 'easy';
      } else if (size === 10) {
        difficulty = 'medium';
      } else if (size === 15) {
        difficulty = 'hard';
      }

      const menuItemElement = ElementCreator.create('li', {
        class: 'menu-item',
        ['data-size']: size,
        ['data-difficulty']: difficulty,
      });

      menuItemElement.innerHTML = `
      <div class="menu-text">Templates for the <span class="difficulty">${difficulty}</span> game</div>
      <div class="menu-sizes"> ${size} &times ${size}</div>
      `;

      menuItemElement.addEventListener('click', (event) => {
        this.size = Number(event.currentTarget.dataset.size);
        this.difficulty = event.currentTarget.dataset.difficulty;
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
    const modalContent = this.createTemplatesMenu();
    const modal = new Modal(this, modalContent);

    modal.open();

    const menuItems = document.querySelectorAll('.templates-menu__item');

    menuItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const itemID = event.target.dataset.id;
        const currentItem = this.templates[itemID - 1];
        const template = currentItem.template;

        this.templateName = currentItem.name;
        this.currentTemplate = template;

        this.startGame(this.size, template, this);
      });
    });
  }

  loadGame() {
    const gameState = GameStateManager.loadGameState();
    console.log(gameState);
    const size = gameState.puzzleState.size;
    const template = gameState.puzzleState.template;

    this.startGame(size, template, this, true);
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
    this.templateName = templates[randomTemplateIndex].name;

    this.startGame(randomSize, randomTemplate, this);
  }

  startGame(size, template, gameHandler, isGameloaded) {
    new Game(size, template, gameHandler, isGameloaded);
  }

  createResultTable(results) {
    const resultsTable = ElementCreator.create('table', {
      class: 'results-table',
    });

    const tableHeader = ElementCreator.create('thead');
    const headerRow = ElementCreator.create('tr');
    const headerColumns = ['#', 'Puzzle name', 'Difficulty', 'Time'];

    headerColumns.forEach((columnName) => {
      const headerCell = ElementCreator.create('th', {}, columnName);
      headerRow.append(headerCell);
    });

    tableHeader.append(headerRow);
    resultsTable.append(tableHeader);

    const tableBody = ElementCreator.create('tbody');

    results.forEach((result, index) => {
      const row = ElementCreator.create('tr', {
        class: 'results-table__row',
      });

      const minutes = Math.floor(result.time / 60);
      const seconds = result.time % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      const indexCell = ElementCreator.create('td', {}, String(index + 1));
      const puzzleNameCell = ElementCreator.create('td', {}, result.puzzleName);
      const difficultyCell = ElementCreator.create('td', {}, result.difficulty);
      const timeCell = ElementCreator.create('td', {}, formattedTime);

      row.append(indexCell, puzzleNameCell, difficultyCell, timeCell);

      tableBody.append(row);
    });

    resultsTable.append(tableBody);

    return resultsTable;
  }

  showGameResults() {
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
      existingModal.remove();
    }
    const results = new ResultsTable().getResults();

    const modalContent = this.createResultTable(results);
    const modal = new Modal(this, modalContent);
    modal.open();
    modal.addCloseBtn('Close');
  }
}
