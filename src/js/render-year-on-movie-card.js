import axios from 'axios'
import cardTemplate from '../templates/movie-card-template'

 
async function getMovies() {
    const movies = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=fce924273e7307535891dd09fc2f7662')
      
      return movies.data.results
}



const movieCardContainer = document.querySelector('.main__section-list')

getMovies().then(insertMovieCardMarkup)

 function insertMovieCardMarkup(movie) {
    const markup = cardTemplate(movie)
    movieCardContainer.insertAdjacentHTML('beforeend', markup)
    
     makeDate().then(data => {
         const yearSpan = document.querySelectorAll('.movie-year')
         console.log(yearSpan);
         yearSpan.forEach((e, i) => {
              console.log(e);
     return  e.textContent =data[i]
    })
    })

 

}


async function makeDate(){
  const response = await  axios('https://api.themoviedb.org/3/trending/movie/day?api_key=fce924273e7307535891dd09fc2f7662')
    const movies = response.data.results

    // const genres = movies.map(e =>e= e.genres_ids)
   
    const date = movies.map(movie => movie.release_date);
    
    const modifiedDate = date.map((e, i, arr) => {
       return e.split('-')[0]
    })
    
    
    return modifiedDate
    
}

makeDate()
