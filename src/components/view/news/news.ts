import './news.css';

interface INews {
  articles: IArticles[],
  status: string,
  totalResults: number,
}

interface IArticles {
  source: {
    id: string | null,
    name: string,
    }
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

class News {
  draw(data: IArticles[]) {
    const news: IArticles[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
    const fragment: DocumentFragment = document.createDocumentFragment() as DocumentFragment;
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    if(newsItemTemp) {
    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as Element;
      
        if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
  
        (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
          item.urlToImage || 'img/news_placeholder.jpg'
        })`;
        (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
        (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
          .slice(0, 10)
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

export { INews, News };
