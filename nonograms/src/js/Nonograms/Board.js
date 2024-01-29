import ElementCreator from '../ElementCreator';
import Modal from './Modal';
// import clickedSound from '../../assets/sounds/clicked.mp3';

export default class Board {
  constructor(puzzle, gameHandler) {
    const rootElement = document.querySelector('.game');

    rootElement.innerHTML = '';

    this.board = puzzle;
    this.boardCols = puzzle.puzzleCols;
    this.boardRows = puzzle.puzzleRows;
    this.gameHandler = gameHandler;
    this.boardElement = ElementCreator.create('board');
    this.modal = null;
    this.timer = 0;
    this.timerElement = ElementCreator.create('timer', '00 : 00');
    this.interval = null;
    this.clickedSound = this.createAudioElement('/assets/clicked.mp3');
    this.unClickedSound = this.createAudioElement('/assets/unclicked.mp3');
    this.crossedSound = this.createAudioElement('/assets/crossed.mp3');
    this.winSound = this.createAudioElement('/assets/game-win.mp3');
    this.isSound = true;
    this.soundElement = ElementCreator.create('sound-on');
    this.setBoard(rootElement);
  }

  setBoard(rootElement) {
    for (let i = 0; i <= this.board.puzzleArray.length; i++) {
      const rowElement = document.createElement('div');

      rowElement.classList.add('row');

      if (i % 5 === 0) {
        rowElement.classList.add('divider-bottom');
      } else {
        rowElement.classList.add('border-regular--bottom');
      }

      for (let j = 0; j <= this.board.puzzleArray.length; j++) {
        const cellElement = document.createElement('div');

        if (j % 5 === 0) {
          cellElement.classList.add('divider-right');
        } else {
          cellElement.classList.add('border-regular--right');
        }

        if (i === 0 && j === 0) {
          cellElement.classList.add('cell');
        } else if (j === 0) {
          cellElement.classList.add('cell', 'header-row-cell');

          this.boardRows[i - 1].forEach((value) => {
            cellElement.textContent += value + ',';
          });

          cellElement.textContent = cellElement.textContent.slice(0, -1);
        } else if (i == 0) {
          cellElement.classList.add('cell', 'header-column-cell');

          this.boardCols[j - 1].forEach((value) => {
            cellElement.textContent += value + '\n';
          });
        } else {
          cellElement.classList.add('cell', 'game-cell');
          cellElement.dataset.indexes = `${i - 1}-${j - 1}`;

          //check cells by right mouse button
          cellElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('clicked')) {
              return;
            }

            event.target.classList.toggle('crossed');

            if (this.isSound) {
              this.crossedSound.currentTime = 0;
              this.crossedSound.play();
            }
          });

          //check cells by left mouse button
          cellElement.addEventListener('click', (event) => {
            this.startTimer();

            if (!this.checkWin()) {
              const indexes = event.target.dataset.indexes.split('-');

              this.board.toggleCellState(indexes[0], indexes[1]);
              event.target.classList.toggle('clicked');
              event.target.classList.remove('crossed');

              if (this.isSound) {
                if (event.target.classList.contains('clicked')) {
                  this.clickedSound.currentTime = 0;
                  this.clickedSound.play();
                } else {
                  this.unClickedSound.currentTime = 0;
                  this.unClickedSound.play();
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
                <button class="btn play">Play Again</button>
              `;
              this.stopTimer();
              const modal = new Modal(this.gameHandler, modalContent);
              modal.open();

              if (this.isSound) {
                this.winSound.play();
              }
            }
          });
        }

        rowElement.append(cellElement);
      }

      this.boardElement.append(rowElement);
    }

    const changeGameBtn = ElementCreator.create(
      'btn',
      'Change template',
      'button',
    );
    const restartBtn = ElementCreator.create('btn', 'Restart', 'button');
    const btnContainer = ElementCreator.create('btn-container');
    const soundContainerElement = ElementCreator.create('sound-container');

    soundContainerElement.append(this.soundElement);

    soundContainerElement.addEventListener('click', () => {
      this.turnSound();
    });

    changeGameBtn.addEventListener('click', () =>
      this.gameHandler.showInitPage(),
    );

    restartBtn.addEventListener('click', () => {
      const clickedCells = document.querySelectorAll('.clicked');
      clickedCells.forEach((cell) => cell.classList.remove('clicked'));
      this.stopTimer();
    });

    btnContainer.append(changeGameBtn, restartBtn, soundContainerElement);
    rootElement.append(this.boardElement, btnContainer, this.timerElement);
  }

  checkWin() {
    let isWin = true;

    this.board.cols.forEach((col, index) => {
      if (col.length === this.boardCols[index].length) {
        col.forEach((el, i) => {
          if (el !== this.boardCols[index][i]) {
            isWin = false;
          }
        });
      } else {
        isWin = false;
      }
    });

    this.board.rows.forEach((row, index) => {
      if (row.length === this.boardRows[index].length) {
        row.forEach((el, i) => {
          if (el !== this.boardRows[index][i]) {
            isWin = false;
          }
        });
      } else {
        isWin = false;
      }
    });

    return isWin;
  }

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(this.formatTimer, 1000);
    }
  }

  stopTimer = () => {
    clearInterval(this.interval);
    this.timerElement.textContent = '00 : 00';
    this.interval = null;
    this.timer = 0;
  };

  formatTimer = () => {
    if (!this.checkWin()) {
      const mins = Math.floor(this.timer / 60);
      const secs = this.timer % 60;

      this.timerElement.innerHTML =
        (mins < 10 ? '0' + mins : mins) +
        ' : ' +
        (secs < 10 ? '0' + secs : secs);
      this.timer++;
    }
  };

  createAudioElement(src) {
    const audio = new Audio(src);

    audio.style.display = 'none';
    document.body.append(audio);
    return audio;
  }

  turnSound() {
    if (this.isSound === true) {
      this.isSound = false;
      this.soundElement.classList.remove('sound-on');
      this.soundElement.classList.add('sound-off');
    } else {
      this.isSound = true;
      this.soundElement.classList.add('sound-on');
      this.soundElement.classList.remove('sound-off');
    }
  }
}
