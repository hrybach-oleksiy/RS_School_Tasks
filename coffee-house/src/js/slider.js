const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');
const dashes = document.querySelectorAll('.slider__dash');
const slider = document.querySelector('.slides');

const slidesArr = [...slides];

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

const moveLeft = () => {
    slider.classList.add('transition-left');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
};

const moveRight = () => {
    slider.classList.add('transition-right');
    prevBtn.removeEventListener('click', moveLeft);
    nextBtn.removeEventListener('click', moveRight);
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

// let slideIndex = 1;

// const setActiveSlide = (index) => {
//     for (let slide of slides) {
//         slide.classList.remove('active');
//     }
//     slides[index - 1].classList.add('active');
// };

// const setActiveDash = (index) => {
//     for (let dash of dashes) {
//         dash.classList.remove('active');
//     }
//     dashes[index - 1].classList.add('active');
// };

// const showSlides = (n) => {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;
//     }
//     setActiveSlide(slideIndex);
//     setActiveDash(slideIndex);
// };

// const plusSlides = (n) => {
//     showSlides((slideIndex += n));
// };

// const currentSlide = (n) => {
//     showSlides((slideIndex = n));
// };

// nextBtn.addEventListener('click', () => {
//     plusSlides(1);
// });

// prevBtn.addEventListener('click', () => {
//     plusSlides(-1);
// });

// for (let i = 0; i < dashes.length; i++) {
//     dashes[i].addEventListener('click', () => {
//         currentSlide(i + 1);
//     });
// }

// setInterval(() => {
//     plusSlides(1);
// }, 5000);
