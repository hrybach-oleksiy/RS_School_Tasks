import './sources.css';
import { SourceItem } from '../../../interfaces';
import { assertIsDefined } from '../../../utils';

class Sources {
    sourceCategories: SourceItem['category'][] = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
    ];
    // currentSourceCategory: SourceItem['category'] = 'general';

    constructor() {
        this.createSourceSelect();
    }

    draw(data: readonly SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.source-select');
        console.log(data.length);
        // const sourceCategories = data.map((item) => item.category);
        // const uniqueCategories = new Set(sourceCategories);

        // this.sourceCategories = Array.from(uniqueCategories);

        // const filteredSources = data.filter((item) => item.category === this.currentSourceCategory);

        assertIsDefined(sourceItemTemp);
        assertIsDefined(sourceBlock);
        assertIsDefined(sourceSelectBlock);

        sourceBlock.innerHTML = '';

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            assertIsDefined(sourceName);
            assertIsDefined(sourceItem);

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            // if (sourceName) {
            //     sourceName.textContent = item.name;
            // }

            // if (sourceItem) {
            //     sourceItem.setAttribute('data-source-id', item.id);
            // }

            fragment.append(sourceClone);
        });

        // if (sourceBlock) {
        //     sourceBlock.append(fragment);
        // }
        sourceBlock.append(fragment);
        this.showMore(data);
    }

    private createSourceSelect() {
        const sourceSelect = document.querySelector<HTMLElement>('.categories');
        assertIsDefined(sourceSelect);

        sourceSelect.innerHTML = '';

        this.sourceCategories.forEach((category) => {
            const selectOption = new Option(category, category);

            if (category === 'general') {
                selectOption.selected = true;
            }
            sourceSelect.append(selectOption);
        });

        // this.currentSourceCategory = this.sourceCategories[0];
    }

    private showMore(data: readonly SourceItem[]) {
        const showMoreBtn = document.querySelector<HTMLElement>('.show-more-btn');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');

        assertIsDefined(sourceBlock);
        assertIsDefined(showMoreBtn);

        showMoreBtn.addEventListener('click', () => {
            sourceBlock.classList.toggle('show-more');

            if (sourceBlock.classList.contains('show-more')) {
                showMoreBtn.textContent = 'Show less News Sources';
            } else {
                showMoreBtn.textContent = 'Show more News Sources';
            }
        });

        window.addEventListener('resize', () => {
            console.log(data.length);
            if (window.innerWidth <= 886 && data.length > 74) {
                showMoreBtn.classList.remove('hidden');
                sourceBlock.classList.remove('show-more');
            } else if (window.innerWidth <= 886 && data.length < 74) {
                showMoreBtn.classList.add('hidden');
                sourceBlock.classList.add('show-more');
            }

            if (window.innerWidth > 886) {
                showMoreBtn.classList.add('hidden');
                sourceBlock.classList.add('show-more');
            }
        });
    }
}

export default Sources;
