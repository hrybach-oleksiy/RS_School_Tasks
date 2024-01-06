import createHTMLElement from '../createHTMLElement';
import createKeyboard from '../createKeyboard';
import keys from '../keys';
import generateAnswerTemplate from './generateAnswerTemplate';
import setRandomAnswer from './setRandomAnswer';
import animateHangman from './animateHangman';
import { hints, answers } from './hints';

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

let randomAnswer = '';
let randomHint = '';
let correctAnswer = '';
let displayedLetters = [];
let incorrectGuesses = 0;

// HTML Elements
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

const guessWord = (event) => {
    const guessLetter = event.target.dataset.letter;
    const currentButton = event.target;
    const answerArray = randomAnswer.split('');
    // const capitalLetter = answerArray[0];

    let counter = 0;

    if (incorrectGuesses < 6) {
        for (let i = 0; i < randomAnswer.length; i++) {
            if (guessLetter === answerArray[i].toLowerCase()) {
                displayedLetters[i] = guessLetter.toUpperCase();
                currentButton.classList.add('disabled');
                hold.textContent = displayedLetters.join(' ');
                correctAnswer = displayedLetters.join('');
                counter++;
            }
        }

        if (counter === 0) {
            const guessesCounter = document.querySelector('.guesses__text');
            incorrectGuesses++;
            guessesCounter.textContent = `${incorrectGuesses}/6`;
            animateHangman(incorrectGuesses);

            if (incorrectGuesses === 6) {
                console.log('You lost. Game over!');
                keyboard.removeEventListener('click', guessWord);
            }

            console.log('wrong letter');
            counter = 0;
        } else {
            counter = 0;
        }
    }

    // if (answer === winningCheck) {
    //     livesDisplay.innerHTML = `YOU WIN!`;
    //     return;
    // } else {
    //     if (life > 0) {
    //         for (let j = 0; j < answer.length; j++) {
    //             if (guessWord === answerArray[j]) {
    //                 wordDisplay[j] = guessWord;
    //                 console.log(guessWord);
    //                 answerDisplay.innerHTML = wordDisplay.join(' ');
    //                 winningCheck = wordDisplay.join('');
    //                 //console.log(winningCheck)
    //                 counter += 1;
    //             }
    //         }

    //         if (counter === 0) {
    //             life -= 1;
    //             counter = 0;
    //             animate();
    //         } else {
    //             counter = 0;
    //         }

    //         if (life > 1) {
    //             livesDisplay.innerHTML = `You have ${life} lives!`;
    //         } else if (life === 1) {
    //             livesDisplay.innerHTML = `You have ${life} life!`;
    //         } else {
    //             livesDisplay.innerHTML = `GAME OVER!`;
    //         }
    //     } else {
    //         return;
    //     }
    //     console.log(wordDisplay);
    //     //console.log(counter);
    //     //console.log(life);
    //     if (answer === winningCheck) {
    //         livesDisplay.innerHTML = `YOU WIN!`;
    //         return;
    //     }
    // }
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
    keyboard.addEventListener('click', guessWord);
};

container.append(heading, description, wrapper);
hangmanContent.append(hold, hint, guesses, keyboard);
wrapper.append(hangmanImage, hangmanContent);
document.body.append(container);

init();
