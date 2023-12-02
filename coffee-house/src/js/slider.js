const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const progressBarElems = document.querySelectorAll('.progress-bar__bar');
const slider = document.querySelector('.slides');

const slidesArr = [...slides];
let step = 0;
let fillSpeed = 7;
let progressBarWidth = 0;
let progressBarFillIntervalID = 0;
let switchSlidesIntervalID = 0;
let decreaseTimerID = 0;
let currentSwitchingInterval = 7000;

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

const decreaseTimer = () => {
    decreaseTimerID = setInterval(() => {
        currentSwitchingInterval -= 1000;

        if (currentSwitchingInterval <= 0) {
            currentSwitchingInterval = 7000;
        }
    }, 1000);
};

const fillProgressBar = () => {
    const activeBar = document.querySelector('.progress-bar__bar.active');

    const increment = 100 / (fillSpeed * 10); // filling speed in % for 0.1 sec

    progressBarFillIntervalID = setInterval(() => {
        progressBarWidth += increment;
        activeBar.style.width = progressBarWidth + '%';

        if (progressBarWidth >= 100) {
            clearInterval(progressBarFillIntervalID);
        }
    }, 100); // every 0.1 sec update progress
};

const setActiveProgressBar = () => {
    for (let bar of progressBarElems) {
        bar.classList.remove('active');
        bar.style.width = 0;
    }
    progressBarElems[step].classList.add('active');
};

const handleSwitchingSlides = () => {
    setActiveProgressBar();
    clearInterval(progressBarFillIntervalID);
    clearInterval(decreaseTimerID);
    clearInterval(switchSlidesIntervalID);
    progressBarWidth = 0;
    currentSwitchingInterval = 7000;
    switchSlidesIntervalID = setInterval(moveLeft, currentSwitchingInterval);
    fillProgressBar();
    decreaseTimer();
};

const moveLeft = () => {
    slider.classList.add('transition-left');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    step++;

    if (step > progressBarElems.length - 1) {
        step = 0;
    }

    handleSwitchingSlides();
};

const moveRight = () => {
    slider.classList.add('transition-right');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    step--;

    if (step < 0) {
        step = progressBarElems.length - 1;
    }
    setActiveProgressBar();

    handleSwitchingSlides();
};

const pauseSwitching = () => {
    clearInterval(progressBarFillIntervalID);
    clearInterval(switchSlidesIntervalID);
    clearInterval(decreaseTimerID);
};

const resumeSwitching = () => {
    switchSlidesIntervalID = setInterval(moveLeft, currentSwitchingInterval);
    fillProgressBar();
    decreaseTimer();
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
});

// pause, continue
slides.forEach((slide) => {
    //since slide cover 100% width I add listener to the child of slide(wrapper) which cover only central part of the slide
    slide.lastElementChild.addEventListener('mouseover', () => {
        pauseSwitching();
    });
    slide.lastElementChild.addEventListener('mouseout', () => {
        resumeSwitching();
    });
});

// fillProgressBar();
// decreaseTimer();
// switchSlidesIntervalID = setInterval(moveLeft, currentSwitchingInterval);
