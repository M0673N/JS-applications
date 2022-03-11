import authService from "../../services/authService.js";

function fieldValidator(data, formType) {
    if (data.email === '' || data.password === '' || data['repeatPass'] === '') {
        alert('Empty fields');
        return false;
    }
    if (formType === 'register') {
        if (data['repeatPass'] !== data.password) {
            alert('Passwords do not match');
            return false;
        }
    }

    return true;
}

async function submitHandler(formType, event, context) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (!fieldValidator(data, formType)) {
        return;
    }

    data = {username: data.username, password: data.password};
    try {
        if (formType === 'register') {
            await authService.register(data);
        } else if (formType === 'login') {
            await authService.login(data);
        }
        context.page.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};