import {renderAddMoviePage, renderHomePage, renderLoginPage, renderRegisterPage} from './navigation.js';
import {checkIfLogged} from './helpers.js';

let navBar = document.querySelector('#container');
let [_, welcomeEl, logoutEl, loginEl, registerEl] = navBar.querySelectorAll('a');
let addMovieButton = document.querySelector('#add-movie-button a');

checkIfLogged();
renderHomePage();

registerEl.addEventListener('click', function (event) {
    event.preventDefault();
    renderRegisterPage();
});

loginEl.addEventListener('click', function (event) {
    event.preventDefault();
    renderLoginPage();
});

let navBarMovieBtn = document.querySelector('a.navbar-brand.text-light');
navBarMovieBtn.addEventListener('click', function (event) {
    event.preventDefault();
    renderHomePage();
});

addMovieButton.addEventListener('click', function (event) {
    event.preventDefault();
    renderAddMoviePage();
});


let moviesUrl = 'http://localhost:3030/data/movies';

export async function detailsBtnHandler(event) {
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

    let {editMovieHandler, likeMovieHandler, deleteMovieHandler} = await import("./detailsPageBehaviour.js")
    let {renderDetailsPage} = await import("./navigation.js");

    editBtn.addEventListener('click', editMovieHandler);

    likeBtn.dataset.movieId = movieId;
    likeBtn.addEventListener('click', likeMovieHandler);

    deleteBtn.dataset.movieId = movieId;
    deleteBtn.addEventListener('click', deleteMovieHandler);

    renderDetailsPage();
}