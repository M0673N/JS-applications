import {renderHomePage, renderLoginPage, renderRegisterPage} from './navigation.js';
import {checkIfLogged} from './helpers.js';

let navBar = document.querySelector('#container');
let [_, welcomeEl, logoutEl, loginEl, registerEl] = navBar.querySelectorAll('a');

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