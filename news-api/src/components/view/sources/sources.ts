import './sources.css';
import { SourceItem } from '../../../interfaces';
import { assertIsDefined } from '../../../utils';

class Sources {
    readonly sourceCategories: SourceItem['category'][] = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
    ];

    constructor() {
        this.createSourceSelect();
    }

    public draw(data: readonly SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.source-select');
        const newsTitle = document.querySelector<HTMLElement>('.news-title');

        assertIsDefined(sourceItemTemp);
        assertIsDefined(sourceBlock);
        assertIsDefined(sourceSelectBlock);
        assertIsDefined(newsTitle);

        sourceBlock.innerHTML = '';
        newsTitle.classList.add('hidden');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            assertIsDefined(sourceName);
            assertIsDefined(sourceItem);

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

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

        if (window.innerWidth >= 886 || data.length < 74) {
            showMoreBtn.classList.add('hidden');
            sourceBlock.classList.add('show-more');
        } else {
            showMoreBtn.classList.remove('hidden');
            sourceBlock.classList.remove('show-more');
        }

        window.addEventListener('resize', () => {
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
