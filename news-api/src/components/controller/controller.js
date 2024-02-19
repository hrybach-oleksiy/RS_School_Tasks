import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback) {
        super.getResponse({ endpoint: 'sources' }, callback);
    }

    getNews(event, callback) {
        let target = event.target;
        const newsContainer = event.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResponse({ endpoint: 'everything', options: { sources: sourceId } }, callback);
                }

                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
