// http://www.omdbapi.com/?apikey=b0099fba&s=fast
let id = 'fast';

async function renderMovies() {
   const moviesResponse = await fetch(`http://www.omdbapi.com/?apikey=b0099fba&s=${id}`);
   const moviesData = await moviesResponse.json();

   const moviesContainer = document.querySelector('.movies');
   moviesContainer.innerHTML = moviesData.Search.map(movie => generateMovieHtml(movie)).join('');

}

renderMovies();

function generateMovieHtml(movie) {
    return `<div class="movie">
    <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" class="movie__img">
    </figure>
    <div class="movie__title">${movie.Title}</div>
    <span class="movie--year">${movie.Year}</span>
    </div>`;
}
