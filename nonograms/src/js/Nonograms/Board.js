import ElementCreator from '../ElementCreator';

export default class Board {
  constructor(puzzle, gameHandler) {
    const rootElement = document.querySelector('.game');

    rootElement.innerHTML = '';

    this.board = puzzle;
    this.boardCols = puzzle.puzzleCols;
    this.boardRows = puzzle.puzzleRows;
    this.gameHandler = gameHandler;
    this.boardElement = ElementCreator.create('board');
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

          cellElement.addEventListener('click', (event) => {
            const indexes = event.target.dataset.indexes.split('-');

            this.board.toggleCellState(indexes[0], indexes[1]);

            event.target.classList.toggle('clicked');
          });
        }

        rowElement.append(cellElement);
      }

      this.boardElement.append(rowElement);
    }

    rootElement.append(this.boardElement);

    const restartBtn = ElementCreator.create('btn', 'Restart');

    restartBtn.addEventListener('click', () => this.gameHandler.showInitPage());

    rootElement.append(restartBtn);
  }
}
