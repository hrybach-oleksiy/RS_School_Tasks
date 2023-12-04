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

const renderItemInfo = (item) => {
    console.log(item);
    const title = item.name;
    const descr = item.description;
    const sizes = item.sizes;
    const additives = item.additives;
    const price = item.price;
    const photo = item.src;
    console.log(sizes);

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
        console.log(size);
        const sizeData = sizes[size];
        console.log(sizeData);
        const sizeBtn = document.createElement('button');
        sizeBtn.classList.add('btn-tab');
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
        additiveBtn.innerHTML = `
            <span class="btn-tab__icon">${index + 1}</span>
            <span class="btn-tab__title">${additive.name}</span>
        `;
        itemModalInfoElements.additivesElem.appendChild(additiveBtn);
    });
};

const showModal = (id) => {
    const currentItem = itemsData.filter((item) => item.id === id)[0];

    renderItemInfo(currentItem);
    modal.classList.remove('hidden');
    // document.body.style.overflow = 'hidden';
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
