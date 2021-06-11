import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
//import '/basiclightbox/dist/basicLightbox.min.css';
import './js/Api/MovieDataBaseSearchService';
import ApiServiceMarkup from './js/Api/ApiServiceMarkUp';
import clearContainer from './js/search-on-query';

// document.querySelectorAll('[href="#home"]').forEach(e => e.addEventListener('click', getMovies));
// document.querySelector('[href="#library"]').addEventListener('click', clearContainer);

const apiData = new ApiServiceMarkup();
apiData.getMarkUp();
