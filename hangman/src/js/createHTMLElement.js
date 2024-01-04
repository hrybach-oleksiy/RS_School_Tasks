const createHTMLElement = (tag, attributes, content, children) => {
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
            element.appendChild(content);
        }
    }

    // Append children
    if (children) {
        if (Array.isArray(children)) {
            children.forEach((child) => {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                }
            });
        } else if (children instanceof HTMLElement) {
            element.appendChild(children);
        }
    }

    return element;
};

export default createHTMLElement;
