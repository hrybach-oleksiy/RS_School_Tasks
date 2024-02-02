export default class Puzzle {
  constructor(size, template) {
    this.size = size;
    this.puzzleArray = new Array(this.size)
      .fill()
      .map(() => new Array(this.size).fill(0));
    // this.puzzleTemplate = new Array(size)
    //   .fill()
    //   .map(() => new Array(size).fill().map(() => Math.round(Math.random())));
    this.puzzleTemplate = template;
    this.cols = new Array(this.size).fill().map(() => [0]);
    this.rows = new Array(this.size).fill().map(() => [0]);
    this.puzzleCols = new Array(this.size).fill().map(() => [0]);
    this.puzzleRows = new Array(this.size).fill().map(() => [0]);
    console.log('puzzle template: ', this.puzzleTemplate);
    // console.log('cols: ', this.cols);
    // console.log('rows: ', this.rows);
    // console.log('Puzzle Cols: ', this.puzzleCols);
    // console.log('Puzzle Rows: ', this.puzzleRows);

    this.clearField();
    this.setField(this.puzzleTemplate, this.puzzleRows, this.puzzleCols);
  }

  clearField() {
    const length = this.rows.length;
    this.cols = new Array(length).fill().map(() => [0]);
    this.rows = new Array(length).fill().map(() => [0]);
  }

  setField(puzzleArr, rows, cols) {
    puzzleArr.forEach((row, i) => {
      row.forEach((value, j) => {
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
      });
    });

    this.removeTrailingZeros(cols);
    this.removeTrailingZeros(rows);
  }

  removeTrailingZeros(arrays) {
    arrays.forEach((array) => {
      if (array.length > 1 && !array[array.length - 1]) {
        array.pop();
      }
    });
  }

  toggleCellState(row, column) {
    this.puzzleArray[row][column] = this.puzzleArray[row][column] ? 0 : 1;
    this.clearField();
    this.setField(this.puzzleArray, this.rows, this.cols);
  }

  getSolution() {
    return this.puzzleTemplate;
  }
}
