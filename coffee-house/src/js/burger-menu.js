const burgerBtn = document.querySelector('.burger-menu__btn');
const burgerItems = document.querySelectorAll('.burger-menu__item');

const showMenu = () => {
    burgerBtn.classList.add('burger-menu__btn--active');
};

const hideMenu = () => {
    burgerBtn.classList.remove('burger-menu__btn--active');
};

burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('burger-menu__btn--active')) {
        hideMenu();
    } else {
        showMenu();
    }
});

burgerItems.forEach((item) => {
    item.addEventListener('click', hideMenu);
});
