import AppLoader from './appLoader';
import { Endpoint } from '../../enums';
import { NewsData, SourceData } from '../../interfaces';

class AppController extends AppLoader {
    getSources(callback: (data: SourceData) => void, event?: Event) {
        const target = event?.target as HTMLOptionElement;
        const sourceCategory = target ? target.value : 'general';

        super.getResponse<SourceData>({ endpoint: Endpoint.SOURCES, options: { category: sourceCategory } }, callback);
    }

    // getSources(callback: (data: SourceData) => void) {
    //     // const target = event.target as HTMLOptionElement;
    //     // const sourceCategory = target.value;

    //     super.getResponse<SourceData>({ endpoint: Endpoint.SOURCES }, callback);
    // }

    getNews(event: Event, callback: (data: NewsData) => void) {
        let target = event.target as HTMLElement;
        const newsContainer = event.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResponse({ endpoint: Endpoint.EVERYTHING, options: { sources: sourceId } }, callback);
                    }
                }

                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
