import authService from "../../services/authService.js";

async function showError(message) {
    let errorSection = document.querySelector('#errorBox');
    errorSection.querySelector('span').textContent = message;
    errorSection.style.display = 'block';
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(3000);
    errorSection.style.display = 'none';
}

async function fieldValidator(data, formType) {
    if (data.email.trim() === '' || data.password.trim() === '') {
        throw new Error('Empty fields');
    }
    if (formType === 'register') {
        if (data.repeatPass.trim() === '') {
            throw new Error('Empty fields');
        }

        if (data.repeatPass !== data.password) {
            throw new Error('Passwords do not match');
        }
    }

    return true;
}

async function submitHandler(formType, event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);
    try {
        await fieldValidator(data, formType);

        data = {email: data.email, password: data.password, username: data.username, gender: data.gender};

        if (formType === 'register') {
            await authService.register(data);
        } else if (formType === 'login') {
            await authService.login(data);
        }
        location.href = '/dashboard';
    } catch (error) {
        await showError(error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};