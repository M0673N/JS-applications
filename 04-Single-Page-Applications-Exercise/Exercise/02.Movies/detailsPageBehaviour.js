import {renderEditMoviePage, renderHomePage} from './navigation.js';

export async function deleteMovieHandler(event) {
    event.preventDefault();
    let movieId = event.target.dataset.movieId;
    fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',
        headers: {'X-Authorization': localStorage.getItem('accessToken')}
    })
        .then(_ => renderHomePage())
}

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