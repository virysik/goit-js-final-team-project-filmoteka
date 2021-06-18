import ApiServiceMarkup from './js/api/api-service-markup';
import './js/scroll-to-top';
import './js/api/auth';
import './js/toggle-headers';
import './js/theme-switch';
import './js/spinner';
import './js/team.js';
import Auth from './js/api/auth';
import DataBaseFirebase from './js/api/firebase-database';
import './js/api/firebase-database';
import './sass/main.scss';

const apiData = new ApiServiceMarkup();
const auth = new Auth();
auth.init();

const db = new DataBaseFirebase();
db.auth.onAuthStateChanged(user => {
  if (user) {
    db.addFilmToFirebase(user);
    db.pushWatchedToLibrary(user);
    db.pushQueueToLibrary(user);
  }
  auth.setupLoginBtn(user);
});

apiData.getMarkUp();
apiData.addEventListeners();

apiData.paginationListner();
apiData.renderOneMovie();
