import AppController from '../controller/controller';
import { AppView } from '../view/appView.ts';

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document.querySelector('.sources').addEventListener('click', (event) => {
            this.controller.getNews(event, (data) => this.view.drawNews(data));
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
