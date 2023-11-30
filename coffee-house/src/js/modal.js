import itemsData from '../api/items.json';

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__btn-close');
const items = document.querySelector('.items');
const modalTitle = document.querySelector('.modal__title');

const itemModalInfoElements = {
    titleElem: document.querySelector('.modal__title'),
    descrElem: document.querySelector('.modal__descr'),
    sizesElem: document.querySelector('.item-choice__btns--sizes'),
    additivesElem: document.querySelector('.item-choice__btns--additives'),
    priceElem: document.querySelector('.modal__price'),
};

console.log(itemModalInfoElements.titleElem.textContent);

const renderItemInfo = (item) => {
    const title = item.title;
    const descr = item.descr;
    // const sizes = item.sizes;
    // const additives = item.additives;
    const price = item.price;

    modalTitle.textContent = title;
    itemModalInfoElements.descrElem.textContent = descr;
    itemModalInfoElements.descrElem.textContent = `$${price}`;

    itemModalInfoElements.sizesElem.innerHTML = '';

    for (const size in item.sizes) {
        const sizeData = item.sizes[size];
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('btn-tab');
        sizeBtn.innerHTML = `
            <span class="btn-tab__icon">${size.toUpperCase()}</span>
            <span class="btn-tab__title">${sizeData.size}</span>
        `;
        itemModalInfoElements.sizesElem.appendChild(sizeBtn);
    }

    itemModalInfoElements.additivesElem.innerHTML = '';

    item.additives.forEach((additive) => {
        const additiveBtn = document.createElement('button');
        additiveBtn.classList.add('btn-tab');
        additiveBtn.innerHTML = `
            <span class="btn-tab__icon">${additive.name}</span>
            <span class="btn-tab__title">${additive.name}</span>
        `;
        itemModalInfoElements.additivesElem.appendChild(additiveBtn);
    });
};

const showModal = (id) => {
    const currentItem = itemsData.filter((item) => item.id === id)[0];

    renderItemInfo(currentItem);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
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
