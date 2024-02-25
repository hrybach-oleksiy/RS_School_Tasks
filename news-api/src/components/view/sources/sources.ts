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
        this.showMore();
        this.createSourceSelect();
    }

    draw(data: readonly SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.source-select');

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

    private showMore() {
        const showMoreBtn = document.querySelector<HTMLElement>('.show-more-btn');

        assertIsDefined(showMoreBtn);

        showMoreBtn.addEventListener('click', () => {
            const sourceBlock = document.querySelector<HTMLElement>('.sources');
            assertIsDefined(sourceBlock);

            sourceBlock.classList.toggle('show-more');

            if (sourceBlock.classList.contains('show-more')) {
                showMoreBtn.textContent = 'Show less News Sources';
            } else {
                showMoreBtn.textContent = 'Show more News Sources';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 640) {
                console.log('less than 640px');
                showMoreBtn.classList.remove('hidden');
            }

            if (window.innerWidth > 640) {
                console.log('more than 640px');
                showMoreBtn.classList.add('hidden');
            }
        });
    }
}

export default Sources;
