const generateModalContent = (answer, titleContent, className) => {
  const modalTitle = document.querySelector('.modal__title');
  const modalResult = document.querySelector('.modal__result');

  if (className === 'wrong') {
    modalTitle.classList.remove('correct');
  } else {
    modalTitle.classList.remove('wrong');
  }

  modalTitle.textContent = titleContent;
  modalTitle.classList.add(className);
  modalResult.textContent = answer;
  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    key.classList.remove('disabled');
  });
  // keyboard.removeEventListener('click', guessWord);
};

export default generateModalContent;
