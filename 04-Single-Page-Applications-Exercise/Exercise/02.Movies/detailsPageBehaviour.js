import {editMovieHandler, renderDetailsPage} from './navigation.js';

let editMovieSection = document.querySelector('#edit-movie');
let moviesUrl = 'http://localhost:3030/data/movies';

export async function reloadAfterEdit(event) {
    let likesPromise = fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${editMovieSection.dataset.movieId}%22&distinct=_ownerId&count`)
        .then(data => data.json());
    let dataPromise = fetch(`${moviesUrl}/${editMovieSection.dataset.movieId}`).then(data => data.json());
    let [likes, data] = await Promise.all([likesPromise, dataPromise]);
    let movieDetailsSection = document.querySelector('#movie-example');
    let headingEl = movieDetailsSection.querySelector('h1');
    headingEl.style.width = '1000px';
    let img = movieDetailsSection.querySelector('img');
    let descriptionEl = movieDetailsSection.querySelector('p');
    let likesEl = movieDetailsSection.querySelector('span.enrolled-span');
    let [deleteBtn, editBtn, likeBtn] = movieDetailsSection.querySelectorAll('a');

    deleteBtn.style.display = '';
    editBtn.style.display = '';
    likeBtn.style.display = 'none';

    headingEl.textContent = 'Movie title: ' + data.title;
    img.src = data.img;
    descriptionEl.textContent = data.description;
    likesEl.textContent = 'Liked ' + likes;

    editBtn.dataset.title = data.title;
    editBtn.dataset.img = data.img;
    editBtn.dataset.description = data.description;
    editBtn.dataset.movieId = editMovieSection.dataset.movieId;
    editBtn.addEventListener('click', editMovieHandler);

    renderDetailsPage();
}