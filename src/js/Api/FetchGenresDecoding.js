import axios from "axios"


export default class FetchGenresDecoding {
    constructor(key) {
        this.key = key
    }
    async fetchGenres() {try{const response = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
        return response;
    } catch(error) {
        console.log(error);
        }
       
        
    }
    fetchTrendingMovies() {
        try{const response = axios(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}`)
            return response;
        }
        catch (error) {
            console.log(error);
        }
        
    }
}

// Пример
// const movieData = new MoviesDataBaseFetchService(`fce924273e7307535891dd09fc2f7662`)

// movieData.fetchTrendingMovies()
// movieData.fetchGenres()

