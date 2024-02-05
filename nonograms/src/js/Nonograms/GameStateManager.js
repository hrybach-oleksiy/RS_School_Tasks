export default class GameStateManager {
  static saveGameState(gameState) {
    const serializedState = JSON.stringify(gameState);
    localStorage.setItem('gameState', serializedState);
  }

  static loadGameState() {
    const serializedState = localStorage.getItem('gameState');
    return serializedState ? JSON.parse(serializedState) : null;
  }
}
