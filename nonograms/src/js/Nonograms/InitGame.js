import GameHandler from './GameHandler';

export default class InitGame {
  constructor() {
    this.startBasicGame();
  }

  startBasicGame() {
    const gameHandler = new GameHandler(5);
    const template = gameHandler.templates[0].template;
    gameHandler.startGame(5, template, gameHandler, false);
  }
}
