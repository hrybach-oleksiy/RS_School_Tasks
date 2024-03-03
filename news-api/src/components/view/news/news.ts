import './news.css';
import { NewsItem } from '../../../types/interfaces';
import { assertIsDefined } from '../../../utils/assertIsDefined';
import imagePlaceholder from '../../../assets/news-placeholder.jpg';

class News {
    public draw(data: readonly NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsBlock = document.querySelector<HTMLElement>('.news');
        const newsTitle = document.querySelector<HTMLElement>('.news-title');

        assertIsDefined(newsItemTemp);
        assertIsDefined(newsBlock);
        assertIsDefined(newsTitle);

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

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || imagePlaceholder})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsTitle.textContent = item.title;
            newsSource.textContent = item.source.name;
            newsContent.textContent = item.description;
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
