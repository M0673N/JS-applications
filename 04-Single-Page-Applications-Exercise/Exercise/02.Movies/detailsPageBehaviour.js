import {renderDetailsPage} from './navigation.js';
import {renderHomePage, renderEditMoviePage} from './navigation.js';

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

// delete movie handling
export async function deleteMovieHandler(event) {
    event.preventDefault();
    let movieId = event.target.dataset.movieId;
    fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',
        headers: {'X-Authorization': localStorage.getItem('accessToken')}
    })
        .then(_ => renderHomePage())
}

// like movie handling
export async function likeMovieHandler(event) {
    event.preventDefault();
    let likes = event.target.parentElement.querySelector('span');
    let id = event.target.dataset.movieId;

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            movieId: id
        })
    });
    let totalLikes = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
        .then(data => data.json());
    event.target.style.display = 'none';
    likes.textContent = `Liked ${totalLikes}`;
    likes.style.display = '';
}

// edit movie handling
export function editMovieHandler(event) {
    event.preventDefault();
    let editMovieSection = document.querySelector('#edit-movie');
    let [titleEl, img] = editMovieSection.querySelectorAll('input');
    let description = editMovieSection.querySelector('textarea');
    titleEl.value = event.target.dataset.title;
    img.value = event.target.dataset.img;
    description.value = event.target.dataset.description;
    editMovieSection.dataset.movieId = event.target.dataset.movieId;
    renderEditMoviePage();
}