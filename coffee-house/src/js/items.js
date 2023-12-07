import itemsData from '../api/items.json';

const itemsBlock = document.querySelector('.items');
const menuTabs = document.querySelectorAll('.menu-tab');
const loaderBtn = document.querySelector('.menu-loader');
const loaderSvg = document.querySelector('.menu-loader__svg');

let isRendered = true;
const initialCategory = 'coffee';
let currentCategory = initialCategory;
let isLoadingMore = false;
let itemsNumber = 0;

const hideLoadMoreBtn = () => {
    loaderSvg.classList.add('hidden');
    loaderBtn.classList.remove('menu-loader');
    loaderBtn.classList.add('hidden');
};

const showLoadMoreBtn = () => {
    loaderBtn.classList.remove('hidden');
    loaderBtn.classList.add('menu-loader');
    loaderSvg.classList.remove('hidden');
};

const showLoader = () => {
    loaderBtn.classList.add('loader');
};

const hideLoader = () => {
    loaderBtn.classList.remove('loader');
};

const renderItems = (items, category) => {
    let filteredItems = items.filter((item) => item.category === category);
    itemsNumber = filteredItems.length;

    if (window.innerWidth <= 768 && !isLoadingMore && itemsNumber > 4) {
        filteredItems = filteredItems.slice(0, 4);
        showLoadMoreBtn();
    }

    itemsBlock.innerHTML = '';

    filteredItems.map((item) => {
        itemsBlock.insertAdjacentHTML(
            'beforeend',
            `
				<article class="item" data-id=${item.id}>
				<div class="item__photo">
					<img class="item__img"
						src=${item.src}
						alt="${item.name}"
					>
				</div>
				<div class="item__text">
					<h3 class="item__title">${item.name}</h3>
					<p class="item__descr">
						${item.description}
					</p>
					<div class="item__price">$${item.price}</div>
				</div>
			</article>
				`,
        );
    });

    setTimeout(() => {
        const items = document.querySelectorAll('.item');
        items.forEach((item) => {
            item.classList.add('visible');
        });
    }, 50);
};

const loadItems = () => {
    hideLoadMoreBtn();
    showLoader();

    setTimeout(() => {
        hideLoader();
        loaderBtn.removeEventListener('click', loadItems);
        isLoadingMore = true;
        renderItems(itemsData, currentCategory);
    }, 2000);
};

menuTabs.forEach((menuTab) => {
    menuTab.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        const activeTab = document.querySelector('.menu-tab--active');

        currentCategory = category;

        activeTab.classList.remove('menu-tab--active');
        menuTab.classList.add('menu-tab--active');
        hideLoadMoreBtn();
        loaderBtn.addEventListener('click', loadItems);

        itemsBlock.innerHTML = '';
        isLoadingMore = false;
        renderItems(itemsData, currentCategory);
    });
});

loaderBtn.addEventListener('click', loadItems);

window.addEventListener('load', () => {
    renderItems(itemsData, initialCategory);
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && isRendered) {
        renderItems(itemsData, currentCategory);
        isRendered = false;
    }

    if (window.innerWidth > 768 && !isRendered) {
        renderItems(itemsData, currentCategory);
        isRendered = true;
        loaderBtn.classList.add('hidden');
    }
});
