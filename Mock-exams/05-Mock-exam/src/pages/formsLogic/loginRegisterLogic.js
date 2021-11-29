import authService from "../../services/authService.js";

function fieldValidator(data) {
    if (data.email === '' || data.password === '' || data['repeatPass'] === '') {
        alert('Empty fields');
        return false;
    }

    if (data.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }


    if (data['repeatPass'] !== data.password) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}

async function submitHandler(formType, event, context) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (formType === 'register') {
        if (!fieldValidator(data)) {
            return;
        }
    }

    data = {email: data.email, password: data.password};
    try {
        if (formType === 'register') {
            await authService.register(data);
        } else if (formType === 'login') {
            await authService.login(data);
        }
        context.page.redirect('/home');
    } catch (error) {
        alert(error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};