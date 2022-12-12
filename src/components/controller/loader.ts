interface IOptions {
  [source: string]: string;
}

type CallBackType<T> = (data: T) => void;

type Metod = 'GET' | 'POST';

class Loader {
  private baseLink: string;
  private options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T>(
    { endpoint = '', options = {} },
    callback: CallBackType<T> = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  protected errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  protected makeUrl(options: IOptions, endpoint: string): string {
    const urlOptions: IOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof IOptions]}&`;
    });

    return url.slice(0, -1);
  }

  protected load<T>(method: Metod, endpoint: string, callback: CallBackType<T>, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
