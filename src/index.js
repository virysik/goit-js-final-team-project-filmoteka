import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
//import '/basiclightbox/dist/basicLightbox.min.css';
//import './js/Api/MovieDataBaseSearchService'
//import './js/render-year-on-movie-card'
import './js/theme-switch';
import './js/modal-film-card';
import './js/Api/MovieDataBaseSearchService';
import ApiServiceMarkup from './js/Api/ApiServiceMarkUp';
import clearContainer from './js/search-on-query';
import './js/team.js';

import './js/Api/auth';
import './js/pagination';

const apiData = new ApiServiceMarkup();
apiData.getMarkUp();

document
  .querySelectorAll('[href="#home"]')
  .forEach(e => e.addEventListener('click', apiData.getMarkUp.bind(apiData)));
document.querySelector('[href="#library"]').addEventListener('click', clearContainer);
