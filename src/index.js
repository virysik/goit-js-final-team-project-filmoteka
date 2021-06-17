import ApiServiceMarkup from './js/Api/api-service-markup';

import './sass/main.scss';
import './js/scroll-to-top';
import './js/Api/auth';
import './js/toggle-headers';
import './js/theme-switch';

import firebase from 'firebase/app';

import './js/spinner';

import './js/team.js';
import Auth from './js/Api/auth';
import DataBaseFirebase from './js/Api/firebase-database';
import './js/Api/firebase-database';
import refs from './js/refs';
//import * as modulPagination from './js/pagination';

const apiData = new ApiServiceMarkup();
// apiData.getMarkUp();

const auth = new Auth();
auth.init();
//

const db = new DataBaseFirebase();
db.auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    db.addFilmToFirebase(user);
    db.pushWatchedToLibrary(user);
    db.pushQueueToLibrary(user);
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
