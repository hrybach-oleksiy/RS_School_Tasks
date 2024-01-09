import { answers } from './hints';

/**
 *
 * @returns {String} Random word from Answers Array.
 */

const setRandomAnswer = () => {
  const randomWordOrder = Math.floor(Math.random() * answers.length);
  const randomAnswer = answers[randomWordOrder];

  return randomAnswer;
};

export default setRandomAnswer;
