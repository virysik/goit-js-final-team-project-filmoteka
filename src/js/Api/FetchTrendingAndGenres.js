import axios from "axios"


export default class MoviesDataBaseFetchService {
    constructor(key) {
        this.key = key
    }
    async fetchGenres() {
       
        const response = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
        return response;
    }
    fetchTrendingMovies() {
        const response = axios(`https://api.themoviedb.org/3/trending/all/day?api_key=${this.key}`)
        return response;
    }
}

// Пример
// const movieData = new MoviesDataBaseFetchService(`fce924273e7307535891dd09fc2f7662`)

// movieData.fetchTrendingMovies()
// movieData.fetchTrendingMovies()

