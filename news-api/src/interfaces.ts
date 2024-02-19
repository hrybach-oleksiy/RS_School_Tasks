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

export interface SourceItem {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}

export interface SourceData {
    status: string;
    sources: SourceItem[];
}
