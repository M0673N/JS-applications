export function buildNotificationEl() {
    let notificationEl = document.createElement('p');
    notificationEl.style.textAlign = 'center';
    notificationEl.style.fontWeight = 'bold';
    notificationEl.style.display = 'none';
    notificationEl.style.color = 'red';
    return notificationEl;
}

let navBar = document.querySelector('#container');
let [_, welcomeEl, logoutEl, loginEl, registerEl] = navBar.querySelectorAll('a');

export function checkIfLogged() {
    if (localStorage.getItem('accessToken')) {
        loginEl.style.display = 'none';
        registerEl.style.display = 'none';
        welcomeEl.textContent = 'Welcome, ' + localStorage.getItem('email');
        welcomeEl.style.display = '';
        logoutEl.style.display = '';
    } else {
        welcomeEl.style.display = 'none';
        logoutEl.style.display = 'none';
        loginEl.style.display = '';
        registerEl.style.display = '';
    }
}
let moviesUrl = 'http://localhost:3030/data/movies';
let movieCardTemplate = document.querySelector('.card.mb-4').cloneNode(true);
let moviesList = document.querySelector('#movie .card-deck.d-flex.justify-content-center');

async function fillCard(data) {
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
    let {detailsBtnHandler} = await import('./homePageBehaviour.js');
    btn.addEventListener('click', detailsBtnHandler);
    return newCard;
}

export async function loadMovies() {
    moviesList.textContent = '';
    let data = await fetch(moviesUrl).then(data => data.json());
    let fragment = document.createDocumentFragment();
    for (const el of data) {
        let newMovieCard = await fillCard(el);
        fragment.appendChild(newMovieCard);
    }
    moviesList.appendChild(fragment)
}