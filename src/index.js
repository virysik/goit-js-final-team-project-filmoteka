import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
//import '/basiclightbox/dist/basicLightbox.min.css';
//import './js/Api/MovieDataBaseSearchService'
//import './js/render-year-on-movie-card'
import './js/theme-switch';

import './js/Api/MovieDataBaseSearchService';
import ApiServiceMarkup from './js/Api/ApiServiceMarkUp';
import './js/team.js';

import './js/Api/auth';
import './js/pagination';

const apiData = new ApiServiceMarkup();
apiData.getMarkUp();

