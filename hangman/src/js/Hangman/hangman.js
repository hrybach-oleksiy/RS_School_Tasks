import createHTMLElement from '../createHTMLElement';
import createKeyboard from '../createKeyboard';
import keys from '../keys';
import generateAnswerTemplate from './generateAnswerTemplate';
import setRandomAnswer from './setRandomAnswer';
import animateHangman from './animateHangman';
import createModal from '../createModal';
import { hints, answers } from './hints';

let randomAnswer = '';
let correctAnswer = '';
let displayedLetters = [];
let incorrectGuesses = 0;

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

const modal = createModal();

container.append(heading, description, wrapper, modal);
hangmanContent.append(hold, hint, guesses, keyboard);
wrapper.append(hangmanImage, hangmanContent);
document.body.append(container);

const playAgainBtn = document.querySelector('.play');
const modalTitle = document.querySelector('.modal__title');
const modalResult = document.querySelector('.modal__result');
const guessesCounter = document.querySelector('.guesses__text');

// TODO: refactor modal window
const guessWord = (event) => {
  let guessLetter;
  let currentKey;

  if (event.type === 'click' && event.target.classList.contains('key')) {
    guessLetter = event.target.dataset.letter;
    currentKey = event.target;
  }

  if (event.type === 'keydown') {
    if (/^[a-zA-Z]$/.test(event.key)) {
      guessLetter = event.key.toLowerCase();
      currentKey = document.querySelector(`.key[data-letter="${guessLetter}"]`);
    } else {
      return;
    }
  }

  if (event.target.classList.contains('key') || event.type === 'keydown') {
    const answerArray = randomAnswer.split('');

    let counter = 0;

    if (incorrectGuesses < 6) {
      for (let i = 0; i < randomAnswer.length; i++) {
        if (guessLetter === answerArray[i].toLowerCase()) {
          displayedLetters[i] = guessLetter.toUpperCase();
          currentKey.classList.add('disabled');
          correctAnswer = displayedLetters.join('');
          hold.textContent = displayedLetters.join(' ');
          counter++;
        }
      }

      if (counter === 0) {
        incorrectGuesses++;
        guessesCounter.textContent = `${incorrectGuesses}/6`;
        animateHangman(incorrectGuesses);

        if (incorrectGuesses === 6) {
          modalTitle.textContent = 'You loose. Game Over!';
          modalTitle.classList.add('wrong');
          modalResult.textContent = randomAnswer;
          modal.classList.remove('hidden');
          const keys = document.querySelectorAll('.key');
          keys.forEach((key) => {
            key.classList.remove('disabled');
          });
          keyboard.removeEventListener('click', guessWord);
        }
        counter = 0;
      } else {
        counter = 0;
      }
    }

    if (randomAnswer.toUpperCase() === correctAnswer) {
      modalTitle.textContent = 'You win!';
      modalTitle.classList.add('correct');
      modalResult.textContent = randomAnswer;
      modal.classList.remove('hidden');
      const keys = document.querySelectorAll('.key');
      keys.forEach((key) => {
        key.classList.remove('disabled');
      });
      keyboard.removeEventListener('click', guessWord);
    }
  }
};

const init = () => {
  const hintElem = document.querySelector('.hint__text');
  let randomAnswerIndex;
  randomAnswer = setRandomAnswer();
  console.log(randomAnswer);
  randomAnswerIndex = answers.indexOf(randomAnswer);
  hold.textContent = generateAnswerTemplate(randomAnswer);
  displayedLetters = generateAnswerTemplate(randomAnswer).split(' ');
  hintElem.textContent = hints[randomAnswerIndex];
  incorrectGuesses = 0;
  guessesCounter.textContent = `${incorrectGuesses}/6`;
  modal.classList.add('hidden');
  animateHangman(0);
  keyboard.addEventListener('click', guessWord);
  document.addEventListener('keydown', guessWord);
};

playAgainBtn.addEventListener('click', init);
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     init();
//   }
// });

init();
