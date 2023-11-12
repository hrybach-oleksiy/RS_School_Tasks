import items from '../api/items.json';

const itemsBlock = document.querySelector('.items');
const menuTabs = document.querySelectorAll('.btn-tab');

const renderItems = (category) => {
    items
        .filter((item) => item.category === category)
        .map((item) => {
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

menuTabs.forEach((menuTab) => {
    menuTab.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        const activeTab = document.querySelector('.btn-tab--active');

        activeTab.classList.remove('btn-tab--active');
        menuTab.classList.add('btn-tab--active');

        itemsBlock.innerHTML = '';
        renderItems(category);
    });
});

renderItems('coffee');
