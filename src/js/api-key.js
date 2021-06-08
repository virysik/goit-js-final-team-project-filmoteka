const API_KEY = 'fce924273e7307535891dd09fc2f7662';
const BASE_URL = 'https://api.themoviedb.org/3';

function fetchTrendMovie() {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(r => r.json());
}

export default { fetchTrendMovie };
