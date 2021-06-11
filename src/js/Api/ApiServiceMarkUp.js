import axios from 'axios';
import API_KEY from '../api-key';
import template from '../../templates/movie-card-template';

export default class FetchMovieData {
  constructor() {
    this._key = API_KEY;
    this._genres = this.fetchGenreCodes();
    this._data = this.fetchTrendingMovies();
  }

  async fetchTrendingMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${this._key}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOneMovie(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this._key}&language=en-US`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchGenreCodes() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
      );
      return response.data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  get genres() {
    return this._genres;
  }

  get data() {
    return this._data;
  }

  async getMarkUp() {
    const apiData = await this.getMarkUpData();
    const markUp = await template(apiData);
    document.querySelector('.main__section-list').insertAdjacentHTML('beforeend', markUp);
  }

  async getMarkUpData() {
    try {
      const asyncMoviesData = await this.data;
      const asyncGenresList = await this.genres;

      return asyncMoviesData.results.map(data => {
        return {
          ...data,
          genre: this.getCorrectGenreArray(data.genre_ids, asyncGenresList),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  getCorrectGenreArray(genreTrendingMovieList, genreExplainedList) {
    const correctGenreArr = genreTrendingMovieList.map((el, i, arr) => {
      genreExplainedList.forEach(entry => {
        if (entry.id === el) {
          el = entry.name + ' ';
        }
      });
      return el;
    });

    if (correctGenreArr.length >= 3) {
      correctGenreArr.splice(2, 1, ' Other');
      let copyOfCorrectGenreArr = correctGenreArr.slice(0, 3);
      return copyOfCorrectGenreArr;
    }

    return correctGenreArr;
  }
}
