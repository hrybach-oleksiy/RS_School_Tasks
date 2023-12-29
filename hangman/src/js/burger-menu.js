const burgerMenuBtn = document.querySelector('.burger-menu__btn');
const burgerMenuLinks = document.querySelectorAll('.burger-menu__link');

const showMenu = () => {
    burgerMenuBtn.classList.add('burger-menu__btn--active');
    document.body.style.overflowY = 'hidden';
};

const hideMenu = () => {
    burgerMenuBtn.classList.remove('burger-menu__btn--active');
    document.body.style.overflowY = '';
};

burgerMenuBtn.addEventListener('click', () => {
    if (burgerMenuBtn.classList.contains('burger-menu__btn--active')) {
        hideMenu();
    } else {
        showMenu();
    }
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        hideMenu();

        setTimeout(() => {
            window.location.href = link.href;
        }, 700);
    });
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener('click', hideMenu);
});
