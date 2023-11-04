const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slide__btn--next');
const prevBtn = document.querySelector('.slide__btn--prev');
const dashes = document.querySelectorAll('.slider__dash');

let slideIndex = 1;

const setActiveSlide = (index) => {
    for (let slide of slides) {
        slide.classList.remove('active');
    }
    slides[index - 1].classList.add('active');
};

const setActiveDash = (index) => {
    for (let dash of dashes) {
        dash.classList.remove('active');
    }
    dashes[index - 1].classList.add('active');
};

const showSlides = (n) => {
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    setActiveSlide(slideIndex);
    setActiveDash(slideIndex);
};

const plusSlides = (n) => {
    showSlides((slideIndex += n));
};

const currentSlide = (n) => {
    showSlides((slideIndex = n));
};

nextBtn.addEventListener('click', () => {
    plusSlides(1);
});

prevBtn.addEventListener('click', () => {
    plusSlides(-1);
});

for (let i = 0; i < dashes.length; i++) {
    dashes[i].addEventListener('click', () => {
        currentSlide(i + 1);
    });
}

// setInterval(() => {
//     plusSlides(1);
// }, 5000);
