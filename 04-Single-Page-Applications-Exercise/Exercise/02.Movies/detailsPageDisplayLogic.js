let movieDetailsEl = document.querySelector('#movie-example');

export function displayMovieDetailsPage() {
    movieDetailsEl.style.display = '';
}

export function hideMovieDetailsPage() {
    movieDetailsEl.style.display = 'none';
}