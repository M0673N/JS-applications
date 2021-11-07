import {displayHomePage, hideHomePage} from "./homePageDisplayLogic.js";
import {displayAddMoviePage, hideAddMoviePage} from "./addMoviePageDisplayLogic.js";
import {displayMovieDetailsPage, hideMovieDetailsPage} from "./detailsPageDisplayLogic.js";
import {displayEditMoviePage, hideEditMoviePage} from "./editMoviePageDisplayLogic.js";
import {displayLoginPage, hideLoginPage} from "./loginPageDisplayLogic.js";
import {displayRegisterPage, hideRegisterPage} from "./registerPageDisplayLogic.js";

let movieCardTemplate = document.querySelector('.card.mb-4').cloneNode(true);
let moviesList = document.querySelector('#movie .card-deck.d-flex.justify-content-center');
let moviesUrl = 'http://localhost:3030/data/movies';

async function detailsBtnHandler(event) {
    event.preventDefault();
    let movieId = event.target.dataset.id;
    let userId = localStorage.getItem('userId');
    let likesPromise = fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
        .then(data => data.json());
    let dataPromise = fetch(`${moviesUrl}/${event.target.dataset.id}`).then(data => data.json());
    let likesFromPersonPromise = fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22&count`).then(data => data.json());
    let [likes, data, likedTheMovie] = await Promise.all([likesPromise, dataPromise, likesFromPersonPromise]);
    let movieDetailsSection = document.querySelector('#movie-example');
    let headingEl = movieDetailsSection.querySelector('h1');
    headingEl.style.width = '1000px';
    let img = movieDetailsSection.querySelector('img');
    let descriptionEl = movieDetailsSection.querySelector('p');
    let likesEl = movieDetailsSection.querySelector('span.enrolled-span');
    let [deleteBtn, editBtn, likeBtn] = movieDetailsSection.querySelectorAll('a');

    headingEl.textContent = 'Movie title: ' + data.title;
    img.src = data.img;
    descriptionEl.textContent = data.description;
    likesEl.textContent = 'Liked ' + likes;
    let disabled;
    if (likedTheMovie > 0) {
        likesEl.style.display = '';
        likeBtn.style.display = 'none';
        disabled = true;
    } else {
        likesEl.style.display = 'none';
        likeBtn.style.display = '';
        disabled = false;
    }

    if (event.target.parentElement.parentElement.parentElement.dataset.ownerId === userId) {
        deleteBtn.style.display = '';
        editBtn.style.display = '';
        likeBtn.style.display = 'none';
    } else {
        deleteBtn.style.display = 'none';
        editBtn.style.display = 'none';
        if (!disabled) {
            likeBtn.style.display = '';
        }
    }

    editBtn.dataset.title = data.title;
    editBtn.dataset.img = data.img;
    editBtn.dataset.description = data.description;
    editBtn.dataset.movieId = movieId;
    editBtn.addEventListener('click', editMovieHandler);

    likeBtn.dataset.movieId = movieId;
    likeBtn.addEventListener('click', likeMovieHandler);

    deleteBtn.dataset.movieId = movieId;
    deleteBtn.addEventListener('click', deleteMovieHandler);

    renderDetailsPage();
}

// delete movie handling
async function deleteMovieHandler(event) {
    event.preventDefault();
    let movieId = event.target.dataset.movieId;
    fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',
        headers: {'X-Authorization': localStorage.getItem('accessToken')}
    })
        .then(_ => renderHomePage())
}

// like movie handling
async function likeMovieHandler(event) {
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

function fillCard(data) {
    let newCard = movieCardTemplate.cloneNode(true);
    let img = newCard.querySelector('img');
    let title = newCard.querySelector('h4');
    let btn = newCard.querySelector('button')

    newCard.dataset.ownerId = data._ownerId;
    btn.dataset.id = data._id;
    img.src = data.img;
    title.textContent = data.title;
    if (localStorage.getItem('accessToken')) {
        btn.style.display = '';
    } else {
        btn.style.display = 'none';
    }
    btn.addEventListener('click', detailsBtnHandler);
    return newCard;
}

async function loadMovies() {
    moviesList.textContent = '';
    let data = await fetch(moviesUrl).then(data => data.json());
    let fragment = document.createDocumentFragment();
    for (const el of data) {
        let newMovieCard = fillCard(el);
        fragment.appendChild(newMovieCard);
    }
    moviesList.appendChild(fragment)
}

export function renderHomePage() {
    loadMovies();
    displayHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideLoginPage();
    hideRegisterPage();
}

export function renderRegisterPage() {
    displayRegisterPage();
    hideHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideLoginPage();
}

export function renderLoginPage() {
    displayLoginPage();
    hideHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderDetailsPage() {
    displayMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideAddMoviePage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderAddMoviePage() {
    displayAddMoviePage();
    hideMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderEditMoviePage() {
    displayEditMoviePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideRegisterPage();
}