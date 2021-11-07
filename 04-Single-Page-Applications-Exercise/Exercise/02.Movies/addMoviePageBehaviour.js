import {renderHomePage} from './navigation.js';
import {buildNotificationEl} from './helpers.js';

let addMovieSection = document.querySelector('#add-movie');
let addMovieFormEl = addMovieSection.querySelector('form');
let moviesUrl = 'http://localhost:3030/data/movies';

let notificationEl = buildNotificationEl();
addMovieSection.appendChild(notificationEl);

addMovieFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(addMovieFormEl);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl')
    let _ownerId = localStorage.getItem('accessToken');
    if (!title || !description || !img) {
        notificationEl.style.display = '';
        notificationEl.textContent = 'Missing fields';
        return;
    }
    fetch(moviesUrl, {
        method: 'POST',
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
            notificationEl.style.display = 'none';
            addMovieFormEl.reset();
            renderHomePage();
        })
        .catch(error => {
            '...'
        })
})