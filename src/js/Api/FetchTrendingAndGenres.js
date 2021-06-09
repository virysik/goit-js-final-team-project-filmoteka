

class MoviesDataBaseFetchService{
    constructor(key) {
        this.key = key
    }
    fetchGenres() {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
            .then(r => r.json()).then(
                data => {
                    return data
                }
            )
             
    }
    fetchTrendingMovies() {
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${this.key}`)
            .then(r => r.json()).then(
                data => {
                    return data
                }
            )
             
    }
    }
    

// Пример
// const movieData = new MoviesDataBaseFetchService(`fce924273e7307535891dd09fc2f7662`)

// movieData.fetchTrendingMovies()
// movieData.fetchTrendingMovies()

export default MoviesDataBaseFetchService