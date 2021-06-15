import axios from 'axios';
import API_KEY from './api-key';
import { BASE_URL } from '../constants';
import refs from '../refs/index';
import template from '../../templates/movie-card-template';
import oneMovieTemp from '../../templates/one-movie-modal';
import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import showSpinner from '../spinner';
import hideSpinner from '../spinner';

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
     refs.spinner.classList.remove('spinner-is-hidden');
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
    finally {
       refs.spinner.classList.add('spinner-is-hidden');    
       };
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

  renderOneMovie() {
    document.querySelector('.main__section-list').addEventListener('click', async e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }
      const filmId = e.target.id;
      const markUp = await this.getMarkUpForOneMovie(filmId);

      const modal = basicLightbox.create(oneMovieTemp(markUp), {
        onShow: () => {
          window.addEventListener('click', onBtnClose);
          window.addEventListener('keydown', onKeyPressEsc);
        },
        onClose: () => {
          window.removeEventListener('click', onBtnClose);
          window.removeEventListener('keydown', onKeyPressEsc);
        },
      });
      modal.show();

      function onKeyPressEsc(e) {
        if (e.code === 'Escape') {
          modal.close();
        }
      }

      function onBtnClose(e) {
        if (e.target.classList.contains('close-icon-container')) {
          modal.close();
        }
      }
    });
  }

  async getMarkUpForOneMovie(id) {
    try {
      const asyncOneMovie = await this.fetchOneMovie(id);

      // asyncOneMovie.popularity = Math.round(parseFloat(asyncOneMovie.popularity) * 100) / 100;
      asyncOneMovie.popularity = asyncOneMovie.popularity.toFixed(1);
      const genresArr = asyncOneMovie.genres.map(e => {
        return ' ' + e.name;
      });
      asyncOneMovie.genres = genresArr.join(',');

      return asyncOneMovie;
    } catch (error) {
      console.log(error);
    }
  }
}
