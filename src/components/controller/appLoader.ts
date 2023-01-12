import Loader from './loader';
import { dataBase } from '../constants/Constants';

class AppLoader extends Loader {
  constructor() {
    super(dataBase.url, {
      apiKey: dataBase.key,
    });
  }
}

export default AppLoader;
