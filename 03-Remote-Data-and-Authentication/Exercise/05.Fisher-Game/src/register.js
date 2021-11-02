let logoutBtn = document.getElementById('logout');
logoutBtn.style.display = 'none';

let formEl = document.querySelector('form#register');
let notification = document.querySelector('p.notification');
let registerUrl = 'http://localhost:3030/users/register';

formEl.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        let formData = new FormData(formEl);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('rePass');
        if (password !== repeatPassword) {
            notification.textContent = 'Passwords do not match';
            return
        }

        let response = await fetch(registerUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(data => data.json());

        if (response.code !== undefined) {
            throw new Error(response.message)
        }

        formEl.reset();
        let accessToken = response.accessToken;
        let userId = response._id;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userName', email);
        localStorage.setItem('userId', userId);
        notification.textContent = '';
        window.location.href = 'index.html';
    } catch (error) {
        notification.textContent = error.message;
    }
})
