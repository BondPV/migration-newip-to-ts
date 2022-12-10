import AppLoader from './appLoader';

import { INews } from '../view/news/news';
import { ISourse } from '../view/sources/sources';

type CallBackType<T> = (data?: T) => void;

class AppController extends AppLoader {
  getSources(callback: CallBackType<ISourse>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: Event, callback: CallBackType<INews>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;
    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;;
    }
  }
}

export default AppController;
