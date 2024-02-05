import ElementCreator from '../ElementCreator';
import Modal from './Modal';
import GameStateManager from './GameStateManager';
import ResultsTable from './ResultsTable';

export default class Board {
  constructor(puzzle, gameHandler, isGameloaded) {
    this.isGameLoaded = isGameloaded;
    this.gameHandler = gameHandler;
    this.gameState = GameStateManager.loadGameState();
    this.rootElement = document.querySelector('.game');
    this.board = puzzle;
    this.boardCols = puzzle.puzzleCols;
    this.boardRows = puzzle.puzzleRows;
    this.boardElement = ElementCreator.create('div', { class: 'board' });
    this.modal = null;
    this.timer = this.isGameLoaded ? this.gameState.timer : 0;
    this.timerElement = ElementCreator.create(
      'div',
      { class: 'timer' },
      '00 : 00',
    );
    this.interval = null;
    this.sounds = new Map([
      ['clicked', this.createAudioElement('/assets/clicked.mp3')],
      ['unClicked', this.createAudioElement('/assets/unclicked.mp3')],
      ['crossed', this.createAudioElement('/assets/crossed.mp3')],
      ['win', this.createAudioElement('/assets/game-win.mp3')],
    ]);
    this.isSound = this.isGameLoaded ? this.gameState.soundState : true;
    this.soundElement = ElementCreator.create('div', { class: 'sound-on' });
    this.resultsTable = new ResultsTable();
    this.winningTime = null;
    this.setBoard();
    this.setControls();
    if (this.isGameLoaded) {
      this.restoreCellsState(this.gameState.cellsState);
    }
  }

  createRowElement(i) {
    const rowElement = ElementCreator.create('div', { class: 'row' });

    if (i % 5 === 0) {
      rowElement.classList.add('divider-bottom');
    } else {
      rowElement.classList.add('border-regular--bottom');
    }
    return rowElement;
  }

  createCellElement(i, j) {
    const cellElement = ElementCreator.create('div');

    if (j % 5 === 0) {
      cellElement.classList.add('divider-right');
    } else {
      cellElement.classList.add('border-regular--right');
    }

    if (i === 0 && j === 0) {
      cellElement.classList.add('cell', 'empty-cell');
    } else if (j === 0) {
      cellElement.classList.add('cell', 'header-row-cell');
      this.boardRows[i - 1].forEach((value) => {
        cellElement.textContent += value + ',';
      });
      cellElement.textContent = cellElement.textContent.slice(0, -1);
    } else if (i === 0) {
      cellElement.classList.add('cell', 'header-column-cell');
      this.boardCols[j - 1].forEach((value) => {
        cellElement.textContent += value + '\n';
      });
    } else {
      cellElement.classList.add('cell', 'game-cell');
      cellElement.dataset.indexes = `${i - 1}-${j - 1}`;
      this.handleRightClick(cellElement);
      this.handleLeftClick(cellElement);
    }
    return cellElement;
  }

  setBoard() {
    this.rootElement.innerHTML = '';
    this.clearAudioElements();

    for (let i = 0; i <= this.board.puzzleArray.length; i++) {
      const rowElement = this.createRowElement(i);

      for (let j = 0; j <= this.board.puzzleArray.length; j++) {
        const cellElement = this.createCellElement(i, j);

        rowElement.append(cellElement);
      }

      this.boardElement.append(rowElement);
    }

    this.rootElement.append(this.boardElement);
  }

  handleRightClick(cell) {
    cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('clicked')) {
        return;
      }

      event.target.classList.toggle('crossed');

