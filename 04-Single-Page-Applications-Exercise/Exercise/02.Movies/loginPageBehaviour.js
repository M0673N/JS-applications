import {renderHomePage, checkIfLogged} from './navigation.js';
import {buildNotificationEl} from './helpers.js';

let loginUrl = 'http://localhost:3030/users/login';
let loginElFromLoginPage = document.querySelector('#form-login');
let loginFormEl = loginElFromLoginPage.querySelector('form');

let notificationEl = buildNotificationEl();
loginFormEl.appendChild(notificationEl);

loginFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(loginFormEl);
    let email = formData.get('email');
    let password = formData.get('password');

    fetch(loginUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Wrong user or password');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userId', data._id);
            localStorage.setItem('email', data.email);
            notificationEl.style.display = 'none';
            renderHomePage();
            checkIfLogged();
            loginFormEl.reset();
        })
        .catch(error => {
            notificationEl.textContent = error.message;
            notificationEl.style.display = '';
        });
});