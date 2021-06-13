// Класс поиска по запросу
import axios from 'axios';
import API_KEY from './api-key';
import BASE_URL from '../constants';


class MovieDataBaseSearchService {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
  }
  async fetchMoviesByName() {
    try {
      const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this._searchQuery}&page=${this._page}&include_adult=false`;

      const response = await axios.get(url);

      //   ----Если надо определенное кол-во показываемых результатов-----
      //   if (data.results.length > 5) {
      //       console.log('слишком много результатов');
      //     return ''
      // }
      // Переходит на след страницу поиска
      this._page += 1;

      return response.data.results;

    } catch (error) {
      console.log(error);
    }
  }
  get query() {
    return this._searchQuery;
  }
  set query(newQuery) {
    this._searchQuery = newQuery;
  }
  resetPage() {
    this._page = 1;
  }
}

export default MovieDataBaseSearchService;
