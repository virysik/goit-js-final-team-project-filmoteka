import ApiServiceMarkup from './js/Api/api-service-markup';

import './sass/main.scss';
import './js/scroll-to-top';
import './js/Api/auth';
import './js/toggle-headers';
import './js/theme-switch';

import './js/team.js';
import './js/Api/auth';
import firebase from 'firebase/app';
import './js/Api/firebase-database';
import * as modulPagination from './js/pagination';

const apiData = new ApiServiceMarkup();
apiData.getMarkUp();

apiData._data
  .then(res => {
    modulPagination.pagination(res.total_pages);
  })
  .catch(err => {
    console.log(err);
  });

apiData.renderOneMovie();
