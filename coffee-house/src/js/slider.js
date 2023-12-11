const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const progressBarElems = document.querySelectorAll('.progress-bar__bar');
const slider = document.querySelector('.slides');

const SLIDER_WIDTH = 1152;

let step = 0;
let fillSpeed = 7;
let progressBarWidth = 0;
let progressBarFillIntervalID = 0;
let switchSlidesIntervalID = 0;
let decreaseTimerID = 0;
let currentSwitchingInterval = 7000;
let x1 = null;
let sliderPosition = SLIDER_WIDTH;
let initialSliderPosition = null;
let currentSliderPosition = SLIDER_WIDTH;

const handleTouchStart = (event) => {
    const initTouchX = event.touches[0].clientX;
    if (initTouchX > 119 && initTouchX < 1032) {
        x1 = initTouchX;
        initialSliderPosition = sliderPosition;
    }
};

const handleTouchMove = (event) => {
    const currentTouchPosition = event.touches[0].clientX;
    const difference = currentTouchPosition - x1;

    sliderPosition = initialSliderPosition + difference;

    slider.style.transform = `translateX(${sliderPosition}px)`;
};

const handleTouchEnd = (event) => {
    isTouchEnd = true;
    const endTouchPosition = event.changedTouches[0].clientX;

    if (endTouchPosition < x1) {
        // console.log('move left');
        sliderPosition = currentSliderPosition;
        moveLeft();
    } else {
        // console.log('move right');
        sliderPosition = currentSliderPosition;
        moveRight();
    }

    x1 = null;
    initialSliderPosition = null;
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

const animateSlider = (direction) => {
    if (direction === 'left') {
        sliderPosition -= SLIDER_WIDTH;
        if (sliderPosition < -SLIDER_WIDTH) {
            sliderPosition = SLIDER_WIDTH;
        }
    } else if (direction === 'right') {
        sliderPosition += SLIDER_WIDTH;
        if (sliderPosition > SLIDER_WIDTH) {
            sliderPosition = -SLIDER_WIDTH;
        }
    }

    slider.style.transform = `translateX(${sliderPosition}px)`;
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
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    currentSliderPosition -= SLIDER_WIDTH;
    if (currentSliderPosition < -SLIDER_WIDTH) {
        currentSliderPosition = SLIDER_WIDTH;
    }
    animateSlider('left');
    console.log('move left');

    step++;

    if (step > progressBarElems.length - 1) {
        step = 0;
    }

    handleSwitchingSlides();
};

const moveRight = () => {
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    currentSliderPosition += SLIDER_WIDTH;
    if (currentSliderPosition > SLIDER_WIDTH) {
        currentSliderPosition = -SLIDER_WIDTH;
    }
    animateSlider('right');
    console.log('move right');
    step--;

    if (step < 0) {
        step = progressBarElems.length - 1;
    }

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

prevBtn.addEventListener('click', moveRight);
nextBtn.addEventListener('click', moveLeft);

slider.addEventListener('transitionend', () => {
    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);
});

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);
slider.addEventListener('touchend', handleTouchEnd, false);

// pause, continue
slides.forEach((slide) => {
    //since slide cover 100% width I add listener to the child of slide(wrapper) which cover only central part of the slide
    slide.lastElementChild.addEventListener('pointerover', (event) => {
        // event.preventDefault();
        pauseSwitching();
    });
    slide.lastElementChild.addEventListener('pointerout', (event) => {
        // event.preventDefault();
        resumeSwitching();
    });
});

// TODO: uncomment to start automatic switching
fillProgressBar();
decreaseTimer();
switchSlidesIntervalID = setInterval(moveLeft, currentSwitchingInterval);
