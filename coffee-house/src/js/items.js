import itemsData from '../api/items.json';

const itemsBlock = document.querySelector('.items');
const menuTabs = document.querySelectorAll('.btn-tab');
const loaderBtn = document.querySelector('.menu-loader');
const loaderSvg = document.querySelector('.menu-loader__svg');

// let isRendered = false;
const initialCategory = 'coffee';
let currentCategory = initialCategory;
let isLoadingMore = false;

// FIXME: delete loader when in the category only 4 elements
// FIXME: fix rerender after resize
const renderItems = (items, category) => {
    let filteredItems = items.filter((item) => item.category === category);

    if (window.innerWidth <= 768 && !isLoadingMore) {
        filteredItems = filteredItems.slice(0, 4);
        loaderBtn.classList.remove('hidden');
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

// const showHiddenItems = (items) => {
//     itemsBlock.classList.add('visible');
//     items.forEach((item) => {
//         item.classList.add('visible');
//     });
// };

// const hideItems = () => {
//     itemsBlock.classList.remove('visible');
// };

const loadItems = () => {
    loaderSvg.classList.add('hidden');
    loaderBtn.classList.remove('menu-loader');
    loaderBtn.classList.add('loader');
    setTimeout(() => {
        // const items = document.querySelectorAll('.item');
        loaderBtn.classList.add('hidden');
        loaderBtn.classList.remove('loader');
        loaderBtn.removeEventListener('click', loadItems);
        isLoadingMore = true;
        renderItems(itemsData, currentCategory);
    }, 2000);
};

menuTabs.forEach((menuTab) => {
    menuTab.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        const activeTab = document.querySelector('.btn-tab--active');
        currentCategory = category;

        activeTab.classList.remove('btn-tab--active');
        menuTab.classList.add('btn-tab--active');

        itemsBlock.innerHTML = '';
        isLoadingMore = false;
        renderItems(itemsData, currentCategory);
        loaderBtn.classList.remove('hidden');
        loaderBtn.classList.add('menu-loader');
        loaderSvg.classList.remove('hidden');
        loaderBtn.addEventListener('click', loadItems);

        // setTimeout(() => {
        //     const items = document.querySelectorAll('.item');
        //     items.forEach((item) => {
        //         item.classList.add('visible');
        //     });
        // }, 100);

        // loaderBtn.classList.remove('hide');
        // loaderBtn.classList.add('menu-loader');
        // loaderBtn.addEventListener('click', loadItems);
    });
});

loaderBtn.addEventListener('click', loadItems);

window.addEventListener('load', () => {
    renderItems(itemsData, initialCategory);
});

// window.addEventListener('resize', () => {
//     // if (window.innerWidth <= 768 && !isRendered) {
//     //     renderItems(itemsData, currentCategory);
//     //     console.log('resized, width less than 768px');
//     //     isRendered = false;
//     // } else {
//     //     // isRendered = false;
//     //     renderItems(itemsData, currentCategory);
//     //     ('resized, width more than 768px');
//     // }

//     if (window.innerWidth > 768 && isRendered) {
//         console.log('resized, width more than 768px');
//         renderItems(itemsData, currentCategory);
//         isRendered = false;
//     }
// });
