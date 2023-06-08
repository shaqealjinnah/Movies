const moviesContainer = document.querySelector('.movies');

// RENDER MOVIES FROM OMDB API

async function renderMovies(filter) {
   const moviesResponse = await fetch(`https://www.omdbapi.com/?apikey=b0099fba&s=${id}`);
   const moviesData = await moviesResponse.json();
   const moviesDataArray = moviesData.Search.slice(0,8)

   moviesContainer.classList.remove('movies__loading')

   if (filter === "NEW_TO_OLD") {
    moviesDataArray.sort((a, b) => b.Year - a.Year);
   }
   else if (filter === "OLD_TO_NEW") {
    moviesDataArray.sort((a, b) => a.Year - b.Year);
   }

   moviesContainer.innerHTML = moviesDataArray.map(movie => generateMovieHtml(movie)).join('');
}

// FILTER MOVIES EVENT HANDLER

function filterMovies(event) {
    renderMovies(event.target.value);
}


// CONVERT OBJECT TO HTML

function generateMovieHtml(movie) {
    return `<div class="movie">
    <figure class="movie__img--wrapper">
        <img src="${movie.Poster}" class="movie__img">
    </figure>
    <div class="movie__description">
        <div class="movie__title">${movie.Title}</div>
        <span class="movie--year primary--accent">${movie.Year}</span>
    </div>
    </div>`;
}

// SEARCH INPUT EVENT HANDLER

function searchInput(event) {
    id = event.target.value
    loadingState()
    setTimeout(() => {
        renderMovies()
    }, 1000);
}

// LOADING STATE'
function loadingState() {
    const movieEl = document.querySelectorAll('.movie')
    movieEl.forEach(element => element.remove())

    moviesContainer.classList.add('movies__loading')
    moviesContainer.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`

    const searchResult = document.querySelector('.search__results')
    searchResult.innerHTML = `Search results for <span class="primary--accent">'${id}'</span>`
}