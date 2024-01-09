/**
 * @returns {String} html element with the modal window
 */

const createModal = () => {
  const modal = `
  <div class="modal hidden">
    <div class="modal__content">
      <div class="modal__text">
        <h3 class="modal__title"></h3>
        <div class="modal__descr">
          <p>The secret word is:</p>
          <span class="modal__result"></span>
        </div>
      </div>
    <button class="btn play">Play Again</button>
    </div>
  </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modal;
  const modalElement = tempDiv.children[0];

  return modalElement;
};

export default createModal;
