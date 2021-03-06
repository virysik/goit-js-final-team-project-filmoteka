import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import refs from '../refs/index';
import template from '../../templates/movie-card-template';
import FetchMovieData from './api-service-markup';

export default class DataBaseFirebase extends FetchMovieData {
  constructor() {
    super();

    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this._activePage = 1;
  }

  async getActualWatchedList(user) {
    const databaseUser = this.db.collection('users').doc(user.uid).get();
    let list = (await databaseUser).data().watched;
    return list.map(obj => {
      return {
        ...obj,
        popularity: obj.popularity.toFixed(1),
        poster_img: super.getCorrectImg(obj.poster_path),
        title: obj.original_title,
        genre: this.getCorrectGenreArray(obj.genres),
        year: super.getCorrectYear(obj.release_date),
        raiting: true,
      };
    });
  }

  async getWatchedList(user) {
    const databaseUser = this.db.collection('users').doc(user.uid).get();
    let list = (await databaseUser).data().watched;
    let watchedList = list.map(e => e.id);
    return watchedList;
  }

  getCorrectGenreArray(genreOneMovieList) {
    const correctGenreArr = genreOneMovieList.map(el => ' ' + el.name);

    if (correctGenreArr.length >= 3) {
      correctGenreArr.splice(2, 1, ' Other');
      let copyOfCorrectGenreArr = correctGenreArr.slice(0, 3);
      return copyOfCorrectGenreArr;
    }

    return correctGenreArr;
  }

  async getMarkUpWatched(user) {
    refs.libraryInfo.classList.add('is-hidden');
    const apiData = await this.getActualWatchedList(user);
    const markUp = await template(apiData);
    const totalPages = Math.ceil(apiData.length / 9);
    refs.libraryContainer.innerHTML = markUp;
    super.pagination(totalPages, this._activePage);

    if (markUp === '') {
      refs.libraryInfo.classList.remove('is-hidden');
    }
  }

  async getActualQueueList(user) {
    const databaseUser = this.db.collection('users').doc(user.uid).get();
    let list = (await databaseUser).data().queue;
    return list.map(obj => {
      return {
        ...obj,
        popularity: obj.popularity.toFixed(1),
        poster_img: super.getCorrectImg(obj.poster_path),
        title: obj.original_title,
        genre: this.getCorrectGenreArray(obj.genres),
        year: super.getCorrectYear(obj.release_date),
        raiting: true,
      };
    });
  }

  async getMarkUpQueue(user) {
    refs.libraryInfo.classList.add('is-hidden');
    const apiData = await this.getActualQueueList(user);
    const markUp = await template(apiData);
    refs.libraryContainer.innerHTML = markUp;
    const totalPages = Math.ceil(apiData.length / 9);
    super.pagination(totalPages, this._activePage);
    if (markUp === '') {
      refs.libraryInfo.classList.remove('is-hidden');
    }
  }

  async pushToWatchedArrFirebase(user, id) {
    const databaseUser = this.db.collection('users').doc(user.uid).get();
    let newList = (await databaseUser).data().watched;

    let fetch = await super.fetchOneMovie(id);

    if (newList.find(e => e.id === id)) {
      newList = newList.filter(e => e.id !== id);
      return newList;
    } else {
      newList.push(fetch);

      return newList;
    }
  }

  async pushToQueueArrFirebase(user, id) {
    const databaseUser = this.db.collection('users').doc(user.uid).get();
    let newList = (await databaseUser).data().queue;

    let fetch = await super.fetchOneMovie(id);

    if (newList.find(e => e.id === id)) {
      newList = newList.filter(e => e.id !== id);
      return newList;
    } else {
      newList.push(fetch);
      return newList;
    }
  }

  async addToQueueUserDataBase(user, id) {
    const data = await this.pushToQueueArrFirebase(user, id);
    this.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          queue: data,
        },
        { merge: true },
      )
      .then(this.getMarkUpQueue(user));
  }
  async addToWatchedUserDataBase(user, id) {
    const data = await this.pushToWatchedArrFirebase(user, id);
    this.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          watched: data,
        },
        { merge: true },
      )
      .then(this.getMarkUpWatched(user));
  }

  async addFilmToFirebase(user) {
    document.body.addEventListener('click', e => {
      if (e.target.className === 'queue-btn') {
        this.addToQueueUserDataBase(user, Number(e.target.dataset.id));

        if (e.target.textContent === 'REMOVE FROM QUEUE') {
          e.target.textContent = 'ADD TO QUEUE';
        } else {
          e.target.textContent = 'REMOVE FROM QUEUE';
        }
      }

      if (e.target.className === 'watched-btn') {
        this.addToWatchedUserDataBase(user, Number(e.target.dataset.id));

        if (e.target.textContent === 'REMOVE FROM WATCHED') {
          e.target.textContent = 'ADD TO WATCHED';
        } else {
          e.target.textContent = 'REMOVE FROM WATCHED';
        }
      }
    });
  }
  async pushWatchedToLibrary(user) {
    refs.libraryPage.addEventListener('click', this.getMarkUpWatched.bind(this, user));
    refs.watchedBtn.addEventListener('click', this.getMarkUpWatched.bind(this, user));
  }
  async pushQueueToLibrary(user) {
    refs.queueBtn.addEventListener('click', this.getMarkUpQueue.bind(this, user));
  }
}
