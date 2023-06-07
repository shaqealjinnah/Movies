// http://www.omdbapi.com/?apikey=b0099fba&s=fast

// RENDER MOVIES FROM OMDB API

async function renderMovies(filter) {
   const moviesResponse = await fetch(`http://www.omdbapi.com/?apikey=b0099fba&s=${id}`);
   const moviesData = await moviesResponse.json();
   const moviesDataArray = moviesData.Search.slice(0,8)

   if (filter === "NEW_TO_OLD") {
    moviesDataArray.sort((a, b) => b.Year - a.Year);
   }
   else if (filter === "OLD_TO_NEW") {
    moviesDataArray.sort((a, b) => a.Year - b.Year);
   }

   const moviesContainer = document.querySelector('.movies');
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
    <div class="movie__title">${movie.Title}</div>
    <span class="movie--year">${movie.Year}</span>
    </div>`;
}

// SEARCH INPUT EVENT HANDLER

function searchInput(event) {
    id = event.target.value
    renderMovies()
}

