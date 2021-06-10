import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
//import '/basiclightbox/dist/basicLightbox.min.css';
import './js/Api/MovieDataBaseSearchService';
import './js/Api/genreTranspil';
import getMovies from './js/Api/genreTranspil';
import clearContainer from './js/search-on-query';

getMovies();

document.querySelector('[href="#home"]').addEventListener('click', getMovies);
document.querySelector('[href="#library"]').addEventListener('click', clearContainer);
