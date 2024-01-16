import createHTMLElement from '../createHTMLElement';
import createKeyboard from '../createKeyboard';
import keys from '../keys';

const container = createHTMLElement('div', { class: 'container' });
const wrapper = createHTMLElement('div', { class: 'wrapper' });
const hangmanImage = createHTMLElement(
  'div',
  { class: 'hangman__image' },
  null,
  [
    createHTMLElement('div', { class: 'gallows-wrapper' }, null, [
      createHTMLElement('img', {
        src: 'assets/gallows.svg',
        alt: 'Gallows',
        class: 'gallows',
      }),
    ]),
    createHTMLElement('div', { class: 'body-wrapper' }, null, [
      createHTMLElement('img', {
        src: 'assets/head.svg',
        alt: 'Head',
        class: 'head hidden',
      }),
      createHTMLElement('img', {
        src: 'assets/body.svg',
        alt: 'Body',
        class: 'body hidden',
      }),
      createHTMLElement('img', {
        src: 'assets/right-hand.svg',
        alt: 'Right Hand',
        class: 'right-hand hidden',
      }),
      createHTMLElement('img', {
        src: 'assets/left-hand.svg',
        alt: 'Left Hand',
        class: 'left-hand hidden',
      }),
      createHTMLElement('img', {
        src: 'assets/right-foot.svg',
        alt: 'Right Foot',
        class: 'right-foot hidden',
      }),
      createHTMLElement('img', {
        src: 'assets/left-foot.svg',
        alt: 'Left Foot',
        class: 'left-foot hidden',
      }),
    ]),
  ],
);
const hangmanContent = createHTMLElement('div', { class: 'hangman__content' });
const hold = createHTMLElement('div', { class: 'hold' }, '');
const hint = createHTMLElement('div', { class: 'hint' }, null, [
  createHTMLElement('span', { class: 'hint__heading' }, 'Hint: '),
  createHTMLElement('span', { class: 'hint__text' }, 'Just a sample'),
]);
const guesses = createHTMLElement('div', { class: 'guesses' }, null, [
  createHTMLElement(
    'span',
    { class: 'guesses__heading' },
    'Incorrect guesses: ',
  ),
  createHTMLElement('span', { class: 'guesses__text' }, '0/6'),
]);
const keyboard = createHTMLElement('div', { class: 'keyboard' }, null, [
  ...createKeyboard(keys),
]);
const heading = createHTMLElement(
  'h1',
  { class: 'hangman__title' },
  'Hangman Game',
);

const description = createHTMLElement(
  'p',
  { class: 'hangman__description' },
  'Use the keyboard below to guess the word',
);

export {
  container,
  wrapper,
  hangmanImage,
  hangmanContent,
  hold,
  hint,
  guesses,
  keyboard,
  heading,
  description,
};
