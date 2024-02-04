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
    this.difficulty = 'easy';
    this.results = new ResultsTable();
    this.isGameLoaded = false;
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
    const showResultsBtn = ElementCreator.create(
      'button',
      { class: 'btn' },
      'Show Results',
    );

    loadGameBtn.addEventListener('click', () => {
      this.loadGame();
    });
    playRandomBtn.addEventListener('click', () => {
      this.startRandomGame();
    });
    showResultsBtn.addEventListener('click', () => {
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

    this.rootElement.append(
      titleElement,
      difficultyElement,
      menuElement,
      loadGameBtn,
      playRandomBtn,
      changeThemeBtn,
      showResultsBtn,
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

        this.templateName = currentItem.name;

        this.startGame(this.size, template, this);
      });
    });
  }

  loadGame() {
    const gameState = GameStateManager.loadGameState();
    const size = gameState.puzzleState.size;
    const template = gameState.puzzleState.template;

    this.startGame(size, template, this, true);
  }

  //   applyGameState() {
  //     if (this.isGameLoaded) {
  //       const gameState = this.gameHandler.loadGame();

  //       this.board.cols = gameState.puzzleState.cols;
  //       this.board.rows = gameState.puzzleState.rows;
  //       this.board.puzzleTemplate = gameState.puzzleState.template;
  //       this.board.size = gameState.puzzleState.size;

  //       this.restoreCellsState(gameState.cellsState);

  //       this.timer = gameState.timer;
  //       this.isSound = gameState.soundState;

  //       new Game(this.board.size, this.board.puzzleTemplate, this.gameHandler);
  //     }
  //   }

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

  startGame(size, template, gameHandler, isGameloaded) {
    new Game(size, template, gameHandler, isGameloaded);
  }

  createResultTable(results) {
    const resultsTable = ElementCreator.create('table', {
      class: 'results-table',
    });

    // Create table header
    const tableHeader = ElementCreator.create('thead');
    const headerRow = ElementCreator.create('tr');
    const headerColumns = ['#', 'Puzzle name', 'Difficulty', 'Time'];

    headerColumns.forEach((columnName) => {
      const headerCell = ElementCreator.create('th', {}, columnName);
      headerRow.append(headerCell);
    });

    tableHeader.append(headerRow);
    resultsTable.append(tableHeader);

    // Create table body
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
    const results = this.results.getResults();

    const modalContent = this.createResultTable(results);
    const modal = new Modal(this, modalContent);
    modal.addCloseBtn('Close');

    modal.open();
  }
}
