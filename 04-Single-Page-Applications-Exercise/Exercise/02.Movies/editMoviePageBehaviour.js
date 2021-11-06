import {reloadAfterEdit} from './detailsPageBehaviour.js';

let editMovieSection = document.querySelector('#edit-movie');
let editMovieForm = editMovieSection.querySelector('form');
let moviesUrl = 'http://localhost:3030/data/movies';

editMovieForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    let formData = new FormData(editMovieForm);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');
    let _ownerId = localStorage.getItem('userId');

    fetch(`${moviesUrl}/${editMovieSection.dataset.movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            title,
            description,
            img,
            _ownerId
        })
    })
        .then(_ => {
            reloadAfterEdit();
        })
        .catch(error => {
            '...'
        })
});