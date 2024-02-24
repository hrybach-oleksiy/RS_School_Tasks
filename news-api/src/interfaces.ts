import { ResponseStatus } from './enums';

export interface NewsSourceItem {
    id: string;
    name: string;
}
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
    status: ResponseStatus;
    totalResults: number;
    articles: NewsItem[];
}
export interface SourceData {
    status: ResponseStatus;
    sources: SourceItem[];
}

// interface SourceCategory {

// }
// export interface LoaderOptions {
//     [key: string]: string | undefined;
// }
