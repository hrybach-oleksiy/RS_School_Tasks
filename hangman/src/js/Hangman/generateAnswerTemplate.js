/**
 * @param {String} word Word from answer's Array.
 * @returns {String} Template string with replaced letter
 */

const generateAnswerTemplate = (word) => {
    const wordArray = word.split('');
    const answerTemplate = [];

    for (let i = 0; i < wordArray.length; i++) {
        answerTemplate.push('_');
    }

    return answerTemplate.join(' ');
};

export default generateAnswerTemplate;
