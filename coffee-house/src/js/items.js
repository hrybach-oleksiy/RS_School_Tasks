import itemsData from '../api/items.json';

const itemsBlock = document.querySelector('.items');
const menuTabs = document.querySelectorAll('.btn-tab');
const loaderBtn = document.querySelector('.menu-loader');

let isRendered = false;
const initialCategory = 'coffee';
let currentCategory = initialCategory;

// FIXME: fix rerender after resize
const renderItems = (items, category) => {
    let filteredItems = items.filter((item) => item.category === category);
    console.log(isRendered);

    if (window.innerWidth <= 768) {
        console.log('windows less than 768px');
        filteredItems = filteredItems.slice(0, 4);
        isRendered = true;
    }

    itemsBlock.innerHTML = '';

    filteredItems.map((item) => {
        itemsBlock.insertAdjacentHTML(
            'beforeend',
            `
			<article class="item">
			<div class="item__photo">
				<img class="item__img"
					src=${item.src}
					alt=${item.name}
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
};

const showHiddenItems = (items) => {
    itemsBlock.classList.add('visible');
    items.forEach((item) => {
        item.classList.add('visible');
    });
};

const hideItems = () => {
    itemsBlock.classList.remove('visible');
};

const loadItems = () => {
    loaderBtn.textContent = '';
    loaderBtn.classList.remove('menu-loader');
    loaderBtn.classList.add('loader');
    setTimeout(() => {
        const items = document.querySelectorAll('.item');
        showHiddenItems(items);
        loaderBtn.classList.add('hide');
        loaderBtn.classList.remove('loader');
        loaderBtn.removeEventListener('click', loadItems);
    }, 2000);
};

menuTabs.forEach((menuTab) => {
    menuTab.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        const activeTab = document.querySelector('.btn-tab--active');
        currentCategory = category;

        activeTab.classList.remove('btn-tab--active');
        menuTab.classList.add('btn-tab--active');
        hideItems();

        itemsBlock.innerHTML = '';

        renderItems(itemsData, currentCategory);

        loaderBtn.classList.remove('hide');
        loaderBtn.classList.add('menu-loader');
        loaderBtn.addEventListener('click', loadItems);
    });
});

loaderBtn.addEventListener('click', loadItems);

window.addEventListener('load', () => {
    renderItems(itemsData, initialCategory);
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !isRendered) {
        renderItems(itemsData, currentCategory);
        console.log('resized, width less than 768px');
        isRendered = true;
    } else {
        isRendered = false;
        renderItems(itemsData, currentCategory);
        ('resized, width more than 768px');
    }
});
