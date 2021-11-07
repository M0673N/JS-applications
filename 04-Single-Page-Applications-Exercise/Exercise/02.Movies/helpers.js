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