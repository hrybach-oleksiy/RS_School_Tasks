import './news.css';
import { NewsItem } from '../../../interfaces';
import { assertIsDefined } from '../../../utils';

class News {
    draw(data: readonly NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsBlock = document.querySelector<HTMLElement>('.news');

        assertIsDefined(newsItemTemp);
        assertIsDefined(newsBlock);

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const newsAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const newsDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const newsTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            const newsSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            const newsContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            const newsLink = newsClone.querySelector<HTMLElement>('.news__read-more a');

            assertIsDefined(newsItem);
            assertIsDefined(newsPhoto);
            assertIsDefined(newsAuthor);
            assertIsDefined(newsDate);
            assertIsDefined(newsTitle);
            assertIsDefined(newsSource);
            assertIsDefined(newsContent);
            assertIsDefined(newsLink);

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsTitle.textContent = item.title;
            newsSource.textContent = item.source.name;
            newsContent.textContent = item.description;
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);

            // if (newsClone) {
            //     const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            //     const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            //     const newsAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            //     const newsDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            //     const newsTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            //     const newsSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            //     const newsContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            //     const newsLink = newsClone.querySelector<HTMLElement>('.news__read-more a');

            //     if (idx % 2 && newsItem) {
            //         newsItem.classList.add('alt');
            //     }

            //     if (newsPhoto) {
            //         newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            //     }

            //     if (newsAuthor) {
            //         newsAuthor.textContent = item.author || item.source.name;
            //     }

            //     if (newsDate) {
            //         newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            //     }

            //     if (newsTitle) {
            //         newsTitle.textContent = item.title;
            //     }

            //     if (newsSource) {
            //         newsSource.textContent = item.source.name;
            //     }

            //     if (newsContent) {
            //         newsContent.textContent = item.description;
            //     }

            //     if (newsLink) {
            //         newsLink.setAttribute('href', item.url);
            //     }

            //     fragment.append(newsClone);
            // }
        });

        // if (newsBlock) {
        //     newsBlock.innerHTML = '';
        //     newsBlock.appendChild(fragment);
        // }

        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
