import axios from 'axios';
import API_KEY from '../api-key';

export default class FetchGenresDecoding {
  constructor() {
    this.key = API_KEY;
  }

  async fetchTrendingMovies() {
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}`,
      );
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOneMovie(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}&language=en-US`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

// Пример
// const movieData = new MoviesDataBaseFetchService(`fce924273e7307535891dd09fc2f7662`)

// movieData.fetchTrendingMovies()
