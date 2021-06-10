import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
//import '/basiclightbox/dist/basicLightbox.min.css';
import './js/Api/MovieDataBaseSearchService'
import './js/render-year-on-movie-card'


import './js/Api/MovieDataBaseSearchService';
import './js/Api/genreTranspil';

import './js/Api/auth';

import getMovies from './js/Api/genreTranspil';
import clearContainer from './js/search-on-query';
import './js/team.js';
getMovies();

document.querySelectorAll('[href="#home"]').forEach(e => e.addEventListener('click', getMovies));
document.querySelector('[href="#library"]').addEventListener('click', clearContainer);

