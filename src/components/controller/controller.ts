import AppLoader from './appLoader';
import { ISourse, INews } from '../../components/types/interfaces';
import { CallBackType } from '../types/types';
import { Endpoint } from '../types/enum';

class AppController extends AppLoader {
  public getSources(callback: CallBackType<ISourse>) {
    this.getResp(
      {
        endpoint: Endpoint.Sources,
      },
      callback
    );
  }

  public getNews(e: Event, callback: CallBackType<INews>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          this.getResp(
            {
              endpoint: Endpoint.Everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
