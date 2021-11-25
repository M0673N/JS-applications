import authService from "../../services/authService.js";

function fieldValidator(data, formType) {
    if (data.email === '' || data.password === '' || data['confirm-password'] === '') {
        alert('Empty fields');
        return false;
    }
    if (formType === 'register') {
        if (data['confirm-password'] !== data.password) {
            alert('Passwords do not match');
            return false;
        }
    }

    return true;
}

async function submitHandler(formType, event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (!fieldValidator(data, formType)) {
        return;
    }

    data = {email: data.email, password: data.password};
    try {
        if (formType === 'register') {
            await authService.register(data);
        } else if (formType === 'login') {
            await authService.login(data);
        }
        location.href = '/home';
    } catch (error) {
        alert(error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};