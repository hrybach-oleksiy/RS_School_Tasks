export {};

declare global {
    namespace NewsApi {
        export enum ResponseStatus1 {
            SUCCESS = 'ok',
            ERROR = 'error',
        }
        export interface NewsSourceItem1 {
            id: string;
            name: string;
        }
        export interface NewsItem1 {
            author: string;
            content: string;
            description: string;
            publishedAt: string;
            source: NewsSourceItem1;
            title: string;
            url: string;
            urlToImage: string;
        }
        export interface SourceItem1 {
            category: string;
            country: string;
            description: string;
            id: string;
            language: string;
            name: string;
            url: string;
        }
        export interface NewsData1 {
            status: ResponseStatus1;
            totalResults: number;
            articles: NewsItem1[];
        }
        export interface SourceData {
            status: ResponseStatus1;
            sources: SourceItem1[];
        }
    }
}
