import './sources.css';
import { NewsSourceItem } from '../../../types';

class Sources {
    draw(data: NewsSourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourceBlock = document.querySelector<HTMLElement>('.sources');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (sourceName) {
                sourceName.textContent = item.name;
            }

            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        if (sourceBlock) {
            sourceBlock.append(fragment);
        }
    }
}

export default Sources;
