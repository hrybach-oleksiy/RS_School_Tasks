import Puzzle from './Puzzle';
import Board from './Board';

export default class Game {
  constructor(size, gameHandler) {
    this.board = new Puzzle(size);
    new Board(this.board, gameHandler);
  }
}