      if (this.isSound) {
        this.playSound('crossed');
      }
    });
  }

  handleLeftClick(cell) {
    cell.addEventListener('click', (event) => {
      this.startTimer();

      if (!this.checkWin()) {
        const indexes = event.target.dataset.indexes.split('-');

        this.board.toggleCellState(indexes[0], indexes[1]);
        event.target.classList.toggle('clicked');
        event.target.classList.remove('crossed');

        if (this.isSound) {
          if (event.target.classList.contains('clicked')) {
            this.playSound('clicked');
          } else {
            this.playSound('unClicked');
          }
        }
      }

      if (this.checkWin()) {
        const modalContent = `
          <div class="modal__text">
            <h3 class="modal__title">Great! You have solved the nonogram in <strong>${
              this.timer - 1
            }</strong> seconds!</h3>
          </div>
        `;
        const modal = new Modal(this.gameHandler, modalContent);
        modal.open();
        modal.addCloseBtn('Play Again', true);

        this.winningTime = this.timer - 1;
        this.saveGameResults();
        this.stopTimer();
        this.gameHandler.showResultBtnElement.disabled = false;

        if (this.isSound) {
          this.playSound('win');
        }
      }
    });
  }

  createButtonsContainer() {
    const btnContainerElement = ElementCreator.create('div', {
      class: 'btn-container',
    });
    const buttons = [
      {
        text: 'Change template',
        handler: () => this.changeDifficulty(),
      },
      { text: 'Restart Game', handler: () => this.restartGame() },
      { text: 'Save Game', handler: () => this.saveGameState() },
      { text: 'Solution', handler: () => this.handleSolutionBtnClick() },
      // { text: 'Show Results', handler: () => this.saveGameResults() },
    ];

    buttons.forEach(({ text, handler }) => {
      const button = ElementCreator.create('button', { class: 'btn' }, text);

      button.addEventListener('click', handler);
      btnContainerElement.append(button);
    });

    return btnContainerElement;
  }

  setControls() {
    const btnContainerElement = this.createButtonsContainer();
    const soundContainerElement = ElementCreator.create('div', {
      class: 'sound-container',
    });
    const bottomContainer = ElementCreator.create('div', {
      class: 'game-bottom-container',
    });

    soundContainerElement.append(this.soundElement);
    soundContainerElement.addEventListener('click', () => {
      this.turnSound();
    });

    bottomContainer.append(
      btnContainerElement,
      soundContainerElement,
      this.timerElement,
    );
    this.rootElement.append(bottomContainer);
  }

  checkWin() {
    return (
      this.board.cols.every(
        (col, index) =>
          col.length === this.boardCols[index].length &&
          col.every((el, i) => el === this.boardCols[index][i]),
      ) &&
      this.board.rows.every(
        (row, index) =>
          row.length === this.boardRows[index].length &&
          row.every((el, i) => el === this.boardRows[index][i]),
      )
    );
  }

  changeDifficulty() {
    this.gameHandler.showInitPage();
  }

  restartGame() {
    const clickedCells = document.querySelectorAll('.clicked');
    const crossedCells = document.querySelectorAll('.crossed');
    clickedCells.forEach((cell) => cell.classList.remove('clicked'));
    crossedCells.forEach((cell) => cell.classList.remove('crossed'));
    this.stopTimer();
  }

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => this.handleTimer(), 1000);
    }
  }

  playSound(soundName) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  handleTimer() {
    this.formatTimer();
    this.timer++;
  }

  stopTimer = () => {
    clearInterval(this.interval);
    this.timerElement.textContent = '00 : 00';
    this.interval = null;
    this.timer = 0;
  };

  formatTimer = () => {
    const mins = Math.floor(this.timer / 60);
    const secs = this.timer % 60;

    this.timerElement.innerHTML =
      (mins < 10 ? '0' + mins : mins) + ' : ' + (secs < 10 ? '0' + secs : secs);
  };

  createAudioElement(src) {
    const audio = new Audio(src);

    audio.style.display = 'none';
    document.body.append(audio);
    return audio;
  }

  clearAudioElements() {
    const existingAudioElements = document.querySelectorAll('audio');

    existingAudioElements.forEach((audioElement) => {
      audioElement.parentNode.removeChild(audioElement);
    });
  }

  turnSound() {
    this.isSound = !this.isSound;
    this.soundElement.classList.toggle('sound-on');
    this.soundElement.classList.toggle('sound-off');
  }

  saveGameState() {
    const gameState = {
      puzzleState: {
        cols: this.board.cols,
        rows: this.board.rows,
        template: this.board.puzzleTemplate,
        size: this.board.size,
      },
      timer: this.timer,
      soundState: this.isSound,
      cellsState: this.getCellsState(),
    };

    const modal = new Modal(this.gameHandler, 'Game Saved');
    modal.open();

    setTimeout(() => {
      modal.close();
    }, 1000);

    GameStateManager.saveGameState(gameState);
    this.gameHandler.loadBtnElement.disabled = false;
  }

  getCellsState() {
    const clickedCells = Array.from(document.querySelectorAll('.clicked'));
    const crossedCells = Array.from(document.querySelectorAll('.crossed'));
    const emptyCells = Array.from(document.querySelectorAll('.game-cell'));

    const cellsState = {
      clicked: clickedCells.map((cell) => cell.dataset.indexes),
      crossed: crossedCells.map((cell) => cell.dataset.indexes),
      empty: emptyCells.map((cell) => cell.dataset.indexes),
    };

    return cellsState;
  }

  restoreCellsState(cellsState) {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
      cell.classList.remove('clicked', 'crossed');
    });

    cellsState.empty.forEach((indexes) => {
      const [row, col] = indexes.split('-');
      this.board.puzzleArray[row][col] = 0;
    });

    cellsState.clicked.forEach((indexes) => {
      const [row, col] = indexes.split('-');
      const clickedCell = document.querySelector(
        `.game .row:nth-child(${Number(row) + 2}) .cell:nth-child(${
          Number(col) + 2
        })`,
      );
      clickedCell.classList.add('clicked');
      this.board.puzzleArray[row][col] = 1;
    });

    cellsState.crossed.forEach((indexes) => {
      const [row, col] = indexes.split('-');
      const crossedCell = document.querySelector(
        `.game .row:nth-child(${Number(row) + 2}) .cell:nth-child(${
          Number(col) + 2
        })`,
      );
      crossedCell.classList.add('crossed');
    });

    this.formatTimer();

    this.board.clearField();
    this.board.setField(
      this.board.puzzleArray,
      this.board.rows,
      this.board.cols,
    );
  }

  getCellElement(row, column) {
    const rowIndex = row + 1;
    const cellSelector = `.game .row:nth-child(${rowIndex}) .cell:nth-child(${
      column + 1
    })`;
    return document.querySelector(cellSelector);
  }

  handleSolutionBtnClick() {
    const solutionPuzzle = this.board.getSolution();
    const clickedCells = document.querySelectorAll('.clicked');
    clickedCells?.forEach((cell) => cell.classList.remove('clicked'));

    solutionPuzzle.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value === 1) {
          const cellElement = this.getCellElement(i + 1, j + 1);
          cellElement.classList.add('clicked');
        }
      });
    });
  }

  saveGameResults() {
    const result = {
      puzzleName: this.gameHandler.templateName,
      difficulty: this.gameHandler.difficulty,
      time: this.winningTime,
    };

    this.resultsTable.addResult(result);
  }
}
