const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const dashes = document.querySelectorAll('.slider__dash');
const slider = document.querySelector('.slides');

const slidesArr = [...slides];
let step = 0;
let defaultSwitchingTime = 7000;
let currentSwitchingTime = 7000;
let timerID;
let timeLeft = currentSwitchingTime;
let isPaused = false;
let currentTimerId;

const shiftSlides = (direction) => {
    let shiftedSlides = [];

    if (direction === 'left') {
        shiftedSlides = slidesArr.slice(1).concat(slidesArr.slice(0, 1));
    }

    if (direction === 'right') {
        const lastSlideIndex = slidesArr.length - 1;

        shiftedSlides = [slidesArr[lastSlideIndex]].concat(
            slidesArr.slice(0, lastSlideIndex),
        );
    }

    // Delete all slides from HTML
    slides.forEach((slide) => {
        slider.removeChild(slide);
    });

    // Insert slides in new order
    shiftedSlides.forEach((slide) => {
        slider.appendChild(slide);
    });

    // Update slidesArr to with slide in new order for the next click
    shiftedSlides.forEach((slide, index) => {
        slidesArr[index] = slide;
    });
};

const setActiveDash = () => {
    for (let dash of dashes) {
        dash.classList.remove('active');
    }
    dashes[step].classList.add('active');
};

const moveLeft = () => {
    slider.classList.add('transition-left');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    step++;

    if (step > dashes.length - 1) {
        step = 0;
    }
    setActiveDash();
};

const moveRight = () => {
    slider.classList.add('transition-right');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    step--;

    if (step < 0) {
        step = dashes.length - 1;
    }
    setActiveDash();
};

const adjustSwitchingTime = () => {
    // currentSwitchingTime -= 1000;
    // console.log(currentSwitchingTime);
    // currentTimerId = setTimeout(adjustSwitchingTime, 1000);
    if (!isPaused) {
        moveLeft();
        timeLeft = currentSwitchingTime;
        currentTimerId = setTimeout(adjustSwitchingTime, timeLeft);
    }
};

const initSwitching = () => {
    // timerID = setInterval(moveLeft, defaultSwitchingTime);
    // currentTimerId = setTimeout(adjustSwitchingTime, 1000);

    currentTimerId = setTimeout(adjustSwitchingTime, timeLeft);
};

const pauseSwitching = () => {
    clearTimeout(currentTimerId);
    isPaused = true;
    console.log('Timer paused');
};
const resumeSwitching = () => {
    isPaused = false;
    initSwitching();
    console.log('Timer resumed');
};

prevBtn.addEventListener('click', moveLeft);
nextBtn.addEventListener('click', moveRight);

slider.addEventListener('animationend', (event) => {
    const animationDirection = event.animationName;

    if (animationDirection === 'move-left') {
        slider.classList.remove('transition-left');
        shiftSlides('left');
    }

    if (animationDirection === 'move-right') {
        slider.classList.remove('transition-right');
        shiftSlides('right');
    }

    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);
    currentSwitchingTime = 7000;
});

// pause
dashes[0].addEventListener('click', () => {
    // clearInterval(timerID);
    // clearTimeout(currentTimerId);
    // console.log('timer stopped');
    if (!isPaused) {
        pauseSwitching();
    }
});

// continue
dashes[2].addEventListener('click', () => {
    // clearInterval(timerID);
    // timerID = setInterval(moveLeft, currentSwitchingTime);
    // currentTimerId = setTimeout(adjustSwitchingTime, 1000);
    // console.log('timer resumed');
    if (isPaused) {
        resumeSwitching();
    }
});

// initSwitching();

// for (let i = 0; i < dashes.length; i++) {
//     dashes[i].addEventListener('click', () => {
//         currentSlide(i + 1);
//     });
// }
