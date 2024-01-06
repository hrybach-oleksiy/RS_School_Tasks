/**
 *
 * @param {String} gameResult message with the game's result
 * @returns {String} html element with the modal window
 */

const createModal = (gameResult) => {
    const modal = `
	<div class="modal hidden">
		<div class="modal__content">
			<div class="modal__text">
				<h3 class="modal__title">${gameResult}</h3>
				<div class="modal__descr">
					<p>The secret word is: blablabla</p>
				</div>
			</div>
			<button class="btn play">Play Again</button>
		</div>
	</div>
	`;

    return modal;
};

export default createModal;
