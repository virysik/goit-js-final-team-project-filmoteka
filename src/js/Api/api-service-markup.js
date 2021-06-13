import axios from 'axios';
import API_KEY from './api-key';
import { BASE_URL } from '../constants';
import refs from '../refs/';
import template from '../../templates/movie-card-template';

export default class FetchMovieData {
  constructor() {
    this._key = API_KEY;
    this._page = 1;
    this._genres = this.fetchGenreCodes();
    this._data = this.fetchTrendingMovies();
    this._raitingStatus = false;
    this._searchQuery = '';
  }

  async fetchTrendingMovies() {
    try {
      let url = '';
      const searchInputUrl = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this._searchQuery}&page=${this._page}&include_adult=false`;
      const mainSearchUrl = `${BASE_URL}trending/movie/day?api_key=${this._key}&page=${this._page}`;

      url = this._searchQuery ? searchInputUrl : mainSearchUrl;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOneMovie(id) {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${id}?api_key=${this._key}&language=en-US`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchGenreCodes() {
    try {
      const response = await axios.get(
        `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`,
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
    refs.movieList.innerHTML = markUp;
    this.addEventListeners();
  }

  async getMarkUpData() {
    try {
      const asyncMoviesData = await this.fetchTrendingMovies();
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
    document.querySelector('.header-container-js').addEventListener('click', e => {
      const target = e.target;
      console.log(target.classList);
      if (target.classList.contains('home-page-js')) {
        this.raiting = false;
        this.getMarkUp();
      }

      if (target.classList.contains('library-page-js')) {
        this.raiting = true;
        document.querySelector('.main__section-list').innerHTML = '';
      }
    });

    refs.serchForm.addEventListener('submit', async e => {
      e.preventDefault();
      let newQuery = e.currentTarget.elements.query.value;
      this._searchQuery = newQuery;
      this.clearGalleryContainer();
      const apiData = await this.getMarkUpData();
      const markUp = await template(apiData);
      refs.movieList.innerHTML = markUp;
      this._searchQuery = '';
      refs.searchFormInput.value = '';
    });
  }

  clearGalleryContainer() {
    refs.movieList.innerHTML = '';
  }

  incrementPage() {
    this._page += 1;
  }
  resetPage() {
    this._page = 1;
  }
}