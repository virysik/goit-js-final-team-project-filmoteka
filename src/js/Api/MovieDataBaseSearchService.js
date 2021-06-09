// Класс поиска по запросу
 import axios from 'axios'
class MovieDataBaseSearchService {
  constructor() {
    this.searchQuery = '';
    this.page = 1
    }
  async fetchMoviesByName() {
    
    const APIKEY = 'fce924273e7307535891dd09fc2f7662'
 
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`

    const response = await axios(url);
    
    //   ----Если надо определенное кол-во показываемых результатов-----
    //   if (data.results.length > 5) {
    //       console.log('слишком много результатов');
    //     return ''
    // }
    // Переходит на след страницу поиска
    this.page += 1;
    return response.results;
    }
  get query() {
  return this.searchQuery
  }
  set query(newQuery) {
    this.searchQuery=newQuery
  }
   resetPage() {
    this.page = 1
  }

}

export default MovieDataBaseSearchService


