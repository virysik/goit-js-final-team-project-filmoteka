import API_KEY from './api-key.js';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

function fetchTrendMovie() {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(r => r.json());
}

export default { fetchTrendMovie };
