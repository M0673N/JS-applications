import {checkIfLogged, renderLoginPage} from './navigation.js';

let navBar = document.querySelector('#container');
let [_, welcomeEl, logoutEl, loginEl, registerEl] = navBar.querySelectorAll('a');

logoutEl.addEventListener('click', function (event) {
    event.preventDefault();
    let logoutUrl = 'http://localhost:3030/users/logout';
    fetch(logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        }
    })
        .then(_ => {
            localStorage.clear();
            checkIfLogged()
            renderLoginPage();
        })
        .catch(error => {
            '...'
        });
});