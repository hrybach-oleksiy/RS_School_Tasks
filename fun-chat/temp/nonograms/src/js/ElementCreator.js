export default class ElementCreator {
  static create(tag, attributes, content = null, children = null) {
    const element = document.createElement(tag);

    // Set attributes
    if (attributes) {
      for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
          element.setAttribute(key, attributes[key]);
        }
      }
    }

    // Set content
    if (content) {
      if (typeof content === 'string') {
        element.textContent = content;
      } else if (content instanceof HTMLElement) {
        element.append(content);
      }
    }

    // Append children
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child instanceof HTMLElement) {
            element.append(child);
          }
        });
      } else if (children instanceof HTMLElement) {
        element.append(children);
      }
    }

    return element;
  }
}
