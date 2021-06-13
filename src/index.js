import ApiServiceMarkup from './js/Api/api-service-markup';

import './sass/main.scss';
import './js/scroll-to-top';
import './js/Api/auth';
import './js/toggle-headers';
import './js/theme-switch';
import './js/modal-film-card';

import './js/team.js';
import './js/Api/auth';
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
