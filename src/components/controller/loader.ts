import { Endpoint, HttpMetods, HttpStatusCode } from '../types/enum';
import { IOptions } from '../types/interfaces';
import { CallBackType } from '../types/types';

class Loader {
  private baseLink: string;
  private options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T>(
    { endpoint = Endpoint.Not, options = {} },
    callback: CallBackType<T> = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(HttpMetods.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === HttpStatusCode.Unauthorized || res.status === HttpStatusCode.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: IOptions, endpoint: string): string {
    const urlOptions: IOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof IOptions]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(method: HttpMetods, endpoint: Endpoint, callback: CallBackType<T>, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
