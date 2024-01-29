import Puzzle from './Puzzle';
import Board from './Board';

export default class Game {
  constructor(size, template, gameHandler) {
    this.board = new Puzzle(size, template);
    new Board(this.board, gameHandler);
  }
}
