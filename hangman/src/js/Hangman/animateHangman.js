/**
 * @param {Number} counter counter of wrong answers
 */

const animateHangman = (counter) => {
    const head = document.querySelector('.head');
    const body = document.querySelector('.body');
    const rightHand = document.querySelector('.right-hand');
    const leftHand = document.querySelector('.left-hand');
    const rightFoot = document.querySelector('.right-foot');
    const leftFoot = document.querySelector('.left-foot');
    switch (counter) {
        case 1:
            head.classList.remove('hidden');
            break;
        case 2:
            body.classList.remove('hidden');
            break;
        case 3:
            leftHand.classList.remove('hidden');
            break;
        case 4:
            rightHand.classList.remove('hidden');
            break;
        case 5:
            leftFoot.classList.remove('hidden');
            break;
        case 6:
            rightFoot.classList.remove('hidden');
            break;
    }
};

export default animateHangman;
