import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertIsDefined } from '../../utils';

class App {
    private controller;
    private view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sourcesBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.categories');
        const newsBlock = document.querySelector<HTMLElement>('.news');
        const newsTitleSource = document.querySelector<HTMLElement>('.news-title-source');
        const newsTitle = document.querySelector<HTMLElement>('.news-title');

        assertIsDefined(newsTitleSource);
        assertIsDefined(sourcesBlock);
        assertIsDefined(sourceSelectBlock);
        assertIsDefined(newsBlock);
        assertIsDefined(newsTitle);

        sourcesBlock.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                newsTitle.classList.remove('hidden');
                newsTitleSource.textContent = event.target.textContent ?? '';
            }
            this.controller.getNews(event, (data) => this.view.drawNews(data));
        });

        sourceSelectBlock.addEventListener('change', (event) => {
            newsBlock.innerHTML = '';

            this.controller.getSources((data) => this.view.drawSources(data), event);
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
