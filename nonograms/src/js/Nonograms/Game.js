import Puzzle from './Puzzle';
import Board from './Board';

export default class Game {
  constructor(size, template, gameHandler, isGameloaded) {
    this.puzzle = new Puzzle(size, template, isGameloaded);
    new Board(this.puzzle, gameHandler, isGameloaded);
  }
}
