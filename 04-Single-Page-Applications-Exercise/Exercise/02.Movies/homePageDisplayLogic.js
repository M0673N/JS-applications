let homepageElPt1 = document.querySelector('#home-page');
let homepageElPt2 = document.querySelector('h1.text-center');
let addMovieBtn = document.querySelector('#add-movie-button');
let homepageElPt3 = document.querySelector('#movie');

function loginCheck() {
    if (localStorage.getItem('accessToken')) {
        addMovieBtn.style.display = '';
    } else {
        addMovieBtn.style.display = 'none';
    }
}

export function displayHomePage() {
    homepageElPt1.style.display = '';
    homepageElPt2.style.display = '';
    homepageElPt3.style.display = '';
    addMovieBtn.style.display = '';
    loginCheck();
}

export function hideHomePage() {
    homepageElPt1.style.display = 'none';
    homepageElPt2.style.display = 'none';
    homepageElPt3.style.display = 'none';
    addMovieBtn.style.display = 'none';
    addMovieBtn.style.display = 'none';
}