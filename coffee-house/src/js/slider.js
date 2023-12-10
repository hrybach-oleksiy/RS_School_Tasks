// TODO: add touch and drag functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const progressBarElems = document.querySelectorAll('.progress-bar__bar');
const slider = document.querySelector('.slides');
// const slidesArr = [...slides];

let step = 0;
let fillSpeed = 7;
let progressBarWidth = 0;
let progressBarFillIntervalID = 0;
let switchSlidesIntervalID = 0;
let decreaseTimerID = 0;
let currentSwitchingInterval = 7000;
let x1 = null;
let sliderXPosition = 0;
let sliderPosition = 1152;

const handleTouchStart = (event) => {
    const initTouchX = event.touches[0].clientX;
    if (initTouchX > 119 && initTouchX < 1032) {
        x1 = initTouchX;
        console.log(initTouchX);
    }
};

const handleTouchMove = (event) => {
    event.preventDefault();
    let currentX = event.touches[0].clientX;
    sliderXPosition = currentX - x1;

    slider.style.left = sliderXPosition + 'px';
};

const handleTouchEnd = (event) => {
    const endTouchX = event.changedTouches[0].clientX;
    // if (endTouchX > 119 && endTouchX < 1032) {
    if (endTouchX < x1) {
        moveLeft();
        sliderXPosition = 0;
        slider.style.left = sliderXPosition;
    } else {
        slider.style.left = 1152 + 'px';
        shiftSlides('right');
    }
    x1 = null;
    // };
};

// const shiftSlides = (direction) => {
//     let shiftedSlides = [];

//     if (direction === 'left') {
//         shiftedSlides = slidesArr.slice(1).concat(slidesArr.slice(0, 1));
//     }

//     if (direction === 'right') {
//         const lastSlideIndex = slidesArr.length - 1;

//         shiftedSlides = [slidesArr[lastSlideIndex]].concat(
//             slidesArr.slice(0, lastSlideIndex),
//         );
//     }

//     // Delete all slides from HTML
//     slides.forEach((slide) => {
//         slider.removeChild(slide);
//     });

//     // Insert slides in new order
//     shiftedSlides.forEach((slide) => {
//         slider.appendChild(slide);
//     });

//     // Update slidesArr to with slide in new order for the next click
//     shiftedSlides.forEach((slide, index) => {
//         slidesArr[index] = slide;
//     });
// };

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
    if (direction === 'right') {
        sliderPosition -= 1152;
        if (sliderPosition < -1152) {
            sliderPosition = 1152;
        }
    } else if (direction === 'left') {
        sliderPosition += 1152;
        if (sliderPosition > 1152) {
            sliderPosition = -1152;
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
    animateSlider('left');

    step--;

    if (step < 0) {
        step = progressBarElems.length - 1;
    }

    handleSwitchingSlides();
};

const moveRight = () => {
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
    animateSlider('right');

    step++;

    if (step > progressBarElems.length - 1) {
        step = 0;
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

prevBtn.addEventListener('click', moveLeft);
nextBtn.addEventListener('click', moveRight);

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
    slide.lastElementChild.addEventListener('mouseover', () => {
        pauseSwitching();
    });
    slide.lastElementChild.addEventListener('mouseout', () => {
        resumeSwitching();
    });
});

// TODO: uncomment to start automatic switching
// fillProgressBar();
// decreaseTimer();
// switchSlidesIntervalID = setInterval(moveLeft, currentSwitchingInterval);
