import { NewsSourceItem } from './types';

export interface NewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSourceItem;
    title: string;
    url: string;
    urlToImage: string;
}
