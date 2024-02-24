import './sources.css';
import { SourceItem } from '../../../interfaces';
import { assertIsDefined } from '../../../utils';

class Sources {
    sourceCategory: SourceItem['category'] = 'general';
    sourcesLength: number = 100;

    constructor() {
        this.showMore();
    }

    draw(data: readonly SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.source-select');

        const filteredSources = data
            .filter((item) => item.category === this.sourceCategory)
            .slice(0, this.sourcesLength);
        this.sourcesLength = filteredSources.length;

        // if (window.innerWidth <= 640 && !isLoadingMore && itemsNumber > 4) {
        //   filteredSources = filteredSources.slice(0, 4);
        //     showLoadMoreBtn();
        // }

        //       <select name="select">
        //   <!--Supplement an id here instead of using 'name'-->
        //   <option value="value1">Значение 1</option>
        //   <option value="value2" selected>Значение 2</option>
        //   <option value="value3">Значение 3</option>
        // </select>

        assertIsDefined(sourceItemTemp);
        assertIsDefined(sourceBlock);
        assertIsDefined(sourceSelectBlock);

        filteredSources.forEach((item) => {
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

    showMore() {
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
    }
}

export default Sources;
