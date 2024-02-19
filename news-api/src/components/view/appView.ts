import News from './news/news';
import Sources from './sources/sources';

import { NewsData, SourceData } from '../../interfaces';

export class AppView {
    private news;
    private sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
