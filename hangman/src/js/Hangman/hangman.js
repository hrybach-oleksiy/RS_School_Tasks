import generateAnswerTemplate from './generateAnswerTemplate';
import setRandomAnswer from './setRandomAnswer';
import animateHangman from './animateHangman';
import createModal from '../createModal';
import { hints, answers } from './hints';
import {
  heading,
  description,
  wrapper,
  hold,
  hint,
  guesses,
  keyboard,
  hangmanImage,
  hangmanContent,
  container,
} from './htmlElements';
import generateModalContent from './generateModalContent';

const MAX_INCORRECT_GUESSES = 6;
const checkedLetters = [];

let randomAnswer = '';
let correctAnswer = '';
let displayedLetters = [];
let incorrectGuesses = 0;

const modalWindow = createModal();

container.append(heading, description, wrapper, modalWindow);
hangmanContent.append(hold, hint, guesses, keyboard);
wrapper.append(hangmanImage, hangmanContent);
document.body.append(container);

const guessesCounter = document.querySelector('.guesses__text');

const guessWord = (event) => {
  let guessLetter;
  let currentKey;

  if (event.type === 'click' && event.target.classList.contains('key')) {
    guessLetter = event.target.dataset.letter;
    currentKey = event.target;
    currentKey.classList.add('disabled');
  }

  if (event.type === 'keydown') {
    if (/^[a-zA-Z]$/.test(event.key)) {
      guessLetter = event.key.toLowerCase();
      currentKey = document.querySelector(`.key[data-letter="${guessLetter}"]`);
      currentKey.classList.add('disabled');
    } else {
      return;
    }
  }

  if (event.target.classList.contains('key') || event.type === 'keydown') {
    const answerArray = randomAnswer.split('');

    let counter = 0;

    if (incorrectGuesses < MAX_INCORRECT_GUESSES) {
      for (let i = 0; i < randomAnswer.length; i++) {
        if (guessLetter === answerArray[i].toLowerCase()) {
          displayedLetters[i] = guessLetter.toUpperCase();
          correctAnswer = displayedLetters.join('');
          hold.textContent = displayedLetters.join(' ');
          counter++;
        }
      }

      if (counter === 0) {
        if (checkedLetters.includes(currentKey)) {
          return;
        }

        incorrectGuesses++;
        guessesCounter.textContent = `${incorrectGuesses}/${MAX_INCORRECT_GUESSES}`;
        animateHangman(incorrectGuesses);
        checkedLetters.push(currentKey);

        if (incorrectGuesses === 6) {
          generateModalContent(randomAnswer, 'You loose. Game Over!', 'wrong');
          modalWindow.classList.remove('hidden');
        }

        counter = 0;
      } else {
        counter = 0;
      }
    }

    if (randomAnswer.toUpperCase() === correctAnswer) {
      generateModalContent(randomAnswer, 'You win!', 'correct');
      modalWindow.classList.remove('hidden');
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
  checkedLetters.length = 0;
  guessesCounter.textContent = `${incorrectGuesses}/${MAX_INCORRECT_GUESSES}`;
  modalWindow.classList.add('hidden');
  animateHangman(0);
  keyboard.addEventListener('click', guessWord);
  document.addEventListener('keydown', guessWord);
};

const playAgainBtn = document.querySelector('.play');
playAgainBtn.addEventListener('click', init);
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     init();
//   }
// });

init();
