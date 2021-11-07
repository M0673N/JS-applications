import {renderHomePage} from './navigation.js';
import {buildNotificationEl, checkIfLogged} from './helpers.js';

let registerUrl = 'http://localhost:3030/users/register';
let registerElFromRegisterPage = document.querySelector('#form-sign-up');
let registerFormEl = registerElFromRegisterPage.querySelector('form');

let notificationEl = buildNotificationEl();
registerElFromRegisterPage.appendChild(notificationEl);

registerFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(registerFormEl);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');
    if (!email) {
        notificationEl.textContent = 'Email not filled';
        notificationEl.style.display = '';
        return;
    }
    if (password.length < 6) {
        notificationEl.textContent = 'Password must be at least 6 characters long';
        notificationEl.style.display = '';
        return;
    }
    if (password !== rePass) {
        notificationEl.textContent = 'Passwords do not match';
        notificationEl.style.display = '';
        return;
    }

    fetch(registerUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
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
            registerFormEl.reset();
        })
        .catch(error => {
            notificationEl.textContent = error.message;
            notificationEl.style.display = '';
        });
});