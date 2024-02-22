import './sources.css';
import { NewsSourceItem } from '../../../interfaces';
import { assertIsDefined } from '../../../utils';

class Sources {
    draw(data: readonly NewsSourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');

        assertIsDefined(sourceItemTemp);
        assertIsDefined(sourceBlock);

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
}

export default Sources;
