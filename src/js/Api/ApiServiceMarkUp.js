import axios from 'axios';
import API_KEY from '../api-key';
import template from '../../templates/movie-card-template';

export default class FetchMovieData {
  constructor() {
    this._key = API_KEY;
    this._page = 1;
    this._genres = this.fetchGenreCodes();
    this._data = this.fetchTrendingMovies();
    this._raitingStatus = false;
  }

  async fetchTrendingMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${this._key}&page=${this._page}`,
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

  get raiting() {
    return this._raitingStatus;
  }

  set raiting(newRaitingStatus) {
    this._raitingStatus = newRaitingStatus;
  }

  async getMarkUp() {
    const apiData = await this.getMarkUpData();
    const markUp = await template(apiData);
    //document.querySelector('.main__section-list').insertAdjacentHTML('beforeend', markUp);
    document.querySelector('.main__section-list').innerHTML = markUp;
    this.addEventListeners();
  }

  async getMarkUpData() {
    try {
     
      const asyncMoviesData = await this.data;
      const asyncGenresList = await this.genres;

      return asyncMoviesData.results.map(data => {
        return {
          ...data,
          genre: this.getCorrectGenreArray(data.genre_ids, asyncGenresList),
          year: this.getCorrectYear(data.release_date),
          raiting: this.raiting,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  getCorrectGenreArray(genreTrendingMovieList, genreExplainedList) {
    const correctGenreArr = genreTrendingMovieList.map(el => {
      genreExplainedList.forEach(entry => {
        if (entry.id === el) {
          el = ' ' + entry.name;
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

  getCorrectYear(year) {
    if (year === undefined) return '';
    return year.split('-').slice(0, 1);
  }

  addEventListeners() {
    document.querySelectorAll('[href="#home"]').forEach(e =>
      e.addEventListener('click', () => {
        this.raiting = false;
        this.getMarkUp();
      }),
    );

    document.querySelector('[href="#library"]').addEventListener('click', () => {
      this.raiting = true;
      document.querySelector('.main__section-list').innerHTML = '';
    });
  }
}
