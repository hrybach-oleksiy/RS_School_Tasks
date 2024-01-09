import createHTMLElement from './createHTMLElement';

/**
 * @param {Array} kk Array of keyboard letters.
 * @returns {Array} Array of HTML elements with keyboard letters.
 */

const createKeyboard = (kk) => {
  const keys = [];

  for (let i = 0; i < kk.length; i++) {
    const div = createHTMLElement(
      'button',
      { class: 'key', ['data-letter']: kk[i] },
      kk[i].toUpperCase(),
    );
    keys.push(div);
  }

  return keys;
};

export default createKeyboard;
