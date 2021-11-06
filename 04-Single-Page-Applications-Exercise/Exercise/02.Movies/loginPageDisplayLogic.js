let loginEl = document.querySelector('#form-login');

export function displayLoginPage() {
    loginEl.style.display = '';
}

export function hideLoginPage() {
    loginEl.style.display = 'none';
}