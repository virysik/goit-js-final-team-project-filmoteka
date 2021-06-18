import ApiServiceMarkup from './js/api/api-service-markup';

import './sass/main.scss';
import './js/scroll-to-top';
import './js/api/auth';
import './js/toggle-headers';
import './js/theme-switch';
import './js/library-btns';
import firebase from 'firebase/app';

import './js/spinner';

import './js/team.js';
import Auth from './js/api/auth';
import DataBaseFirebase from './js/api/firebase-database';
import './js/api/firebase-database';
import refs from './js/refs';
//import * as modulPagination from './js/pagination';

const apiData = new ApiServiceMarkup();
// apiData.getMarkUp();

const auth = new Auth();
auth.init();
//

const db = new DataBaseFirebase();
db.auth.onAuthStateChanged(user => {
  if (user) {
    db.addFilmToFirebase(user);
    db.pushWatchedToLibrary(user);
    db.pushQueueToLibrary(user);
    document.querySelector('.main__library-login').classList.add('is-hidden');
  } else {
    refs.libraryPage.addEventListener('click', () => {
      document.querySelector('.main__library-login').classList.remove('is-hidden');
    });
  }
  auth.setupLoginBtn(user);
});

// apiData._data
//   .then(res => {
//     modulPagination.pagination(res.total_pages);
//   })
//   .catch(err => {
//     console.log(err);
//   });

apiData.getMarkUp();
apiData.addEventListeners();

// if (refs.header.classList.contains('header-home')) {
//   console.log(refs.header.classList.contains('header-home'));
//   apiData.paginationListner();
//   return;
// }
apiData.paginationListner();
apiData.renderOneMovie();
