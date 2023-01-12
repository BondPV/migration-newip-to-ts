import './news.css';
import { IArticles } from '../../types/interfaces';
import { newsCount } from '../../constants/Constants';

class News {
  public draw(data: IArticles[]) {
    const news: IArticles[] = data.length >= newsCount ? data.filter((_item, idx) => idx < newsCount) : data;

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    if (newsItemTemp) {
      news.forEach((item, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as Element;
        if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

        (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
          item.urlToImage || './placeholder-news.jpg'
        })`;
        (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
        (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
          .slice(0, newsCount)
          .split('-')
          .reverse()
          .join('-');

        (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
        (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
        (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
        (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

        fragment.append(newsClone);
      });
    }

    (document.querySelector('.news') as HTMLInputElement).innerHTML = '';
    (document.querySelector('.news') as HTMLInputElement).appendChild(fragment);
  }
}

export default News;
