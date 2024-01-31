export default class GameStateManager {
  static serializeGameState(board) {
    return JSON.stringify({
      puzzleState: board.getPuzzleState(),
      timer: board.getTimer(),
      soundEnabled: board.getSoundState(),
    });
  }

  static saveGameState(data) {
    localStorage.setItem('savedGameState', data);
  }

  static loadGameState() {
    const savedData = localStorage.getItem('savedGameState');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }
}
