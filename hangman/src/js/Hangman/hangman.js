import createHTMLElement from '../createHTMLElement';
import createKeyboard from '../createKeyboard';
import keys from '../keys';

// Creating a <div> element with attributes, content, and children
// const container= createHTMLElement(
//     'div',
//     { class: 'container' },
//     'Hello, World!',
//     [
//         createHTMLElement('p', null, 'This is a paragraph.'),
//         createHTMLElement(
//             'a',
//             { href: 'https://example.com' },
//             'Link to Example',
//         ),
//     ],
// );

// HTML Elements
const container = createHTMLElement('div', { class: 'container' });
const wrapper = createHTMLElement('div', { class: 'wrapper' });
const hangmanImage = createHTMLElement(
    'div',
    { class: 'hangman__image' },
    null,
    [
        createHTMLElement('img', {
            src: 'assets/gallows.svg',
            alt: 'Gallows',
            class: 'gallows',
        }),
        createHTMLElement('img', {
            src: 'assets/head.svg',
            alt: 'Head',
            class: 'head',
        }),
        createHTMLElement('img', {
            src: 'assets/body.svg',
            alt: 'Body',
            class: 'body',
        }),
        createHTMLElement('img', {
            src: 'assets/right-hand.svg',
            alt: 'Right Hand',
            class: 'right-hand',
        }),
        createHTMLElement('img', {
            src: 'assets/left-hand.svg',
            alt: 'Left Hand',
            class: 'left-hand',
        }),
        createHTMLElement('img', {
            src: 'assets/right-foot.svg',
            alt: 'Right Foot',
            class: 'right-foot',
        }),
        createHTMLElement('img', {
            src: 'assets/left-foot.svg',
            alt: 'Left Foot',
            class: 'left-foot',
        }),
    ],
);
const hangmanContent = createHTMLElement('div', { class: 'hangman__content' });
const hold = createHTMLElement('div', { class: 'hold' }, '_ _ _ _ _ _ _');
const hint = createHTMLElement('div', { class: 'hint' }, 'Hint: ', [
    createHTMLElement('span', { class: 'hint__text' }, 'Just a sample'),
]);
const guesses = createHTMLElement(
    'div',
    { class: 'guesses' },
    'Incorrect guesses: ',
    [createHTMLElement('span', { class: 'guesses__text' }, '0/6')],
);
const keyboard = createHTMLElement('div', { class: 'keyboard' }, null, [
    ...createKeyboard(keys),
]);

container.append(wrapper);
hangmanContent.append(hold, hint, guesses, keyboard);
wrapper.append(hangmanImage, hangmanContent);
document.body.append(container);
