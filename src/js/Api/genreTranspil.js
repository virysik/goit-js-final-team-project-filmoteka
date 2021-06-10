import renderMarkUp from '../../templates/movie-card-template';
import FetchDecoding from './FetchGenresDecoding';

const genresDecoding = new FetchDecoding();

async function getOneMovie(movieId) {
  try {
    const oneMovieInfo = await genresDecoding.fetchOneMovie(movieId);
    return oneMovieInfo;
  } catch (error) {
    console.log(error);
  }
}

async function getMovies() {
  try {
    const movieDataList = await genresDecoding.fetchTrendingMovies();
    let markUp = renderMarkUp(movieDataList);

    document.querySelector('.main__section-list').insertAdjacentHTML('beforeend', markUp);

    document.querySelectorAll('.movie-genre').forEach(async (e, i) => {
      let idList = movieDataList.map(e => e.id);

      let oneMovie = await getOneMovie(idList[i]);
      let movieNames = oneMovie.genres.map(e => ' ' + e.name);
      movieNames.splice(2, 1, ' Other');
      let movieNamesText = movieNames.slice(0, 3);

      e.textContent = movieNamesText;
    });
  } catch (error) {
    console.log(error);
  }
}

//getMovies();
export default getMovies;
