export default class Utility {
  static create(className, content = '', tagName = 'div') {
    const element = document.createElement(tagName);

    element.classList.add(className);
    element.textContent = content;

    return element;
  }
}
