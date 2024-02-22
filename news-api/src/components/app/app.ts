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

        if (sourcesBlock) {
            sourcesBlock.addEventListener('click', (event) => {
                this.controller.getNews(event, (data) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
