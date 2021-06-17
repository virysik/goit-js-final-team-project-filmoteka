import axios from 'axios';
import API_KEY from './api-key';
import { BASE_URL } from '../constants';
import refs from '../refs/index';
import template from '../../templates/movie-card-template';
import oneMovieTemp from '../../templates/one-movie-modal';
import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import { showSpinner } from '../spinner';
import { hideSpinner } from '../spinner';

import firebase from 'firebase/app';

import errorNotification from '../pnotify';

export default class FetchMovieData {
  constructor() {
    this._key = API_KEY;
    this._page = 1;
    this._totalPage = '';
    this._genres = this.fetchGenreCodes();
    this._data = this.fetchTrendingMovies();
    this._raitingStatus = false;
    this._searchQuery = '';
  }

  async fetchTrendingMovies() {
    try {
      let url = '';
      const searchInputUrl = `${BASE_URL}search/movie?api_key=${this._key}&language=en-US&query=${this._searchQuery}&page=${this._page}&include_adult=false`;
      const mainSearchUrl = `${BASE_URL}trending/movie/day?api_key=${this._key}&page=${this._page}`;

      url = this._searchQuery ? searchInputUrl : mainSearchUrl;

      const response = await axios.get(url);
      this._totalPage = response.data.total_pages;
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
        `${BASE_URL}genre/movie/list?api_key=${this._key}&language=en-US`,
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

  async getMarkUp(activePage = 1) {
    const apiData = await this.getMarkUpData();
    const markUp = await template(apiData);
    refs.movieList.innerHTML = markUp;
    this.pagination(this._totalPage, activePage);
    this.addEventListeners();
  }

  async getMarkUpData() {
    showSpinner();
    try {
      const asyncMoviesData = await this.fetchTrendingMovies();

      if (asyncMoviesData.results.length === 0) {
        // refs.errorMessage.style.display = 'block'
        errorNotification();
      }

      const asyncGenresList = await this.genres;

      return asyncMoviesData.results.map(data => {
        //console.log(asyncMoviesData.results.map(data => data.original_title));
        return {
          ...data,
          genre: this.getCorrectGenreArray(data.genre_ids, asyncGenresList),
          year: this.getCorrectYear(data.release_date),
          raiting: this.raiting,
          poster_img: this.getCorrectImg(data.poster_path),
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      hideSpinner();
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

  getCorrectImg(imgs) {
    if (imgs === null) {
      return (imgs = `https://t4.ftcdn.net/jpg/03/76/40/81/360_F_376408140_kiazgwOvkEy0e50oxgF5kllIl7j2q1SQ.jpg`);
    }

    imgs = `https://image.tmdb.org/t/p/w500${imgs}`;
    return imgs;
  }

  addEventListeners() {
    document.querySelector('.header-container-js').addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('home-page-js')) {
        this.raiting = false;
        document.querySelector('.main__library-info').classList.add('is-hidden');

        this.resetPage();
        this.resetSearchQuery();
        refs.searchFormInput.value = '';
        this.getMarkUp();
        //this.paginationListner();

        //this.getMarkUp();

      }

      if (target.classList.contains('library-page-js')) {
        this.raiting = true;

        document.querySelector('.main__section-list').innerHTML = '';

        this.resetPage();
        this.getMarkUp();
        // clearGalleryContainer();
      }
    });

    refs.serchForm.addEventListener('submit', async e => {
      e.preventDefault();
      refs.errorMessage.style.display = 'none';
      let newQuery = e.currentTarget.elements.query.value;
      this.searchQuery(newQuery);
      this.resetPage();
      this.getMarkUp();
      /*this._searchQuery = newQuery;
      this.clearGalleryContainer();
      const apiData = await this.getMarkUpData();
      const markUp = await template(apiData);*/
      //       refs.movieList.innerHTML = markUp;
      //this._searchQuery = '';
      //refs.searchFormInput.value = '';
    });
  }

  clearGalleryContainer() {
    refs.movieList.innerHTML = '';
  }

  incrementPage() {
    return (this._page += 1);
  }

  decrementPage() {
    return (this._page -= 1);
  }

  resetPage() {
    this._page = 1;
  }

  searchQuery(newQuery) {
    this._searchQuery = newQuery;
  }

  resetSearchQuery() {
    this._searchQuery = '';
  }

  renderOneMovie() {
    refs.movieList.addEventListener('click', async e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }
      const filmId = e.target.id;
      const markUp = await this.getMarkUpForOneMovie(filmId);

      const modal = basicLightbox.create(oneMovieTemp(markUp), {
        onShow: () => {
          document.body.classList.add('body-lightbox');
          window.addEventListener('click', onBtnClose);
          window.addEventListener('keydown', onKeyPressEsc);
        },
        onClose: () => {
          document.body.classList.remove('body-lightbox');
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

      asyncOneMovie.popularity = asyncOneMovie.popularity.toFixed(1);
      const genresArr = asyncOneMovie.genres.map(e => {
        return ' ' + e.name;
      });
      asyncOneMovie.genres = genresArr.join(',');
      asyncOneMovie.poster_img = this.getCorrectImg(asyncOneMovie.poster_path);

      return asyncOneMovie;
    } catch (error) {
      console.log(error);
    }
  }


  // async markUpAllMain(activePage = 1) {
  //   //рендерит разметку контейнера с фильмами и пагинацию
  //   try {
  //     //await this.getMarkUp();
  //     //this.pagination(this._totalPage, activePage);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  ///----
  showNumberCurrentPage(activePage = 1) {
    this._page = activePage;
    this.getMarkUp();
  }
  ///---

  renderMarkupPage(totalPage, activePage, listPagesEl) {
    listPagesEl.innerHTML = this.createMarkup(totalPage, activePage);
  }

  createMarkup(totalPage, page) {
    let markup = '';
    let beforePages = page - 2;
    let afterPages = page + 2;
    const arrowRight = '&#129130';
    const arrowLeft = '&#129128';

    if (page > 1) {
      markup += `<li class="pagination__item first">
            <a class="pagination__link" id="left">-${arrowLeft}
            <!--<svg class="number-pages__svg" width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-left"></use>
              </svg>-->
            </a>
          </li>`;
    }

    if ((page > 3) & (totalPage > 5)) {
      markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link">1</a>
            </li>`;
      if ((page > 4) & (totalPage > 6)) {
        markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link dots-hover">...</a>
            </li>`;
      }
    }

    if (page === totalPage) {
      beforePages = beforePages - 2;
      afterPages = afterPages - 2;
    } else if (page === totalPage - 1) {
      beforePages = beforePages - 1;
      afterPages = afterPages - 1;
    }

    if (page === 1) {
      afterPages = afterPages + 2;
      beforePages = beforePages + 2;
    } else if (page === 2) {
      afterPages = afterPages + 1;
      beforePages = beforePages + 1;
    }

    for (let pageGroup = beforePages; pageGroup <= afterPages; pageGroup++) {
      let active = '';
      if (pageGroup > totalPage || pageGroup <= 0) {
        continue;
      }
      if (pageGroup === page) {
        active = 'active';
      }
      markup += `<li class="pagination__item">
                <a href="" class="pagination__link ${active}">${pageGroup}</a>
            </li>`;
    }

    if ((page < totalPage - 2) & (totalPage > 5)) {
      if ((page < totalPage - 3) & (totalPage > 6)) {
        markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link dots-hover">...</a>
            </li>`;
      }
      markup += `<li class="pagination__item mobile">
                <a href="" class="pagination__link">${totalPage}</a>
            </li>`;
    }

    if (page < totalPage) {
      markup += `<li class="pagination__item last">
            <a class="pagination__link" id="right">+${arrowRight}
            <!--<svg class="number-pages__svg" width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-right"></use>
              </svg>-->
              </a>
          </li>`;
    }

    return markup;
  }

  pagination(totalPage, activePage = 1, listPagesEl = refs.listPagesEl) {
    if (totalPage <= 1) {
      listPagesEl.innerHTML = '';
      return;
    }
    console.log(totalPage, 'from api-service');
    this.renderMarkupPage(totalPage, activePage, listPagesEl);
    //listPagesEl.addEventListener('click', (e) => this.onClick(e));
  }

  paginationListner() {
    refs.listPagesEl.addEventListener('click', e => this.onClick(e));
  }

  async onClick(e) {
    e.preventDefault();

    if (e.target.tagName === 'UL') return;

    if (e.target.textContent === '...') return;

    if (e.target.id === 'left') {
      let activePage = this.decrementPage();
      this.getMarkUp(activePage);
      return;
    }

    if (e.target.id === 'right') {
      let activePage = this.incrementPage();
      this.getMarkUp(activePage);
      return;
    }

    let activePage = +e.target.textContent;
    this._page = activePage;
    this.getMarkUp(activePage);

  }
}
