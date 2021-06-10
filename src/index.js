import './sass/main.scss';
import './js/toggleHeaders';
//import * as basicLightbox from 'basiclightbox';
<<<<<<< HEAD
// import '/basiclightbox/dist/basicLightbox.min.css';
import './js/Api/MovieDataBaseSearchService';

import './js/team.js';
=======
//import '/basiclightbox/dist/basicLightbox.min.css';
import './js/Api/MovieDataBaseSearchService';
import './js/Api/genreTranspil';
import getMovies from './js/Api/genreTranspil';
import clearContainer from './js/search-on-query';

getMovies();

document.querySelector('[href="#home"]').addEventListener('click', getMovies);
document.querySelector('[href="#library"]').addEventListener('click', clearContainer);
>>>>>>> 18cac684c8efdd77a9996c211173740e68b68e04
