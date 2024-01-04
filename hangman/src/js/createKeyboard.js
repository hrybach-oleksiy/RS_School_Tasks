import createHTMLElement from './createHTMLElement';

/**
 * @param {Array} kk Array of keyboard letters.
 */

const createKeyboard = (kk) => {
    const keys = [];

    for (let i = 0; i < kk.length; i++) {
        const div = createHTMLElement('div', { class: 'key' }, null, [
            createHTMLElement('span', { class: 'letter' }, kk[i]),
        ]);
        keys.push(div);
    }

    return keys;
};

export default createKeyboard;
