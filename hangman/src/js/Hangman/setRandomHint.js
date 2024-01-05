import { hint } from './hints';

/**
 *
 * @returns {String} Random hint from Hint Array.
 */

const setRandomAnswer = () => {
    const randomWordOrder = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers[randomWordOrder];

    return randomAnswer;
};

export default setRandomAnswer;
