import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller;
    private view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesBlock = document.querySelector<HTMLElement>('.sources');
        const sourceSelectBlock = document.querySelector<HTMLElement>('.categories');

        if (sourcesBlock) {
            sourcesBlock.addEventListener('click', (event) => {
                this.controller.getNews(event, (data) => this.view.drawNews(data));
            });
        }

        if (sourceSelectBlock) {
            sourceSelectBlock.addEventListener('change', (event) => {
                this.controller.getSources((data) => this.view.drawSources(data), event);
            });
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
