const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slide__btn--prev');
const nextBtn = document.querySelector('.slide__btn--next');
const dashes = document.querySelectorAll('.slider__dash');
const slider = document.querySelector('.slides');

let step = 1;
let activeSlideContent = slides[step].innerHTML;

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
    let step = 0;
    if (event.animationName === 'move-left') {
        slider.classList.remove('transition-left');
        slides[0].innerHTML = slides[1].innerHTML;
    } else {
        slider.classList.remove('transition-right');
        slides[0].innerHTML = slides[2].innerHTML;
    }

    // for (let i = 0; i < slides.length; i++) {

    // }

    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);
});

// let slideIndex = 1;

// const setActiveSlide = (index) => {
// 	for (let slide of slides) {
// 		slide.classList.remove('active');
// 	}
// 	slides[index - 1].classList.add('active');
// };

// const setActiveDash = (index) => {
// 	for (let dash of dashes) {
// 		dash.classList.remove('active');
// 	}
// 	dashes[index - 1].classList.add('active');
// };

// const showSlides = (n) => {
// 	if (n > slides.length) {
// 		slideIndex = 1;
// 	}
// 	if (n < 1) {
// 		slideIndex = slides.length;
// 	}
// 	setActiveSlide(slideIndex);
// 	setActiveDash(slideIndex);
// };

// const plusSlides = (n) => {
// 	showSlides((slideIndex += n));
// };

// const currentSlide = (n) => {
// 	showSlides((slideIndex = n));
// };

// nextBtn.addEventListener('click', () => {
//     plusSlides(1);
// });

// prevBtn.addEventListener('click', () => {
//     plusSlides(-1);
// });

// for (let i = 0; i < dashes.length; i++) {
// 	dashes[i].addEventListener('click', () => {
// 		currentSlide(i + 1);
// 	});
// }

// setInterval(() => {
//     plusSlides(1);
// }, 5000);
