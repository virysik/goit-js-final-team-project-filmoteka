import MovieDataBaseSearchService from './Api/MovieDataBaseSearchService';
import movieCardTemplate from '../templates/movie-card-template.hbs';

import refs from './refs/index'

/* Надо сделать чтоб кнопка Поиска "лупа"  и сам Input( у инпута должен быть name="query") 
лежал в теге Form с
классом search-form-js, а кнопка имела type = "submit" */

// Поисковик по слову
const serchMovie = new MovieDataBaseSearchService();

// Ссылка на кнопку ->   ****Надо раскаментировать как будет готовы кнопки пагинации

// слушатель на клик по лупе,тоесть сабмиту формы
refs.serchForm.addEventListener('submit', onSerchFormSubmit);
// refs.nextBtn && refs.nextBtn.addEventListener('click', onNextBtnClick);
//refs.nextBtn.addEventListener('click', onNextBtnClick);

function onSerchFormSubmit() {
  e.preventDefault();
  clearGalleryContainer();
  //  e.currentTarget.elements.query.value  = значения input с name - query
  serchMovie.query = e.currentTarget.elements.query.value;
  serchMovie.resetPage();
  serchMovie.fetchMoviesByName().then(insertMovieCardMarkup);
}

// // Функция удаления всего старого содержимого при предыдущем поиске, в main после нового запроса в форме
function clearGalleryContainer() {
  refs.movieList.innerHTML = '';
}
function insertMovieCardMarkup(movie) {
  const markup = movieCardTemplate(movie);
  refs.movieList.insertAdjacentHTML('beforeend', markup);
}

export default clearGalleryContainer;
// Фунция клика по кнопке Next ****Надо раскаментировать как будет готовы кнопки пагинации
// function onNextBtnClick() {
//     // очистка первой страницы и нарисовка второй
//     clearGalleryContainer()
//     serchMovie.fetchMoviesByName().then(insertMovieCardMarkup)
// }
