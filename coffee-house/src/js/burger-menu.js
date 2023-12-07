const burgerMenuBtn = document.querySelector('.burger-menu__btn');
const burgerMenuLinks = document.querySelectorAll('.burger-menu__link');
const burgerMenuList = document.querySelector('.burger-menu__list');

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

burgerMenuList.addEventListener('transitionend', (event) => {
    if (
        event.propertyName === 'transform' &&
        !burgerMenuBtn.classList.contains('burger-menu__btn--active')
    ) {
        const menuLinks = event.target.children;

        // burgerMenuLinks.forEach((item) => {
        //     item.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         hideMenu();

        //         const linkTarget = event.currentTarget.getAttribute('href');

        //         setTimeout(() => {
        //             window.location.href = linkTarget;
        //             // window.location.pathname === '/'
        //             //     ? `/${linkTarget}`
        //             //     : linkTarget;
        //         }, 700);
        //     });
        // });
    }
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener('click', hideMenu);
});
