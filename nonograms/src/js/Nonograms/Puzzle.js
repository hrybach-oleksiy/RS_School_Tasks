export default class Puzzle {
  constructor(size, template) {
    this.puzzleArray = new Array(size)
      .fill()
      .map(() => new Array(size).fill(0));
    // this.puzzleTemplate = new Array(size)
    //   .fill()
    //   .map(() => new Array(size).fill().map(() => Math.round(Math.random())));
    this.puzzleTemplate = template;
    this.cols = new Array(size).fill().map(() => [0]);
    this.rows = new Array(size).fill().map(() => [0]);
    this.puzzleCols = new Array(size).fill().map(() => [0]);
    this.puzzleRows = new Array(size).fill().map(() => [0]);
    console.log(this.puzzleTemplate);

    this.clearField();
    this.setField(this.puzzleTemplate, this.puzzleRows, this.puzzleCols);
  }

  clearField() {
    const length = this.rows.length;
    this.cols = new Array(length).fill().map(() => [0]);
    this.rows = new Array(length).fill().map(() => [0]);
  }

  setField(puzzleArr, rows, cols) {
    for (let i = 0; i < puzzleArr.length; i++) {
      for (let j = 0; j < puzzleArr.length; j++) {
        let value = puzzleArr[i][j];

        if (value) {
          cols[j][cols[j].length - 1]++;
          rows[i][rows[i].length - 1]++;
        } else {
          if (cols[j][cols[j].length - 1]) {
            cols[j].push(0);
          }

          if (rows[i][rows[i].length - 1]) {
            rows[i].push(0);
          }
        }
      }
    }

    for (const array of cols) {
      if (array.length > 1 && !array[array.length - 1]) {
        array.splice(-1, 1);
      }
    }

    for (const array of rows) {
      if (array.length > 1 && !array[array.length - 1]) {
        array.splice(-1, 1);
      }
    }
  }

  toggleCellState(row, column) {
    this.puzzleArray[row][column] = this.puzzleArray[row][column] ? 0 : 1;
    this.clearField();
    this.setField(this.puzzleArray, this.rows, this.cols);
  }
}
