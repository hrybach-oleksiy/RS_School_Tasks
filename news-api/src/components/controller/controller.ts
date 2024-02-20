import AppLoader from './appLoader';
import { Endpoints } from '../../enums';
import { NewsData, SourceData } from '../../interfaces';

class AppController extends AppLoader {
    getSources(callback: (data: SourceData) => void) {
        super.getResponse<SourceData>({ endpoint: Endpoints.SOURCES }, callback);
    }

    getNews(event: Event, callback: (data: NewsData) => void) {
        let target = event.target as HTMLElement;
        const newsContainer = event.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResponse({ endpoint: Endpoints.EVERYTHING, options: { sources: sourceId } }, callback);
                    }
                }

                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
