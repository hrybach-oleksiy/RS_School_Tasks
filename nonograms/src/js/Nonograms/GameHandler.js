import ElementCreator from '../ElementCreator';

export default class GameHandler {
  constructor(...sizes) {
    this.sizes = sizes;
    this.rootElement = ElementCreator.create('game');
    document.body.append(this.rootElement);
    this.showInitPage();
  }

  showInitPage() {
    const rootElement = document.querySelector('.game');

    rootElement.innerHTML = '';

    const titleElement = ElementCreator.create(
      'title',
      'Nonogram Puzzle',
      'h1',
    );
    const difficultyElement = ElementCreator.create(
      'menu-choose',
      'Choose the difficulty',
      'p',
    );
    const boardElement = ElementCreator.create('menu', '', 'ul');

    for (const size of this.sizes) {
      const menuElement = ElementCreator.create('menu-item', '', 'li');

      menuElement.innerHTML = `${size} &times ${size}`;
      boardElement.append(menuElement);
    }

    rootElement.append(titleElement, difficultyElement, boardElement);
  }
}
