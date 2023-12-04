import itemsData from '../api/items.json';

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__btn-close');
const items = document.querySelector('.items');

const itemModalInfoElements = {
    titleElem: document.querySelector('.modal__title'),
    descrElem: document.querySelector('.modal__descr p'),
    sizesElem: document.querySelector('.item-choice__btns--sizes'),
    additivesElem: document.querySelector('.item-choice__btns--additives'),
    priceElem: document.querySelector('.modal__price'),
    photoElem: document.querySelector('.modal__photo'),
};

let finalPrice = 0;
let itemPrice = 0;

const renderItemInfo = (item) => {
    const title = item.name;
    const descr = item.description;
    const sizes = item.sizes;
    const additives = item.additives;
    const price = item.price;
    const photo = item.src;

    itemModalInfoElements.titleElem.textContent = title;
    itemModalInfoElements.descrElem.textContent = descr;
    itemModalInfoElements.priceElem.textContent = `$${price}`;
    itemModalInfoElements.photoElem.innerHTML = `
	<img src=${photo}
	     alt="${title}"
	     class="modal__img">
	`;

    itemModalInfoElements.sizesElem.innerHTML = '';

    for (const size in sizes) {
        const sizeData = sizes[size];
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('btn-tab');
        sizeBtn.dataset.price = sizeData[`add-price`];
        sizeBtn.dataset.category = 'size';
        sizeBtn.innerHTML = `
            <span class="btn-tab__icon">${size.toUpperCase()}</span>
            <span class="btn-tab__title">${sizeData.size}</span>
        `;
        itemModalInfoElements.sizesElem.appendChild(sizeBtn);
    }

    itemModalInfoElements.additivesElem.innerHTML = '';

    additives.forEach((additive, index) => {
        const additiveBtn = document.createElement('button');

        additiveBtn.classList.add('btn-tab');
        additiveBtn.dataset.price = additive[`add-price`];
        additiveBtn.dataset.category = 'additive';
        additiveBtn.innerHTML = `
            <span class="btn-tab__icon">${index + 1}</span>
            <span class="btn-tab__title">${additive.name}</span>
        `;
        itemModalInfoElements.additivesElem.appendChild(additiveBtn);
    });

    itemPrice = Number(price);
    finalPrice = Number(price);
};

const chooseItemSize = () => {
    const sizesElems = document.querySelectorAll('[data-category="size"]');
    const priceElem = document.querySelector('.modal__price');

    sizesElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            const activeTab = document.querySelector('.btn-tab--active');
            const addPrice = Number(elem.dataset.price);

            activeTab.classList.remove('btn-tab--active');
            elem.classList.add('btn-tab--active');
            priceElem.textContent = `$${(itemPrice + addPrice).toFixed(2)}`;
            finalPrice = itemPrice + addPrice;
        });
    });
};

const chooseItemAdditive = () => {
    const additiveElems = document.querySelectorAll(
        '[data-category="additive"]',
    );
    const priceElem = document.querySelector('.modal__price');

    additiveElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            elem.classList.toggle('btn-tab--active-event');
            const additivePrice = Number(elem.dataset.price);

            if (elem.classList.contains('btn-tab--active-event')) {
                finalPrice += additivePrice;
                itemPrice += additivePrice;
            } else {
                finalPrice -= additivePrice;
                itemPrice -= additivePrice;
            }

            priceElem.textContent = `$${finalPrice.toFixed(2)}`;
        });
    });
};

const showModal = (id) => {
    const currentItem = itemsData.filter((item) => item.id === id)[0];

    renderItemInfo(currentItem);
    modal.classList.remove('hidden');
    // document.body.style.overflow = 'hidden';
    itemModalInfoElements.sizesElem.children[0].classList.add(
        'btn-tab--active',
    );

    chooseItemSize();
    chooseItemAdditive();
};

const closeModal = () => {
    modal.classList.add('hidden');
    // document.body.style.overflow = '';
};

const handleItemsClick = (event) => {
    if (event.target.closest('.item')) {
        const itemId = event.target.closest('.item').dataset.id;
        showModal(itemId);
    }
};

const handleModalClick = (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};

modal.addEventListener('click', handleModalClick);
items.addEventListener('click', handleItemsClick);
closeBtn.addEventListener('click', closeModal);

// itemModalInfoElements.sizesElem.forEach((elem) => {
//     elem.addEventListener('click', (event) => {
//         console.log(event.target);
//     });
// });
