import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'ed64a9764473407bb880d8478618ffdb', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
