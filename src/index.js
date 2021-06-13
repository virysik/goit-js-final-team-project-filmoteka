import ApiServiceMarkup from './js/Api/api-service-markup';

import './sass/main.scss';

import './js/Api/movie-data-base-search-service';
import './js/Api/auth';
import './js/toggle-headers';
import './js/theme-switch';
import './js/modal-film-card';
import './js/team';
import './js/pagination';

const apiData = new ApiServiceMarkup();
apiData.getMarkUp();

